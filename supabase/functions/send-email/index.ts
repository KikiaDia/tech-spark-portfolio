import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as SendGrid from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

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

    const sendgrid = new SendGrid.Client(SENDGRID_API_KEY);
    console.log("Client SendGrid initialisé");
    
    const emailData = {
      personalizations: [
        {
          to: [{ email: "dkikia@ept.sn" }],
        },
      ],
      from: { email: "dkikia@ept.sn" },
      replyTo: { email: from },
      subject: subject || "Nouveau message de contact",
      content: [
        {
          type: "text/plain",
          value: `Message de: ${from}\n\n${message}`,
        },
      ],
    };

    console.log("Tentative d'envoi d'email avec les données:", emailData);
    const response = await sendgrid.send(emailData);
    console.log("Réponse SendGrid brute:", response);
    
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