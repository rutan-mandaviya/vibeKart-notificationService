const { subscribeToQueue } = require("./broker/broker");
const sendEmail = require("./email");

module.exports = function () {
  subscribeToQueue("Auth_notification_user_created", async (data) => {
    const emailtemplate = `
  <h1>Welcome to VibeKart</h1>
  <p>Hi ${data.fullname.firstname},</p>
  <p>Thank you for registering at VibeKart. We're excited to have you on board!</p>
  <p>We hope you have a great experience using our platform.</p>
  <p>Best regards,<br/>The VibeKart Team</p>
  `;

    await sendEmail(
      data.email,
      "Welcome to VibeKart",
      emailtemplate,
      "Thank you for registering at VibeKart. We're excited to have you on board!",
    );
  });
  subscribeToQueue("Payment_Notification_order_initiated", async (data) => {
    const emailtemplate = `
    <h1>Payment Initiated</h1>
    <p>Hi ${data.username},</p>
    <p>Your payment for order ID: ${data.orderId} has been initiated.</p>
    <p>Amount: ${(data.amount / 100).toFixed(2)} ${data.currency}</p>
    <p>Please complete the payment to process your order.</p>
    <p>Best regards,<br/>The VibeKart Team</p>
  `;

    await sendEmail(
      data.email,
      "Payment Initiated",
      emailtemplate
      `Your payment for order ID: ${
        data.orderId
      } has been initiated. Amount: ${(data.amount / 100).toFixed(2)} ${
        data.currency
      }`,
    );
  });

  subscribeToQueue("Notification-service-Product-created", async (data) => {
    const emailtemplate = `
  <h1>New Product Listed</h1>
  <p>Hi ${data.username},</p>
  <p>A new product has been listed on VibeKart:</p>
  <p>Title: ${data.title}</p>
  <p>Image: ${data.image}</p>
  <p>Price: ${(data.price.amount).toFixed(2)} ${data.price.currency}</p>
  <p>Best regards,<br/>The VibeKart Team</p>
  `;

    await sendEmail(
      data.email,
      "New Product Listed",
      emailtemplate
      `A new product has been listed on VibeKart: ${data.title}`,
    );
  });
  subscribeToQueue("Payment_order_created", async (data) => {
    console.log(data);

    const emailtemplate = `
  <h1>Payment Successful</h1>
    <p>Hi ${data.username},</p>
  <p>Your payment for order ID: ${
    data.orderId
  } has been successfully processed.</p>
  <p>Payment ID: ${data.paymentId}</p>
  <p>Amount: ${(data.amount / 100).toFixed(2)} ${data.currency}</p>
  <p>Thank you for shopping with VibeKart!</p>
  <p>Best regards,<br/>The VibeKart Team</p>
  `;
    await sendEmail(
      data.email,
      "Payment Successful",
      emailtemplate,
      `Your payment for order ID: ${
        data.orderId
      } has been successfully processed. Payment ID: ${
        data.paymentId
      }, Amount: ${(data.amount / 100).toFixed(2)} ${data.currency}`,
    );
  });

  subscribeToQueue("Payment_order_failed", async (data) => {
    const emailtemplate = `
    <h1>Payment Failed</h1>
    <p>Hi ${data.username},</p>
    <p>Unfortunately, your payment for order ID: ${data.orderId} could not be processed.</p>
    <p>Please try again or contact support if the issue persists.</p>
  `;

    await sendEmail(
      data.email,
      "Payment Failed",
      emailtemplate,
      `Unfortunately, your payment for order ID: ${data.orderId} could not be processed. Please try again or contact support if the issue persists.`,
    );
  });
};
