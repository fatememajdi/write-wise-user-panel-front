export type Topic = {
    id?: string,
    shortId?: string,
    type?: string,
    topic?: string,
    shortName?: string,
    createdAt?: string,
    score?: string,
    overallBandScore?: number,
    subType?: string,
    visuals?: {
        id: string,
        url: string,
        image: string
    }[]
};

export type topic = {
    id: string,
    body: string,
    type: string,
    subType?: string,
    visuals?: {
        id: string,
        url: string,
        image: string
    }[],
    questionType?:string
};