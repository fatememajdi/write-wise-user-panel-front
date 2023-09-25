export type Topic = {
    id?: string,
    type?: string,
    topic?: string,
    shortName?: string,
    createdAt?: string,
    score?: string,
    overallBandScore?: number,
    questionType?: string,
    visuals?: {
        id: string,
        url: string,
        image: string
    }[]
}