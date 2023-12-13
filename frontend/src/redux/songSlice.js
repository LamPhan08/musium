import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songList: [],
    song: undefined,
    playerState: ''
}

export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        setSong: (state, action) => {
            state.song = action.payload
        },

        setSongList: (state, action) => {
            state.songList = action.payload
        },
        setPlayerState: (state, action) => {
            state.playerState = action.payload
        }
        
    }
})

export const {setSong, setSongList, setPlayerState} = songSlice.actions

export default songSlice.reducer