import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TicketDisplayProps {
  day: string
  totalBooked: number
  capacity: number
  availableCapacity: number
  imgUrl: string
}

export default function TicketDisplay({ day, totalBooked, capacity, availableCapacity, imgUrl }: TicketDisplayProps) {
  const percentageSold = (1 - (availableCapacity / capacity)) * 100

  return (
      <Card className="w-80 bg-western-background text-white border-4 border-yellow-500 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{day}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between text-lg">
              <span>Sålda:</span>
              <span className="font-bold">{totalBooked}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Tillgängliga:</span>
              <span className="font-bold">{availableCapacity}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Total:</span>
              <span className="font-bold">{capacity}</span>
            </div>
            <Progress value={percentageSold} className="w-full bg-black" imageUrl={imgUrl} />
            <div className="text-center text-lg text-yellow-500">{percentageSold.toFixed(1)}% Sålt</div>
          </div>
        </CardContent>
      </Card>
  )
}