import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Implement email sending with AWS SES
    // For now, just log
    console.log('Contact form submission:', { name, email, message });

    // In production, you would:
    // import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
    // const ses = new SESClient({ region: "eu-west-3" });
    // await ses.send(new SendEmailCommand({
    //   Source: "noreply@keanuharrell.com",
    //   Destination: { ToAddresses: ["keanuharrell@icloud.com"] },
    //   Message: {
    //     Subject: { Data: `Portfolio Contact: ${name}` },
    //     Body: { Text: { Data: `From: ${email}\n\n${message}` } }
    //   }
    // }));

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// For testing with GET
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      message: 'Contact API endpoint',
      methods: ['POST'],
      fields: ['name', 'email', 'message']
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
