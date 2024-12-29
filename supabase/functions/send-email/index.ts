import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const EMAIL_PASSWORD = Deno.env.get('EMAIL_PASSWORD')
const EMAIL_ADDRESS = "dkikia@ept.sn"

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

    // Validate email password
    if (!EMAIL_PASSWORD) {
      console.error("SMTP password is not configured")
      throw new Error('SMTP password is not configured')
    }

    console.log("Preparing SMTP client...")
    const client = new SmtpClient()

    try {
      console.log("Attempting to connect to SMTP server...")
      await client.connectTLS({
        hostname: "smtp.gmail.com",
        port: 465,
        username: EMAIL_ADDRESS,
        password: EMAIL_PASSWORD,
      })
      
      console.log("SMTP connection successful, preparing to send email...")
      await client.send({
        from: EMAIL_ADDRESS, // Use the configured email as sender
        to: EMAIL_ADDRESS,
        replyTo: from, // Set reply-to as the form submitter's email
        subject: `Portfolio Contact: ${subject}`,
        content: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #333;">New Contact Form Message</h2>
            <p><strong>From:</strong> ${from}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `,
        html: true,
      })

      console.log("Email sent successfully")
      await client.close()
      
      return new Response(
        JSON.stringify({ success: true }),
        { 
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (smtpError) {
      console.error("SMTP Error:", smtpError)
      throw new Error(`SMTP Error: ${smtpError.message}`)
    } finally {
      try {
        await client.close()
      } catch (closeError) {
        console.error("Error closing SMTP connection:", closeError)
      }
    }

  } catch (error: any) {
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