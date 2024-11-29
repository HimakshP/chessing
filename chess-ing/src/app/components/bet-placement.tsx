import { useState } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

export function BetPlacement({ onBetPlace }: { onBetPlace: (amount: string) => void }) {
  const [betAmount, setBetAmount] = useState("")

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Place Your Bet</h2>
      <div className="mb-4">
        <Label htmlFor="betAmount">Bet Amount (ETH)</Label>
        <Input
          id="betAmount"
          type="number"
          placeholder="Enter bet amount"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          className="mt-1"
        />
      </div>
      <Button onClick={() => onBetPlace(betAmount)} className="w-full" disabled={!betAmount}>
        Place Bet
      </Button>
    </div>
  )
}