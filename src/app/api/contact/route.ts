import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
      },
    })

    // Send email notification
    await transporter.sendMail({
      from: `"Kalabi - Formularz" <${process.env.SMTP_USER}>`,
      to: 'kalabimeblenawymiar@gmail.com',
      replyTo: email,
      subject: `Nowa wiadomość: ${subject}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Imię i nazwisko</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">E-mail</td><td style="padding:8px;border-bottom:1px solid #eee">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee">${phone || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Temat</td><td style="padding:8px;border-bottom:1px solid #eee">${subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Wiadomość</td><td style="padding:8px">${message.replace(/\n/g, '<br>')}</td></tr>
        </table>
      `,
    })
    console.log('Email sent successfully')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera. Spróbuj ponownie później.' },
      { status: 500 },
    )
  }
}
