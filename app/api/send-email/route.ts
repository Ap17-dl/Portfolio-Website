import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { email, message } = await request.json();

    if (!email || !message) {
      return Response.json(
        { error: 'Email and message are required' },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'ankush170306@gmail.com',
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
