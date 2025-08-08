'use server'

type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>

function validateEmail(email: string) {
  // Simple RFC 5322-ish regex; good enough for UI validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export type ContactState = {
  ok: boolean
  message?: string
  errors?: FieldErrors
}

export async function sendContact(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const message = String(formData.get('message') || '').trim()
  const website = String(formData.get('website') || '').trim() // honeypot

  // Honeypot: bots often fill every field — silently accept and drop
  if (website.length > 0) {
    return { ok: true, message: 'Thanks! Message received.' }
  }

  const errors: FieldErrors = {}
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!validateEmail(email)) errors.email = 'Please enter a valid email.'
  if (message.length < 10) errors.message = 'Message should be at least 10 characters.'

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors }
  }

  // TODO: Send email or store the message.
  // Options:
  // - Nodemailer (SMTP)
  // - Resend API
  // - Save to DB / Notion / Airtable
  // For now, just log to server.
  console.log('Contact message:', { name, email, message })

  // You can await an email send here and return ok based on result.
  return { ok: true, message: 'Thanks! I’ll get back to you shortly.' }
}
