import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})


    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: "grey" }
        })

        // find any green letters
        formattedGuess.forEach((letter, index) => {
            if (solutionArray[index] === letter.key) {
                formattedGuess[index].color = "green"
                solutionArray[index] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((letter, index) => {
            if (solutionArray.includes(letter.key) && letter.color !== "green") {
                formattedGuess[index].color = "yellow"
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((previousGuesses) => {
            let newGuesses = [...previousGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((previousHistory) => {
            return [...previousHistory, currentGuess]
        })
        setTurn((previousTurn) => {
            return previousTurn + 1
        })
        setUsedKeys((previousUsedKeys) => {
            let newKeys = {...previousUsedKeys}

            formattedGuess.forEach((letter) => {
                const currentColor = newKeys[letter.key]

                if (letter.color === "green") {
                    newKeys[letter.key] = "green"
                    return
                }
                if (letter.color === "yellow" && currentColor !== "green") {
                    newKeys[letter.key] = "yellow"
                    return
                }
                if (letter.color === "grey" && currentColor !== "yellow" && currentColor !== "green") {
                    newKeys[letter.key] = "grey"
                    return
                }
            })
            return newKeys
        })
        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            // only add guess if turn is < 5
            if (turn > 5) {
                console.log('You used all your guesses')
                return
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)) {
                console.log('You already typed this word')
                return
            }
            // word must be 5-chars long
            if (currentGuess.length !== 5) {
                console.log('Word must be 5-chars long')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup }
}

export default useWordle