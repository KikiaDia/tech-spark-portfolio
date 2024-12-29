import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.13.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Fonction d'envoi d'email appelée");
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { from, subject, message } = await req.json();
    console.log("Message reçu de:", from);
    console.log("Sujet:", subject);
    console.log("Contenu du message:", message);

    const client = new SmtpClient();

    console.log("Tentative de connexion au serveur SMTP Gmail");
    
    await client.connect({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "dkikia@ept.sn",
      password: Deno.env.get('EMAIL_PASSWORD'),
      tls: true,
    });

    console.log("Connexion SMTP établie, envoi du message");

    await client.send({
      from: "dkikia@ept.sn",
      to: "dkikia@ept.sn",
      replyTo: from,
      subject: `Nouveau message de contact: ${subject}`,
      content: `Message reçu via le formulaire de contact\n\nDe: ${from}\n\nMessage:\n${message}`,
      html: `
        <h2>Message reçu via le formulaire de contact</h2>
        <p><strong>De:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
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