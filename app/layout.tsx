import {Poppins} from 'next/font/google'
import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Internat - Wifi",
    description: "Strona do zarządzania użytkownikami sieci w internacie.",
};

const poppins = Poppins({weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ["latin"]})

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${poppins.className} antialiased`}>
        {children}
        </body>
        </html>
    );
}
