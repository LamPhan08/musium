import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songList: [],
    song: undefined,
    playerState: '',
    user: {
        avatar: '',
        username: '',
        email: '',
        _id: ''
    }
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
        },
        setUser: (state, action) => {
            state.user._id = action.payload._id
            state.user.username = action.payload.username
            state.user.email = action.payload.email
        }
    }
})

export const {setSong, setSongList, setPlayerState, setUser} = songSlice.actions

export default songSlice.reducer