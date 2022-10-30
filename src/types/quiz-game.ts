export type QuestionQuizProps = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    answer: string[]
    onAnswerSelect: (answer: string) => void
}

export type TQuestion = {
    category: string
    type: string
    question: string
    correct_answer: string
    answer: string[]
    point: number   
}

export type TAnswerSheet = {
    question: TQuestion
    choosen: string
}

enum States { "started", "finished" }

export type GameState = keyof typeof States