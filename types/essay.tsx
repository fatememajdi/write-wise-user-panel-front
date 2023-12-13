export type Essay = {
    id?: string,
    essay?: string,
    date?: any,
    taskAchievementScore?: number,
    taskAchievementSummery?: string,
    coherenceAndCohesionScore?: number,
    coherenceAndCohesionSummery?: string,
    lexicalResourceScore?: number,
    lexicalResourceSummery?: string,
    grammaticalRangeAndAccuracyScore?: number,
    grammaticalRangeAndAccuracySummery?: string,
    overallBandScore?: number,
    durationMillisecond?: number,
    essayRecommendations?: any,
    essayInsights?: any,
    shortId?: string,
    scoreJobStatus: any,
    recommendationJobStatus: any,
    insightJobStatus: any,
    topicId: string
};

export type tempEssay = {
    topic: {
        id?: string,
        body: string,
        type: string
    },
    essay: string,
    visuals?: {
        id: string,
        url: string,
        image: string
    }[]
};

export type SelectedTopicTempEssay = {
    essay: string;
    id: string
};

export enum JOBSTATUS {
    FINISH,
    PRE_QUEUED,
    POST_QUEUED,
    PROCESSING,
    FAIL
};