import { House } from "lucide-react"
import Link from "next/link"

import RsvpTable from "@/app/_components/rsvp-table"
import { Button } from "@/components/ui/button"

import { serverClient } from "@/app/_utils/supabase/server-client"
import type { IRsvp } from "@/app/_types"
import { signOut } from "@/app/_actions/auth/actions"


const AdminPage = async () => {

    const supabase = await serverClient()
    const { data, error } = await supabase
        .from('rsvps')
        .select('*')

    return (
        <div className=" container mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All RSVPS</h1>
                <div className="flex items-center gap-2">
                    <Link href='/'>
                        <Button variant={'outline'}>
                            <House />
                        </Button>
                    </Link>
                    <Button onClick={signOut} variant={'outline'}>
                        Sign Out
                    </Button>
                </div>
            </div>

            {error ?
                (
                    <div><p>{error.message}</p></div>
                )
                :
                (
                    <RsvpTable data={data as IRsvp[]} />
                )
            }
        </div>
    )
}

export default AdminPage