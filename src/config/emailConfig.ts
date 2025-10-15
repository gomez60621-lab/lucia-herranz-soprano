// EmailJS Configuration
// To set up EmailJS:
// 1. Create a free account at https://www.emailjs.com/
// 2. Create two email templates in your EmailJS dashboard:
//    - One for user confirmation (template_user_confirmation)
//    - One for admin notification (template_admin_notification)
// 3. Get your Public Key, Service ID, and Template IDs
// 4. Replace the values below with your actual credentials

export const emailConfig = {
  // Your EmailJS Public Key (found in Account > API Keys)
  publicKey: 'awoUIgHOpo8FZpWSk',

  // Your EmailJS Service ID (found in Email Services)
  serviceId: 'service_yt031oq',

  // Template ID for user confirmation email
  userConfirmationTemplateId: 'template_sywikm6',

  // Template ID for admin notification email
  adminNotificationTemplateId: 'template_s1dk6ng',

  // Admin email address to receive form submissions
  adminEmail: 'luciaherranzsoprano@gmail.com',
};

// Template Variables Reference:
// For user confirmation email template, use these variables:
// - {{user_name}} - User's name
// - {{user_email}} - User's email
// - {{message_preview}} - Brief preview of their message
//
// For admin notification email template, use these variables:
// - {{from_name}} - User's name
// - {{from_email}} - User's email
// - {{phone}} - User's phone number
// - {{event_type}} - Type of event
// - {{message}} - Full message from user
