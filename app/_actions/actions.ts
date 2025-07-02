'use server'

import { serverClient } from "../_utils/supabase/server-client"

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

    return data
}

