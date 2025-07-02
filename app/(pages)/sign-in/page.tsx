'use client'

import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignInPage = () => {

    const [togglePassword, setTogglePassword] = useState<boolean>(false)

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form className="p-8 bg-white rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Password</Label>
                        <div className="relative w-full">
                            <Input
                                id="password"
                                name="password"
                                type={togglePassword ? "text" : "password"}
                                required
                                className="pr-10"
                            />
                            <Button
                                type="button"
                                onClick={() => setTogglePassword((prev) => !prev)}
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2"
                                tabIndex={-1}
                            >
                                {togglePassword ? <EyeClosed className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                    <Button type='submit' className="w-full" >Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInPage