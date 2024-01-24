import { createSlice } from "@reduxjs/toolkit";
import { SelectedTopicTempEssay, tempEssay } from "../../../types/essay";


type essaiesList = {
    tempEssay: tempEssay[][],
    tempEssaiesList: SelectedTopicTempEssay[]
};

const initialState: essaiesList = {
    tempEssay: [
        [
            { topic: { id: '', body: '', type: 'general_task_1' }, essay: '' },
            { topic: { id: '', body: '', type: 'academic_task_1' }, essay: '' },
            { topic: { id: '', body: '', type: 'general_task_2' }, essay: '' }
        ],
        [
            { topic: { id: '', body: '', type: 'general_task_1' }, essay: '' },
            { topic: { id: '', body: '', type: 'academic_task_1' }, essay: '' },
            { topic: { id: '', body: '', type: 'general_task_2' }, essay: '' }
        ]
    ],
    tempEssaiesList: []
};


export const essay = createSlice({
    name: "essay",
    initialState,
    reducers: {
        setEssay(state, action) {
            state.tempEssay[action.payload.row][action.payload.col] = action.payload.temp;
        },
        setEssaiesList(state, action) {
            state.tempEssaiesList[action.payload.id] = action.payload.temp;
        },
        push(state, action) {
            state.tempEssaiesList.push(action.payload);
        }
    }
});

export const { setEssay, setEssaiesList, push } = essay.actions;
export default essay.reducer; 