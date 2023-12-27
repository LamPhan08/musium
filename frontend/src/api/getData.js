import { zingMp3Api } from "../axios/axios";

const getHome = async () => {
    try {
        const result = await zingMp3Api.get("/home")

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getSongMp3 = async (songId) => {
    try {
        const result = await zingMp3Api.get("/song", {
            params: {
                id: songId
            }   
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getSongIn4 = async (songId) => {
    try {
        const result = await zingMp3Api.get("/infosong", {
            params: {
                id: songId
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getSongLyric = async (songId) => {
    try {
        const result = await zingMp3Api.get("/lyric", {
            params: {
                id: songId
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getArtist = async (name) => {
    try {
        const result = await zingMp3Api.get("/artist", {
            params: {
                name: name
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getArtistSong = async (artistId, page, count) => {
    try {
        const result = await zingMp3Api.get("/artistsong", {
            params: {
                id: artistId,
                page: page,
                count: count,
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getPlaylistDetails = async (playlistId) => {
    try {
        const result = await zingMp3Api.get("/playlistdetail", {
            params: {
                id: playlistId
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getSearch = async (searchKeyWord) => {
    try {
        const result = await zingMp3Api.get("/search", {
            params: {
                keyword: searchKeyWord
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getMVList = async (id, page, count) => {
    try {
        const result = await zingMp3Api.get("/mvlist", {
            params: {
                id: id,
                page: page,
                count: count
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getMV = async (id) => {
    try {
        const result = await zingMp3Api.get("/video", {
            params: {
                id: id
            }
        })

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getTop100 = async () => {
    try {
        const result = await zingMp3Api.get("/top100")

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

const getHomeChart = async () => {
    try {
        const result = await zingMp3Api.get("/homechart")

        return result.data.data
    }
    catch (err) {
        console.log(err)
    }
}

export {
    getHome,
    getSongMp3,
    getSongIn4,
    getSongLyric,
    getArtist,
    getArtistSong,
    getPlaylistDetails,
    getSearch,
    getMVList,
    getMV,
    getTop100,
    getHomeChart
}