import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Fonction d'envoi d'email appelée");
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // from est l'email de l'utilisateur qui envoie le message
    const { from, subject, message } = await req.json();
    console.log("Message reçu de:", from);
    console.log("Contenu du message:", message);

    const client = new SmtpClient();

    console.log("Tentative de connexion au serveur SMTP Gmail");
    
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "dkikia@ept.sn", // Compte qui envoie le mail
      password: Deno.env.get('EMAIL_PASSWORD'),
    });

    console.log("Connexion SMTP établie, envoi du message à dkikia@ept.sn");

    await client.send({
      from: "dkikia@ept.sn", // L'email est envoyé depuis ce compte
      to: "dkikia@ept.sn", // L'email est reçu sur ce même compte
      replyTo: from, // Permet de répondre directement à l'utilisateur qui a envoyé le message
      subject: subject || "Nouveau message de contact",
      content: `Message reçu via le formulaire de contact\n\nDe: ${from}\n\nMessage:\n${message}`,
    });

    console.log("Email envoyé avec succès à dkikia@ept.sn");
    
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