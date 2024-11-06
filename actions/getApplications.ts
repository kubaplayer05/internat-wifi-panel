"use server"

import {dbPool} from "@/lib/db";

export interface Application {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    room_number: number,
    physical_address: string,
    password: string,
    login: string
    status: "approved" | "rejected" | "pending",
    created_at: string,
}

interface Response {
    success: boolean,
    errors?: { [key: string]: string },
    data?: Application[]
}

export default async function getApplications(): Promise<Response> {
    try {
        const conn = await dbPool.getConnection()
        const rows = await conn.query("SELECT * FROM application")

        return {success: true, data: rows}
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {success: false, errors: {db: e.message}};
        }

        return {success: false}
    }
}