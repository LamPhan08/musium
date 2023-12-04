import { getSongMp3 } from "../src/api/getData"

export default CheckSongHasMp3 = async (songArray) => {
    let count = 0
    const newSongArray = []

    for (const song of songArray) {
        try {
            const url = await getSongMp3(song.encodeId)
            
            if (url !== undefined) {
                song.url = url["128"]

                newSongArray.push(song)

                count++
            }

            if (count === 12) {
                break
            }
        }
        catch(err) {
            console.log(err)
        }
    }

    // console.log(newSongArray)

    return newSongArray
}