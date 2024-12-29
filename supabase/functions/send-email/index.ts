import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { from, subject, message } = await req.json();
    console.log("Received email request:", { from, subject });

    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API key not found");
      throw new Error('SendGrid API key not found');
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'dkikia@ept.sn' }],
        }],
        from: { email: 'dkikia@ept.sn' }, // This must be a verified sender in SendGrid
        reply_to: { email: from },
        subject: subject,
        content: [{
          type: 'text/plain',
          value: message
        }]
      })
    });

    console.log("SendGrid API Response Status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error("SendGrid API Error Response:", errorData);
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});