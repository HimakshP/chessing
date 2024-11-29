import { Button } from "./ui/button"

export function ConnectWallet({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Connect Your Wallet</h2>
      <Button onClick={onConnect} className="w-full">Connect Wallet</Button>
    </div>
  )
}

