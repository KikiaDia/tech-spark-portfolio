import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Fonction d'envoi d'email appelée");
  
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { from, subject, message } = await req.json();
    console.log("Données reçues:", { from, subject, message });

    if (!SENDGRID_API_KEY) {
      console.error("Erreur: Clé API SendGrid non configurée");
      throw new Error('SendGrid API key not configured');
    }

    console.log("Tentative d'envoi d'email avec SendGrid");
    
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: "dkikia@ept.sn" }]
        }],
        from: { email: "dkikia@ept.sn" },
        reply_to: { email: from },
        subject: subject || "Nouveau message de contact",
        content: [{
          type: "text/plain",
          value: `Message de: ${from}\n\n${message}`
        }]
      })
    });

    console.log("Statut de la réponse SendGrid:", response.status);
    
    if (response.ok) {
      console.log("Email envoyé avec succès");
      return new Response(
        JSON.stringify({ success: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } else {
      const errorText = await response.text();
      console.error("Échec de l'envoi d'email. Réponse:", errorText);
      throw new Error(`Failed to send email: ${errorText}`);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi d\'email:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});