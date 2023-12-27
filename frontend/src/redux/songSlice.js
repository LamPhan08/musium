import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songList: [],
    song: undefined,
    playerState: '',
    user: {
        avatar: '',
        username: 'LamPhan',
        email: 'nhatlampr@gmail.com',
        _id: '65850c2875a796b2352337bd'
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
            state.user = action.payload
        }
    }
})

export const {setSong, setSongList, setPlayerState, setUser} = songSlice.actions

export default songSlice.reducer