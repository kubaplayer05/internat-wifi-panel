"use client"

import React, {useEffect, useState} from "react";
import getApplications, {Application} from "@/actions/getApplications";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function ApplicationsTable() {
    const [data, setData] = useState<Application[]>([])

    useEffect(() => {
        async function fetchData() {
            const res = await getApplications()
            if (res.success) {
                console.log(res.data)
                setData(res.data!)
            }
        }

        fetchData()
    }, []);


    return (
        <Card className="p-2 px-4 flex flex-col gap-4">
            <CardHeader>
                <CardTitle className="text-xl">Lista wszystkich podań</CardTitle>
            </CardHeader>
            <CardContent>
                {data.map((row) => {
                    return (
                        <Card className="bg-blue-50 my-4 px-4 py-3 flex flex-row justify-between gap-4" key={row.id}>
                            <p>id: {row.id}</p>
                            <p>Imię: {row.first_name}</p>
                            <p>Nazwisko: {row.last_name}</p>
                            <p>Email: {row.email}</p>
                            <p>Numer pokoju: {row.room_number}</p>
                            <p>Adres MAC: {row.physical_address}</p>
                            <p>Status: {row.status}</p>
                        </Card>
                    )
                })}
            </CardContent>
        </Card>
    )
}