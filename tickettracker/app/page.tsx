"use client"

import useSWR from "swr"
import TicketDisplay from "./components/TicketDisplay"
import { useState, useEffect } from "react"
import TicketSoldNotification from "./components/TicketSoldNotification"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Home() {
    const { data: fridayData, error: fridayError } = useSWR("https://billetto.se/api/events/1152946/venue", fetcher, {
        refreshInterval: 10000,
    })
    const { data: saturdayData, error: saturdayError } = useSWR("https://billetto.se/api/events/1152947/venue", fetcher, {
        refreshInterval: 10000,
    })

    const [prevFridayCount, setPrevFridayCount] = useState(() => {
        if (typeof window !== "undefined") {
            return Number.parseInt(localStorage.getItem("fridayCount") || "0")
        }
        return 0
    })
    const [prevSaturdayCount, setPrevSaturdayCount] = useState(() => {
        if (typeof window !== "undefined") {
            return Number.parseInt(localStorage.getItem("saturdayCount") || "0")
        }
        return 0
    })

    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        if (fridayData && saturdayData && isInitialLoad) {
            localStorage.setItem(
                "fridayCount",
                fridayData.data.attributes.total_booked +
                fridayData.data.attributes.total_booked +
                fridayData.data.attributes.total_reserved.toString(),
            )
            localStorage.setItem(
                "saturdayCount",
                saturdayData.data.attributes.total_booked + saturdayData.data.attributes.total_reserved.toString(),
            )
            setPrevFridayCount(fridayData.data.attributes.total_booked + fridayData.data.attributes.total_reserved)
            setPrevSaturdayCount(saturdayData.data.attributes.total_booked + saturdayData.data.attributes.total_reserved)
            setIsInitialLoad(false)
        }
    }, [fridayData, saturdayData, isInitialLoad])

    useEffect(() => {
        if (!isInitialLoad) {
            if (fridayData) {
                const newCount = fridayData.data.attributes.total_booked + fridayData.data.attributes.total_reserved
                if (newCount !== prevFridayCount) {
                    localStorage.setItem("fridayCount", newCount.toString())
                    setPrevFridayCount(newCount)
                }
            }
            if (saturdayData) {
                const newCount = saturdayData.data.attributes.total_booked + saturdayData.data.attributes.total_reserved
                if (newCount !== prevSaturdayCount) {
                    localStorage.setItem("saturdayCount", newCount.toString())
                    setPrevSaturdayCount(newCount)
                }
            }
        }
    }, [fridayData, saturdayData, prevFridayCount, prevSaturdayCount, isInitialLoad])

    if (fridayError || saturdayError) return <div>Failed to load</div>
    if (!fridayData || !saturdayData) return <div>Loading...</div>

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gray-100">
            <img
                src="https://scontent.farn1-2.fna.fbcdn.net/v/t39.30808-6/471541967_1175498684579450_143484962000243370_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=1N_L7d8QlrkQ7kNvgG16qKm&_nc_oc=AdipCJy_T9zOXfr7ovigI1m3gpQoYx7tBV4We0b5MyAsaNWxyKgYHIk_QXU_-9U693Y&_nc_zt=23&_nc_ht=scontent.farn1-2.fna&_nc_gid=AoKspCEk26pzh0J5McXzWob&oh=00_AYBCZmTQYBPOCQQzIxhqV1LLn2Q0yPFXdHFI8yAP4mRmtw&oe=67AFD289"
                alt="poster"
                className="h-auto max-w-xs md:max-w-md lg:max-w-lg"
                style={{ width: "85vw" }}
            />
            <h1 className="text-4xl font-bold mb-8 mt-8">Bröderna Daltons Biljettracker</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <TicketDisplay
                    day="Fredag"
                    totalBooked={fridayData.data.attributes.total_booked + fridayData.data.attributes.total_reserved}
                    capacity={fridayData.data.attributes.capacity}
                    availableCapacity={fridayData.data.attributes.available_capacity}
                />
                <TicketDisplay
                    day="Lördag"
                    totalBooked={saturdayData.data.attributes.total_booked + saturdayData.data.attributes.total_reserved}
                    capacity={saturdayData.data.attributes.capacity}
                    availableCapacity={saturdayData.data.attributes.available_capacity}
                />
            </div>
            {!isInitialLoad && (
                <>
                    <TicketSoldNotification
                        previousCount={prevFridayCount}
                        currentCount={fridayData.data.attributes.total_booked + fridayData.data.attributes.total_reserved}
                        day="Fredag"
                    />
                    <TicketSoldNotification
                        previousCount={prevSaturdayCount}
                        currentCount={saturdayData.data.attributes.total_booked + saturdayData.data.attributes.total_reserved}
                        day="Lördag"
                    />
                </>
            )}
            <button
                className="mt-12 text-2xl py-6 px-12 bg-yellow-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() =>
                    window.open(
                        "https://billetto.se/e/jesperspexet-ger-broderna-dalton-biljetter-1152019?utm_source=billetto&utm_medium=billetto&utm_campaign=find&utm_content=1SE",
                        "_blank",
                    )
                }
            >
                Köp Biljetter!
            </button>
        </main>
    )
}

