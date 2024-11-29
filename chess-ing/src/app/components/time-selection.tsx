import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { useState } from "react"

export function TimeSelection({ onSelect }: { onSelect: (time: string) => void }) {
  const [selectedTime, setSelectedTime] = useState("")

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Time Limit</h2>
      <RadioGroup onValueChange={setSelectedTime} className="mb-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="5" id="r1" />
          <Label htmlFor="r1">5 minutes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="10" id="r2" />
          <Label htmlFor="r2">10 minutes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="15" id="r3" />
          <Label htmlFor="r3">15 minutes</Label>
        </div>
      </RadioGroup>
      <Button onClick={() => onSelect(selectedTime)} className="w-full" disabled={!selectedTime}>
        Confirm Time Limit
      </Button>
    </div>
  )
}