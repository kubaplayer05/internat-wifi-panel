'use server'

import bcrypt from "bcrypt"
import {dbPool} from "@/lib/db";
import {generateLogin, generatePassword} from "@/lib/generators";

interface ApplicationData {
    name: string
    email: string
    roomNumber: number
    physicalAddress: string
}

interface Response {
    success: boolean,
    errors?: { [key: string]: string },
    data?: {
        login: string,
        password: string
    }
}

export default async function createApplication(data: ApplicationData): Promise<Response> {
    const {name, email, roomNumber, physicalAddress} = data
    const [firstName, lastName] = name.toLowerCase().split(" ")

    const errors: { [key: string]: string } = {}

    if (!lastName || !firstName) {
        errors.name = "Imię oraz nazwisko są wymagane"
    }

    if (!email) {
        errors.email = "Email jest wymagany"
    }

    if (!roomNumber) {
        errors.roomNumber = "Numer pokoju jest wymagany"
    }

    if (!physicalAddress) {
        errors.physicalAddress = "Adres fizyczny jest wymagany"
    }

    if (Object.keys(errors).length > 0) {
        return {success: false, errors}
    }

    const login = generateLogin(firstName, lastName)
    const password = generatePassword(8)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    try {
        const conn = await dbPool.getConnection()
        await conn.query("INSERT INTO application (first_name, last_name, email, room_number, physical_address, password, login) VALUES (?, ?, ?, ?, ?, ?, ?)", [firstName, lastName, email, roomNumber, physicalAddress, hash, login])
    } catch (e: unknown) {
        if (e instanceof Error) {
            return {success: false, errors: {db: e.message}};
        }
        return {success: false, errors: {db: "An unknown error occurred"}};
    }

    return {
        success: true, data: {
            login, password
        }
    }
}