"use client"

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (eventName: string, callback: (...args: any[]) => void) => void;
  };
}

import { useState } from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group"
import { ConnectWallet } from './components/connect-wallet'
import { TimeSelection } from './components/time-selection'
import { BetPlacement } from './components/bet-placement'
import ChessGame1 from './components/ChessGame'
import { LampDemo } from './components/ui/lamp'
//import WalletConnect from './components/connect-wallet'

export default function ChessGame() {
  const [step, setStep] = useState(1)
  const [walletConnected, setWalletConnected] = useState(false)
  const [selectedTime, setSelectedTime] = useState('')
  const [betAmount, setBetAmount] = useState('')

  const handleWalletConnect = () => {
    // In a real implementation, this would handle the actual wallet connection
    setWalletConnected(true)
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setStep(3)
  }

  const handleBetPlace = (amount: string) => {
    setBetAmount(amount)
    setStep(4)
  }

  const startMatch = () => {

    // In a real implementation, this would start the chess match
    console.log('Starting match with:', { selectedTime, betAmount })
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black flex items-center justify-center">
      <LampDemo/>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">CHESS-ing by QUANTA</h1>
        
        {step === 1 && <ConnectWallet onConnect={handleWalletConnect} />}
        
        {step === 2 && <TimeSelection onSelect={handleTimeSelect} />}
        
        {step === 3 && <BetPlacement onBetPlace={handleBetPlace} />}
        
        {step === 4 && (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Ready to Play!</h2>
            <p className="mb-2">Time Limit: {selectedTime} minutes</p>
            <p className="mb-4">Bet Amount: {betAmount} ETH</p>
            <ChessGame1 />
          </div>
        )}
      </div>
    </div>
  )
}