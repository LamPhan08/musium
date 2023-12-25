import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native'
import styles from './search.style'
import Entypo from 'react-native-vector-icons/Entypo'
import SearchBar from '../../components/searchBar/SearchBar'
import { getSearch } from '../../api/getData'
import ArtistCard from '../../components/artistCard/ArtistCard'
import SongCard from '../../components/songCard/SongCard'
import CheckSongHasMp3 from '../../utils/checkSongHasMp3'
import EditArrayForTrackPlayer from '../../utils/editArrayForTrackPlayer'
import PlaylistCard from '../../components/playlistCard/PlaylistCard'
import { debounce } from 'lodash'
import SearchTabView from '../../navigators/SearchTabView'

const recommendData = [
  // 'Những Lời Hứa Bỏ Quên',
  'Last Christmas',
  'We Wish You A Merry Christmas',
  'Thích Em Hơi Nhiều',
  'Sơn Tùng M-TP',
  'Rhyder',
  'Đi Để Trở Về',
  'Ngủ Một Mình',
  '3107 3',
  'Rung Động',
  'Lofi',
  'Chịu Cách Mình Nói Thua',
  'Dạ Vũ',
  'Lạc Trôi'
]

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState('')
  const [searchResult, setSearchResult] = useState()
  const [recommendSong, setRecommendSong] = useState([])
  const [threeSongs, setThreeSongs] = useState([])
  const [viewAll, setViewAll] = useState(false)

  // console.log(recommendSong)


  const delaySearch = debounce(async () => {
    if (searchText !== '') {
      const result = await getSearch(searchText)

      setSearchResult(result)

      if (result.top) {
        if (result.top.objectType === 'song') {
          setRecommendSong(await CheckSongHasMp3([result.top], ''))
        }
      }

      if (result.songs) {
        setThreeSongs(await CheckSongHasMp3(result.songs, '', 3))
      }
    }
    else {
      setSearchResult(undefined)
    }
  }, 100)

  const handleViewAll = () => {
    if (searchText !== '') {
      setViewAll(true)
    }

    Keyboard.dismiss()
  }

  const handleClickRecommend = (recommendText) => {
    setSearchText(recommendText);

    Keyboard.dismiss();
  }


  useEffect(() => {
    delaySearch()

    return () => delaySearch.cancel()
  }, [searchText])

  // console.log(searchResult)

  return (
    <View
      style={styles.searchScreenContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo name='chevron-thin-down' style={styles.backIcon} />
        </TouchableOpacity>

        <SearchBar searchText={searchText} setSearchText={setSearchText} setFocus={setViewAll} handleFind={handleViewAll}/>
      </View>

      {
        !viewAll
          ?
          (
            searchResult
              ? ((!searchResult.hasOwnProperty('top')
                && !searchResult.hasOwnProperty('artists')
                && !searchResult.hasOwnProperty('songs')
                && !searchResult.hasOwnProperty('videos')
                && !searchResult.hasOwnProperty('playlists'))
                ?
                <View style={styles.noResultsWrapper}>
                  <Text style={styles.noResults}>Không có kết quả tìm kiếm</Text>
                </View>
                :
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  decelerationRate='fast'
                  style={styles.searchResultList}
                  contentContainerStyle={{ gap: 5 }}
                >
                  {searchResult.hasOwnProperty('top') && searchResult.top.objectType !== 'hub'
                    ?
                    <View style={[styles.itemWrapper, {marginTop: recommendSong.length === 0 ? 0 : 10}]}>

                      {searchResult.top.objectType === 'artist'
                        ?
                        <View>
                          <Text style={styles.heading}>Đề xuất</Text>

                          <ArtistCard navigation={navigation} artist={searchResult.top} />
                        </View>

                        : (searchResult.top.objectType === 'song'
                          ?
                          (recommendSong.length !== 0
                            &&
                            <View>
                              <Text style={styles.heading}>Đề xuất</Text>

                              <SongCard song={searchResult.top} index={0} playlistSongs={EditArrayForTrackPlayer(recommendSong)} />
                            </View>
                          )

                          : (searchResult.top.objectType === 'playlist'
                            ?
                            <View>
                              <Text style={styles.heading}>Đề xuất</Text>

                              <PlaylistCard playlist={searchResult.top} />
                            </View>

                            : null
                          )
                        )
                      }
                    </View>
                    : null
                  }

                  {searchResult.hasOwnProperty('artists')
                    ?
                    <View style={styles.itemWrapper}>
                      <Text style={styles.heading}>Nghệ sĩ</Text>

                      {
                        searchResult.artists.slice(0, 3).map((artist, index) => {
                          return (
                            <ArtistCard navigation={navigation} artist={artist} key={index} />
                          )
                        })
                      }
                    </View>

                    : null
                  }

                  {searchResult.hasOwnProperty('songs')
                    ?
                    <View style={styles.itemWrapper}>
                      <Text style={styles.heading}>Bài hát</Text>

                      {
                        threeSongs.map((song, index) => {
                          return (
                            <SongCard song={song} index={0} playlistSongs={EditArrayForTrackPlayer([song])} key={index} />
                          )
                        })
                      }
                    </View>

                    : null
                  }

                  <TouchableOpacity style={styles.viewAllBtn} onPress={() => handleViewAll()}>
                    <Text style={styles.viewAll}>Xem tất cả kết quả</Text>
                  </TouchableOpacity>
                </ScrollView>
              )
              :
              <View style={styles.recommendWrapper}>
                <Text style={styles.heading}>Đề xuất cho bạn</Text>

                <View style={styles.recommendListWrapper}>
                  {recommendData.map((item, index) => {
                    return (
                      <TouchableOpacity key={index} style={styles.recommendBtn} onPress={() => handleClickRecommend(item)}>
                        <Text style={styles.recommend}>{item}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
          )
          :
          <View style={styles.searchTabview}>
            <SearchTabView navigation={navigation} searchResult={searchResult} />
          </View>
      }
    </View>
  )
}

export default Search
