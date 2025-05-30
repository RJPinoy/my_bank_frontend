import { configureStore } from '@reduxjs/toolkit'
import { loginSlice } from './slices/loginSlice'
import { transactionSlice } from './slices/transactionSlice'

export default configureStore({
    reducer: {
        login: loginSlice.reducer,
        transaction: transactionSlice.reducer,
    },
})