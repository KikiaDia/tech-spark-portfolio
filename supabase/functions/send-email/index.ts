import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

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

    const client = new SmtpClient();

    console.log("Tentative de connexion au serveur SMTP");
    
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "dkikia@ept.sn",
      password: Deno.env.get('EMAIL_PASSWORD'),
    });

    console.log("Connexion SMTP établie, tentative d'envoi");

    await client.send({
      from: "dkikia@ept.sn",
      to: "dkikia@ept.sn",
      replyTo: from,
      subject: subject || "Nouveau message de contact",
      content: `Message de: ${from}\n\n${message}`,
    });

    console.log("Email envoyé avec succès");
    
    await client.close();
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
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