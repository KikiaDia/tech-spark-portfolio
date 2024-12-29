import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as SendGrid from "https://deno.land/x/sendgrid@0.0.3/mod.ts";

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { from, subject, message } = await req.json();

    if (!SENDGRID_API_KEY) {
      throw new Error('SendGrid API key not configured');
    }

    const sendgrid = new SendGrid.Client(SENDGRID_API_KEY);
    
    const emailData = {
      personalizations: [
        {
          to: [{ email: "dkikia@ept.sn" }],
        },
      ],
      from: { email: from },
      subject: "Contact from Portfolio: " + subject,
      content: [
        {
          type: "text/plain",
          value: message,
        },
      ],
    };

    const response = await sendgrid.send(emailData);
    
    if (response.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});