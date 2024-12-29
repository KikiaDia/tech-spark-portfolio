import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { from, subject, message } = await req.json()
    console.log("Données reçues:", { from, subject, message })

    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not set')
    }

    console.log("Envoi de l'email via SendGrid...")
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: 'dkikia@ept.sn' }]
        }],
        from: {
          email: "noreply@yourdomain.com",  // This should be your verified sender in SendGrid
          name: "Contact Form"
        },
        reply_to: {
          email: from,
          name: "Sender"
        },
        subject: subject,
        content: [{
          type: 'text/html',
          value: `
            <h2>New Contact Form Message</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        }]
      })
    });

    console.log("SendGrid Response Status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("SendGrid Error Response:", errorText);
      throw new Error(`SendGrid API error: ${response.status}`);
    }

    console.log("Email envoyé avec succès");
    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )

  } catch (error) {
    console.error("Erreur lors de l'envoi d'email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})