import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IItems} from '../../models/IItems';

interface ItemsState {
    items: IItems[];
    isLoading: boolean;
    error: string;
    count: number;
}

const initialState:ItemsState = {
    items: [
    {
        title: 'Михаил',
        id: 1
    },
    {
        title: 'Иван',
        id: 1
    }
    ],
    isLoading: false,
    error: '',
    count: 0
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
         increment(state, action: PayloadAction<number>){
              state.count += action.payload
         }
    }
})

export const { increment } = itemsSlice.actions;

export default itemsSlice.reducer;