'use server'

import { serverClient } from "@/app/_utils/supabase/server-client"
import { redirect } from "next/navigation"

export const signIn = async (formData: FormData) => {
    const supabase = await serverClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) throw new Error(error.message)

    redirect("/admin");
}


export const signOut = async () => {
    const supabase = await serverClient()
    await supabase.auth.signOut()
    redirect('/sign-in')
}