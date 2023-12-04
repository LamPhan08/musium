const arrayObjects = [
    { id: 1, name: 'John', age: 25, city: 'New York' },
    { id: 2, name: 'Jane', age: 30, city: 'Los Angeles' },
    { id: 3, name: 'Bob', age: 22, city: 'Chicago' }
  ];

export default EditArrayForTrackPlayer = (songList) => {
    const newSongList = songList.map(song => {
        return {
            title: song.title,
            thumbnail: song.thumbnailM,
            artist: song.artistsNames,
            url: song.url
        }
    })

    return newSongList
}