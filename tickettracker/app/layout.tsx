import "./globals.css"
import { Playfair_Display } from "next/font/google"
import type React from "react"
import {Toaster} from "react-hot-toast"; // Import React

const western = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-western",
})

export const metadata = {
    title: "Bröderna Dalton - Ticket Tracker",
    description: "Track ticket sales for Bröderna Dalton shows",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${western.variable} font-western`}>{children}<Toaster /></body>
        </html>
    )
}

