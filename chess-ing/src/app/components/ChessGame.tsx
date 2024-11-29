'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type BoardOrientation = 'white' | 'black'

function ChessGame1() {
  const [game, setGame] = useState(new Chess())
  const [playerColor, setPlayerColor] = useState<BoardOrientation>('white')
  const [playerTime, setPlayerTime] = useState(600) // 10 minutes in seconds
  const [botTime, setBotTime] = useState(600)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)

  const makeRandomMove = useCallback(() => {
    const possibleMoves = game.moves()
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return

    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    const move = possibleMoves[randomIndex]
    game.move(move)
    setGame(new Chess(game.fen()))
    setIsPlayerTurn(true)
  }, [game])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (game.isGameOver() || game.isDraw()) return

    if (!isPlayerTurn) {
      timer = setTimeout(makeRandomMove, 1000)
    }

    return () => clearTimeout(timer)
  }, [game, isPlayerTurn, makeRandomMove])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!game.isGameOver() && !game.isDraw()) {
        if (isPlayerTurn) {
          setPlayerTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        } else {
          setBotTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [game, isPlayerTurn])

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // always promote to queen for simplicity
    })

    if (move === null) return false
    setGame(new Chess(game.fen()))
    setIsPlayerTurn(false)
    return true
  }

  function resetGame() {
    setGame(new Chess())
    setPlayerTime(600)
    setBotTime(600)
    setIsPlayerTurn(true)
    setPlayerColor(playerColor === 'white' ? 'black' : 'white')
  }

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">GUEST vs .brok3</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-lg font-semibold">
            Player: {formatTime(playerTime)}
          </div>
          <div className="text-lg font-semibold">
            .brok3: {formatTime(botTime)}
          </div>
        </div>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardOrientation={playerColor}
        />
        <div className="mt-4 text-center">
          <Button onClick={resetGame} className="mr-2">
            New Game
          </Button>
          <Button onClick={() => {
            game.undo()
            setGame(new Chess(game.fen()))
            setIsPlayerTurn(true)
          }} disabled={game.history().length === 0}>
            Undo
          </Button>
        </div>
        {game.isGameOver() && (
          <div className="mt-4 text-xl font-bold text-center">
            {game.isCheckmate()
              ? `Checkmate! ${game.turn() === 'w' ? 'Black' : 'White'} wins! You will receive your bet shortly!`
              : game.isDraw()
              ? "It's a draw!"
              : 'Game over!'}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ChessGame1