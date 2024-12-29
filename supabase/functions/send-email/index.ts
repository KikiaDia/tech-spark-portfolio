import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    // Encode credentials
    const email = "dkikia@ept.sn";
    const password = Deno.env.get('EMAIL_PASSWORD');
    const auth = btoa(`${email}:${password}`);

    // Gmail API endpoint
    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: btoa(
          `From: ${email}\r\n` +
          `Reply-To: ${from}\r\n` +
          `To: ${email}\r\n` +
          `Subject: ${subject}\r\n` +
          `Content-Type: text/html; charset=utf-8\r\n\r\n` +
          `<h2>Message reçu via le formulaire de contact</h2>
          <p><strong>De:</strong> ${from}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>`
        ).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erreur Gmail API:", errorData);
      throw new Error(`Gmail API error: ${response.status}`);
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