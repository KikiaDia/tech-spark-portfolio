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
    console.log("Starting email send process...")
    
    // Parse request body
    const body = await req.json()
    console.log("Request body received:", body)
    
    const { from, subject, message } = body
    
    // Validate required fields
    if (!from || !subject || !message) {
      console.error("Missing required fields:", { from, subject, message })
      throw new Error('Missing required fields: from, subject, and message are required')
    }

    // Validate API key
    if (!SENDGRID_API_KEY) {
      console.error("SendGrid API key is not configured")
      throw new Error('SendGrid API key is not configured')
    }

    console.log("Preparing SendGrid request payload...")
    const sendgridPayload = {
      personalizations: [{
        to: [{ email: 'dkikia@ept.sn' }]
      }],
      from: {
        email: "kikiadia26@gmail.com",
        name: "Portfolio Contact Form"
      },
      reply_to: {
        email: from,
        name: "Contact Form User"
      },
      subject: `Portfolio Contact: ${subject}`,
      content: [{
        type: 'text/html',
        value: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #333;">New Contact Form Message</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `
      }]
    }

    console.log("Sending request to SendGrid API...")
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendgridPayload)
    })

    console.log("SendGrid API response status:", response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error("SendGrid API error response:", errorText)
      throw new Error(`SendGrid API error (${response.status}): ${errorText}`)
    }

    console.log("Email sent successfully")
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
    console.error("Error in send-email function:", error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString(),
        timestamp: new Date().toISOString()
      }),
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