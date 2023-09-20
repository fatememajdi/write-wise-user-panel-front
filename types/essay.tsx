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
    essayRecommendations?: string,
    essayInsights?: string
};

export type tempEssay = {
    topic: {
        id?: string,
        body: string,
        type: string
    },
    essay: string
};

export type SelectedTopicTempEssay = {
    essay: string;
    id: string
};