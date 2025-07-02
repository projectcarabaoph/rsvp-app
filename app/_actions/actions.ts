'use server'

import { Resend } from 'resend'
import { serverClient } from "../_utils/supabase/server-client"

const resend = new Resend(process.env.RESEND_API_KEY)

export const submitRsvp = async (formData: FormData) => {
    const supabase = await serverClient()

    const name = formData.get('name')
    const email = formData.get('email')
    const accompany = formData.get('accompany')
    const attendance = formData.get('attendance')

    const { data, error } = await supabase
        .from('rsvps')
        .insert({
            name,
            email,
            accompany,
            attendance
        })

    if (error) throw new Error(error.message)

    try {
        await resend.emails.send({
            from: "RSVP <onboarding@resend.dev>",
            to: `${email}`,
            subject: "New RSVP Submission",
            html: `
        <h1>New RSVP Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number of Guests:</strong> ${accompany}</p>
        <p><strong>Attendance:</strong> ${attendance}</p>
      `
        })


    } catch (error) {
        if (error instanceof Error) throw new Error(error.message)
    }

    return data
}

