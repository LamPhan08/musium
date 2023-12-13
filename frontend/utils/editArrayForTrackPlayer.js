export default EditArrayForTrackPlayer = (songList) => {
    const newSongList = songList.map(song => {
        return {
            id: song.encodeId,
            title: song.title,
            thumbnail: song.thumbnailM,
            artist: song.artistsNames,
            url: song.url
        }
    })

    return newSongList
}