// ASSUMPTION: In-memory storage for v1 - no persistence across restarts
// This keeps deployment simple (no DB setup) and meets the 7-day ship deadline
// Will migrate to SQLite or Postgres in cycle 2 if merchants need persistence

const { v4: uuidv4 } = require('uuid');

// Store structure:
// merchants: { merchantId: { shopName, category, items: [...], email, createdAt } }
// orders: { orderId: { merchantId, items: [...], customer: {...}, createdAt } }

const merchants = new Map();
const orders = new Map();

function createMerchant(data) {
  const merchantId = uuidv4();
  merchants.set(merchantId, {
    id: merchantId,
    shopName: data.shopName || 'Unnamed Shop',
    category: data.category || 'General',
    items: [],
    email: data.email,
    createdAt: new Date().toISOString()
  });
  return merchants.get(merchantId);
}

function getMerchant(merchantId) {
  return merchants.get(merchantId);
}

function addItemsToMerchant(merchantId, items) {
  const merchant = merchants.get(merchantId);
  if (!merchant) return null;
  
  const itemsWithIds = items.map(item => ({
    id: uuidv4(),
    name: item.name,
    description: item.description || '',
    price: parseFloat(item.price) || 0,
    image: item.image || null,
    addedAt: new Date().toISOString()
  }));
  
  merchant.items.push(...itemsWithIds);
  return merchant;
}

function createOrder(merchantId, orderData) {
  const orderId = uuidv4();
  const order = {
    id: orderId,
    merchantId,
    items: orderData.items || [],
    customer: {
      name: orderData.customerName,
      email: orderData.customerEmail,
      phone: orderData.customerPhone || '',
      address: orderData.customerAddress || '',
      notes: orderData.notes || ''
    },
    total: parseFloat(orderData.total) || 0,
    createdAt: new Date().toISOString()
  };
  
  orders.set(orderId, order);
  return order;
}

function getOrder(orderId) {
  return orders.get(orderId);
}

function getAllMerchants() {
  return Array.from(merchants.values());
}

function getAllOrders() {
  return Array.from(orders.values());
}

module.exports = {
  createMerchant,
  getMerchant,
  addItemsToMerchant,
  createOrder,
  getOrder,
  getAllMerchants,
  getAllOrders
};
