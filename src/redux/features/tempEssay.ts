import { createSlice } from "@reduxjs/toolkit";
import { SelectedTopicTempEssay, tempEssay } from "../../../types/essay";


type essaiesList = {
    tempEssay: tempEssay[],
};

const initialState: essaiesList = {
    tempEssay: [
        { topic: { id: '', body: '', type: 'general_task_1' }, essay: '' },
        { topic: { id: '', body: '', type: 'academic_task_1' }, essay: '' },
        { topic: { id: '', body: '', type: 'general_task_2' }, essay: '' }
    ],
};


export const essay = createSlice({
    name: "essay",
    initialState,
    reducers: {
        setEssay(state, action) {
            state.tempEssay[action.payload.row] = action.payload.temp;
        },
    }
});

export const { setEssay } = essay.actions;
export default essay.reducer; 