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
    console.log("Message reçu de:", from);
    console.log("Sujet:", subject);
    console.log("Contenu du message:", message);

    if (!SENDGRID_API_KEY) {
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
          subject: subject,
        }],
        from: { email: 'dkikia@ept.sn', name: 'Portfolio Contact Form' },
        reply_to: { email: from },
        content: [{
          type: 'text/html',
          value: `
            <h2>Message reçu via le formulaire de contact</h2>
            <p><strong>De:</strong> ${from}</p>
            <p><strong>Sujet:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erreur SendGrid:", errorData);
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    console.log("Email envoyé avec succès");
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi d'email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});