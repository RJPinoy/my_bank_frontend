import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        value: {
            username: '',
            password: '',
        },
    },
    reducers: {
        setLoginValue: (state, action) => {
            state.value = action.payload;
        }        
    },
})

export const { setLoginValue } = loginSlice.actions
export default loginSlice.reducer