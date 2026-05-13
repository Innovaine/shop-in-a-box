// Shop-in-a-Box v1 - Main HTTP server
// ASSUMPTION: Single-merchant mode - first upload creates the shop, subsequent uploads add items
// ASSUMPTION: No authentication - merchant URL is the security boundary

require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const storage = require('./storage');
const email = require('./email');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize email transport
email.initEmailTransport();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static HTML files from root

// Configure multer for image uploads (memory storage for v1)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP allowed.'));
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    merchants: storage.getAllMerchants().length,
    orders: storage.getAllOrders().length
  });
});

// API: Create merchant and upload items
app.post('/api/merchant/create', upload.array('images', 10), async (req, res) => {
  try {
    const { shopName, category, email, items } = req.body;
    
    if (!shopName || !email) {
      return res.status(400).json({ error: 'Shop name and email are required' });
    }
    
    // Parse items JSON if it's a string
    let parsedItems = [];
    try {
      parsedItems = typeof items === 'string' ? JSON.parse(items) : items;
    } catch (e) {
      return res.status(400).json({ error: 'Invalid items format' });
    }
    
    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return res.status(400).json({ error: 'At least one item is required' });
    }
    
    // Create merchant
    const merchant = storage.createMerchant({ shopName, category, email });
    
    // Process images - convert to base64 for v1 (no S3 yet)
    const itemsWithImages = parsedItems.map((item, index) => {
      const file = req.files && req.files[index];
      return {
        ...item,
        image: file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : null
      };
    });
    
    // Add items to merchant
    storage.addItemsToMerchant(merchant.id, itemsWithImages);
    
    res.json({ 
      success: true, 
      merchantId: merchant.id,
      shopUrl: `${req.protocol}://${req.get('host')}/shop/${merchant.id}`
    });
  } catch (error) {
    console.error('[API] Create merchant error:', error);
    res.status(500).json({ error: 'Failed to create shop' });
  }
});

// API: Get merchant storefront data
app.get('/api/merchant/:merchantId', (req, res) => {
  const merchant = storage.getMerchant(req.params.merchantId);
  
  if (!merchant) {
    return res.status(404).json({ error: 'Shop not found' });
  }
  
  res.json(merchant);
});

// API: Create order (checkout)
app.post('/api/order/create', async (req, res) => {
  try {
    const { merchantId, items, customerName, customerEmail, customerPhone, customerAddress, notes, total } = req.body;
    
    if (!merchantId || !items || !customerName || !customerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const merchant = storage.getMerchant(merchantId);
    if (!merchant) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    
    // Create order
    const order = storage.createOrder(merchantId, {
      items,
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      notes,
      total
    });
    
    // Send emails (async, don't block response)
    Promise.all([
      email.sendOrderConfirmationToCustomer(order, merchant),
      email.sendOrderNotificationToMerchant(order, merchant)
    ]).catch(err => console.error('[EMAIL] Send error:', err));
    
    res.json({ 
      success: true, 
      orderId: order.id,
      message: 'Order placed successfully! Check your email for confirmation.'
    });
  } catch (error) {
    console.error('[API] Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Serve storefront page (redirect to static HTML with merchant ID in query)
app.get('/shop/:merchantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../storefront.html'));
});

// Serve merchant upload page
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, '../merchant-upload.html'));
});

// Serve checkout page
app.get('/checkout/:merchantId', (req, res) => {
  res.sendFile(path.join(__dirname, '../checkout.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[SERVER] Shop-in-a-Box running on port ${PORT}`);
  console.log(`[SERVER] Upload page: http://localhost:${PORT}/upload`);
});
