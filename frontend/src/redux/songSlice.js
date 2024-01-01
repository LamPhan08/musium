import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    songList: [],
    song: undefined,
    playerState: '',
    user: {
        photo: '',
        username: '',
        email: '',
        _id: ''
    },
    shuffledSongList: [],
    bottomTabRouteName: 'Explore'
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
            state.user.photo = action.payload.photo
            state.user.email = action.payload.email
        },
        setShuffledSongList: (state, action) => {
            state.shuffledSongList = action.payload
        },
        setBottomTabRouteName: (state, action) => {
            state.bottomTabRouteName = action.payload
        }
    }
})

export const {setSong, setSongList, setPlayerState, setUser, setShuffledSongList, setBottomTabRouteName} = songSlice.actions

export default songSlice.reducer