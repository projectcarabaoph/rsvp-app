'use client'

import { useState } from "react"

import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner'

import { strings } from "../_utils/string"

export default function RsvpForm() {
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [accompany, setAccompany] = useState<string | null>(null)
    const [attendance, setAttendance] = useState<string>("yes")
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleOnSubmit = () => {
        console.log('Submit')
    }


    const openGoogleMap = () => {
        if (strings.eventLocation) {
            const location = strings.eventLocation;
            window.open(
                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`,
                "_blank"
            );
        } else {
            console.error("Location is missing");
        }
    };

    return (
        <div className="max-w-md mx-auto my-10">
            <h1 className="text-2xl font-bold mb-4">{strings.title}</h1>
            <p className="mb-6">{strings.description}</p>

            <div className="mb-6">
                <Label>{strings.eventDateLabel}</Label>
                <Calendar
                    today={new Date(strings.eventDate)}
                    mode="single"
                    disabled={{ before: new Date(strings.eventDate), after: new Date(strings.eventDate) }}
                    selected={new Date(strings.eventDate)}
                    className="rounded-md border flex flex-col items-center"
                />
            </div>

            <div className="mt-4">
                <Button onClick={openGoogleMap} type="button" variant={'outline'} className="w-full">
                    <MapPin />
                    {strings.viewOnMapButton}
                </Button>

            </div>

            <form onSubmit={handleOnSubmit} className="mt-2 space-y-6">
                <div>
                    <Label htmlFor="name">{strings.nameLabel}</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <small className="text-red-500 text-sm mt-1">{errors.name}</small>}
                </div>

                <div>
                    <Label htmlFor="email">{strings.emailLabel}</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <small className="text-red-500 text-sm mt-1">{errors.email}</small>}
                </div>

                <div>
                    <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
                    <Input
                        id="accompany"
                        type="number"
                        min={0}
                        value={accompany || ""}
                        onChange={(e) => setAccompany(e.target.value)}
                        required
                    />
                    {errors.accompany && <small className="text-red-500 text-sm mt-1">{errors.accompany}</small>}
                </div>

                <div>
                    <Label>{strings.rsvpLabel}</Label>
                    <RadioGroup
                        className="mt-2"
                        value={attendance}
                        onValueChange={setAttendance}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes">{strings.yesOption}</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">{strings.noOption}</Label>
                        </div>
                    </RadioGroup>
                </div>

                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Sending" : strings.submitButton}
                </Button>
            </form>
        </div>
    )
}
