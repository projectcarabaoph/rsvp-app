'use server'

import { serverClient } from "../_utils/supabase/server-client"

export const submitRsvp = async (formData: FormData) => {
    const supabase = await serverClient()

    const name = formData.get('name')
    const email = formData.get('email')
    const accompany = formData.get('accompany')
    const attendace = formData.get('attendace')

    const { data, error } = await supabase
        .from('rsvps')
        .insert({
            name,
            email,
            accompany,
            attendace
        })

    if (error) throw new Error(error.message)

    return data
}