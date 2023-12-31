import React, { useState, useEffect } from 'react'
import { Modal, Pressable, View, Text, TouchableOpacity, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native'
import styles from './playlistListModal.style'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { getUserPlaylists } from '../../api/playlist'
import { useSelector } from 'react-redux'
import ModalAddPlayList from '../modalAddPlayList/ModalAddPlayList'
import { COLORS } from '../../constants/colors'
import AddSongPlaylistCard from '../addSongPlaylistCard/AddSongPlaylistCard'

const PlaylistListModal = ({ showModal, setShowModal, setCloseParentModal, song }) => {
  const { user } = useSelector(state => state.song)
  const [showPopup, setShowPopup] = useState(false)
  const [playlists, setPlaylists] = useState()

  const loadData = async () => {
    const result = await getUserPlaylists(user._id);

    if (result.length !== 0) {
      setPlaylists(result.playlists)
    }
    else {
      setPlaylists([])
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Modal
      visible={showModal}
      animationType='slide'
      onRequestClose={() => {
        // setShowModal(!showModal)
        if (setCloseParentModal) {
          setCloseParentModal(false)
        }
        else {
          setShowModal(!showModal)
        }
      }}
    >
      <View style={styles.bottomSheet}>
        <View style={styles.labelWrapper}>
          <View style={styles.invisibleView} />

          <Text style={styles.label}>Thêm vào Playlist</Text>

          <TouchableOpacity onPress={() => {
            // setShowModal(!showModal)
            if (setCloseParentModal) {
              setCloseParentModal(false)
            }
            else {
              setShowModal(!showModal)
            }
          }}>
            <Entypo name="cross" style={styles.crossIcon} />
          </TouchableOpacity>
        </View>

        {playlists
          ?
          <View style={styles.playlistListWrapper}>
            <Text style={styles.tooltip}>Chọn Playlist để thêm bài hát vào</Text>

            <ScrollView
              contentContainerStyle={{paddingBottom: 60}}
              showsVerticalScrollIndicator={false}
              decelerationRate='fast'
            >
              <ModalAddPlayList showPopup={showPopup} setShowPopup={setShowPopup} loadData={loadData} />

              <TouchableOpacity style={styles.addPlaylistBtn} onPress={() => setShowPopup(true)}>
                <View style={styles.addIconWrapper}>
                  <Feather name="plus" style={styles.addIcon} />
                </View>

                <Text style={styles.addPlaylistBtnText}>Tạo Playlist mới</Text>
              </TouchableOpacity>

              {playlists.map((playlist, index) => {
                return (
                  <AddSongPlaylistCard key={index} playlist={playlist} userId={user._id} song={song} setShowBottomSheet={setCloseParentModal ? setCloseParentModal : setShowModal}/>
                )
              })}
            </ScrollView>
          </View>

          :
          <View style={styles.loadingWrapper}>
            <ActivityIndicator size='large' color={COLORS.primary}/>
          </View>
        }
      </View>
    </Modal>
  )
}

export default PlaylistListModal
