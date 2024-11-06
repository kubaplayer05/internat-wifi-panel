'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import createApplication from "@/actions/createApplication";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {ROOM_NUMBERS} from "@/lib/constants";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";

interface Inputs {
    name: string
    email: string
    roomNumber: number
    physicalAddress: string
}

export default function ApplicationForm() {
    const {register, handleSubmit, formState} = useForm<Inputs>()
    const [isLoading, setIsLoading] = useState(false)
    const {errors} = formState

    const onSubmit = async (data: Inputs) => {
        setIsLoading(true)
        const res = await createApplication(data)
        setIsLoading(false)

        console.log(res)
    }

    return (
        <Card className="py-4 px-8 shadow-md">
            <CardHeader className="mb-4">
                <CardTitle>Podanie o dostęp do internetu</CardTitle>
                <Separator/>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Podaj swoje imię i nazwisko</Label>
                        <Input id="name" placeholder="Jan Tajemnik" required {...register("name", {
                            required: "Imię oraz nazwisko są wymagane",
                            pattern: /^[A-Za-z]+ [A-Za-z]+$/,
                        })}/>
                        <ErrorMessage name="name" errors={errors}
                                      render={({message}) => <p className="text-sm text-red-500">{message}</p>}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Podaj swój adres email</Label>
                        <Input required id="email" placeholder="kwakwa@gmail.com"
                               {...register("email", {required: "Email jest wymagany", pattern: /^\S+@\S+$/})}/>
                        <ErrorMessage name="email" errors={errors}
                                      render={({message}) => <p className="text-sm text-red-500">{message}</p>}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="roomNumber">Podaj numer swojego pokoju</Label>
                        <Input required id="roomNumber" type="number" placeholder="5"
                               {...register("roomNumber", {
                                   required: "Numer pokoju jest wymagany", validate: (value) => {
                                       if (!ROOM_NUMBERS.includes(value * 1)) return "Podany numer pokoju nie istnieje"
                                   }
                               })}
                        />
                        <ErrorMessage name="roomNumber" errors={errors}
                                      render={({message}) => <p className="text-sm text-red-500">{message}</p>}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="physicalAddress">Podaj adres MAC swojego urządzenia</Label>
                        <Input required id="physicalAddress" placeholder="00:1b:63:84:45:e6"
                               {...register("physicalAddress", {
                                   required: "Adres MAC jest wymagany",
                                   pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
                               })}
                        />
                        <ErrorMessage name="physicalAddress" errors={errors}
                                      render={({message}) => <p className="text-sm text-red-500">{message}</p>}/>
                    </div>
                    <Button disabled={isLoading}
                            className="bg-green-700 hover:bg-green-800 transition cursor-pointer text-white">Wyślij</Button>
                </form>
            </CardContent>
            <CardFooter>
                <ul className="max-w-[400px]">
                    <li className="text-gray-400 text-xs">* W pierwszym polu należy wpisać imię i nazwisko oddzielone
                        spacją
                    </li>
                    <li className="text-gray-400 text-xs">* Adres MAC należy wpisać w formacie xx:xx:xx:xx:xx:xx lub
                        xx-xx-xx-xx-xx-xx
                    </li>
                </ul>
            </CardFooter>
        </Card>
    )
}