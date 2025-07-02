'use client'
import { useState } from "react"

import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import type { IRsvpTable } from "../_types"

export default function RsvpTable({ data }: IRsvpTable) {

    const [filter, setFilter] = useState<string>("")
    const filteredData = data.filter((rsvp) => rsvp.name.toLowerCase().includes(filter))

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by name.."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Number of Guests</TableHead>
                        <TableHead>Attending</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((rsvp) => (
                            <TableRow key={rsvp.id}>
                                <TableCell>{rsvp.name}</TableCell>
                                <TableCell>{rsvp.email}</TableCell>
                                <TableCell>{rsvp.accompany || "/"}</TableCell>
                                <TableCell>{rsvp.attendance}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No data found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
