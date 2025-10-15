import emailjs from '@emailjs/browser';
import { emailConfig } from '@/config/emailConfig';

// Initialize EmailJS with the public key
emailjs.init(emailConfig.publicKey);

export interface ContactFormData {
  nombre: string;
  email: string;
  telefono: string;
  tipoEvento: string;
  mensaje: string;
}

/**
 * Sends a confirmation email to the user who filled the form
 */
export const sendUserConfirmationEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const templateParams = {
      user_name: formData.nombre,
      user_email: formData.email,
      to_email: formData.email,
      message_preview: formData.mensaje.substring(0, 100) + (formData.mensaje.length > 100 ? '...' : ''),
    };

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.userConfirmationTemplateId,
      templateParams
    );
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    throw new Error('No se pudo enviar el email de confirmación');
  }
};

/**
 * Sends the form data to the admin email
 */
export const sendAdminNotificationEmail = async (formData: ContactFormData): Promise<void> => {
  try {
    const templateParams = {
      from_name: formData.nombre,
      from_email: formData.email,
      phone: formData.telefono || 'No proporcionado',
      event_type: formData.tipoEvento || 'No especificado',
      message: formData.mensaje,
      to_email: emailConfig.adminEmail,
    };

    await emailjs.send(
      emailConfig.serviceId,
      emailConfig.adminNotificationTemplateId,
      templateParams
    );
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    throw new Error('No se pudo enviar la notificación al administrador');
  }
};

/**
 * Sends both confirmation and notification emails
 */
export const sendContactFormEmails = async (formData: ContactFormData): Promise<void> => {
  // Send both emails in parallel for better performance
  await Promise.all([
    sendUserConfirmationEmail(formData),
    sendAdminNotificationEmail(formData),
  ]);
};
