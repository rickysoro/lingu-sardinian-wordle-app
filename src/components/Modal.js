import React from 'react'

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
        {isCorrect && (
            <div>
                <h1>Asi bintu!</h1>
                <p className="solution">{solution}</p>
                <p>Asi agatau sa solutzioni in {turn} tentativusu</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>No ti preoccupisi!</h1>
                <p className="solution">{solution}</p>
                <p>Torra a giógai</p>
            </div>
        )}
    </div>
  )
}
