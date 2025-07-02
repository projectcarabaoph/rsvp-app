import { serverClient } from "@/app/_utils/supabase/server-client"
import { Button } from "@/components/ui/button"
import { House } from "lucide-react"
import Link from "next/link"

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
                    <Button variant={'outline'}>
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
                    <div>details</div>
                )
            }
        </div>
    )
}

export default AdminPage