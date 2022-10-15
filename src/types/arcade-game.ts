export type QuestionProps = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
    onAnswerSelect: (answer: string) => void
}
export enum GameStates {"idle", "started", "result"}

export type GameState = keyof typeof GameStates

export type GameIdleProps = {
    setGameState: (state: GameState) => void
}

export type GameStartedProps = {
    gameState: GameState
    setGameState: (state: GameState) => void
    onResult: (result: boolean[]) => void
}

export type TimerProps = {
    resetCounter: boolean
    setResetCounter: (state: boolean) => void
    iteration: number
}
