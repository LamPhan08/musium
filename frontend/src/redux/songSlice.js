import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songList: [],
    isPlay: false,
    currentTime: 0,
    duration: 0,
    song: {},
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
        setPlay: (state) => {
            state.isPlay = true
        },
        setPause: (state) => {
            state.isPlay = false
        },

    }
})

export const {setSong, setSongList, setPlay, setPause} = songSlice.actions

export default songSlice.reducer