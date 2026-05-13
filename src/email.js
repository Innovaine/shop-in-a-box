// Email notification module using nodemailer
// ASSUMPTION: Using Gmail SMTP for v1 - requires app password setup
// TODO cycle 2: migrate to Resend or SendGrid for production reliability

const nodemailer = require('nodemailer');

let transporter = null;

function initEmailTransport() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('[EMAIL] No credentials configured - emails will be logged but not sent');
    return null;
  }
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  return transporter;
}

async function sendOrderConfirmationToCustomer(order, merchant) {
  const subject = `Order Confirmation - ${merchant.shopName}`;
  const itemsList = order.items.map(item => 
    `• ${item.name} - $${item.price.toFixed(2)}`
  ).join('\n');
  
  const body = `
Hi ${order.customer.name},

Thank you for your order from ${merchant.shopName}!

ORDER DETAILS:
${itemsList}

Total: $${order.total.toFixed(2)}

DELIVERY INFORMATION:
${order.customer.address || 'No address provided'}

${order.customer.notes ? `Notes: ${order.customer.notes}` : ''}

The merchant will contact you shortly to arrange payment and delivery.

Order ID: ${order.id}

Thank you for your business!
  `.trim();
  
  return sendEmail(order.customer.email, subject, body);
}

async function sendOrderNotificationToMerchant(order, merchant) {
  const subject = `New Order Received - ${merchant.shopName}`;
  const itemsList = order.items.map(item => 
    `• ${item.name} - $${item.price.toFixed(2)}`
  ).join('\n');
  
  const body = `
You have received a new order!

CUSTOMER DETAILS:
Name: ${order.customer.name}
Email: ${order.customer.email}
Phone: ${order.customer.phone || 'Not provided'}
Address: ${order.customer.address || 'Not provided'}

ORDER DETAILS:
${itemsList}

Total: $${order.total.toFixed(2)}

${order.customer.notes ? `Customer Notes: ${order.customer.notes}` : ''}

Order ID: ${order.id}
Order Time: ${new Date(order.createdAt).toLocaleString()}

Please contact the customer to arrange payment and delivery.
  `.trim();
  
  return sendEmail(merchant.email, subject, body);
}

async function sendEmail(to, subject, text) {
  if (!transporter) {
    console.log('[EMAIL] Would send email:');
    console.log(`  To: ${to}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Body:\n${text}`);
    return { success: false, message: 'Email transport not configured' };
  }
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });
    
    console.log('[EMAIL] Sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[EMAIL] Failed to send:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  initEmailTransport,
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToMerchant
};
