'use server'

import { serverClient } from "@/app/_utils/supabase/server-client"
import { revalidatePath } from "next/cache"

export const signIn = async (formData: FormData) => {
    const supabase = await serverClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message)

    revalidatePath('/')
}