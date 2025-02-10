"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import Confetti from "react-confetti"

interface TicketSoldNotificationProps {
	previousCount: number
	currentCount: number
	day: string
}

export default function TicketSoldNotification({ previousCount, currentCount, day }: TicketSoldNotificationProps) {
	const [showConfetti, setShowConfetti] = useState(false)

	useEffect(() => {
		if (currentCount > previousCount) {
			const ticketsSold = currentCount - previousCount
			toast.success(`${ticketsSold} biljett${ticketsSold > 1 ? 'er' : ''} Såld${ticketsSold > 1 ? 'a' : ''} till ${day}!`, {
				icon: "🎉",
				duration: 8000,
			})
			setShowConfetti(true)
			setTimeout(() => setShowConfetti(false), 8000)
		}
	}, [currentCount, previousCount])

	return showConfetti ? <Confetti /> : null
}

