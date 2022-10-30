import { TQuestion } from '@/types/quiz-game';

export type Quiz = {
    id: string
    image: string
    title: string
    category: {
        title: string
    }
    _count: {
        quizes: number
    }
}

export type QuizHistory = {
    id: string
    startDate: string
    isFinished: boolean
    totalPoint: number
    game: {
        title: string
        category: {
            title: string
        }
    }
}

export type GameData = {
    id: string
    quizes: TQuestion[]
    title: string
    image: string
    category: {
        title: string
    }
}