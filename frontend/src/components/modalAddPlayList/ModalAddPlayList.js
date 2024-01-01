import React, { useState, useRef, useEffect } from 'react'
import {
    Text,
    View,
    Pressable,
    TouchableOpacity,
    TextInput,
    Modal,
    ToastAndroid,
    Keyboard
} from 'react-native'
import { COLORS } from '../../constants/colors'
import styles from './modalAddPlaylist.style'
import { createPlaylist } from '../../api/playlist'
import { useSelector } from 'react-redux'

const ModalAddPlayList = ({ showPopup, setShowPopup, loadData }) => {
    const { user } = useSelector(state => state.song)

    const [name, setName] = useState("")

    const inputRef = useRef()

    const handleCreatePlaylist = async () => {
        if (name !== '') {
            await createPlaylist(user._id, name, user.username);

            ToastAndroid.show(`Đã tạo Playlist ${name}`, ToastAndroid.BOTTOM)

            setShowPopup(!showPopup)
            setName('')

            if (loadData) {
                loadData()
            }
        }
    }
    

    return (
        <Modal
            animationType='fade'
            onShow={() => inputRef.current?.focus()}
            transparent={true}
            visible={showPopup}
            onRequestClose={() => {
                setShowPopup(!showPopup)
                setName('')
            }}
        >
            <Pressable style={styles.popupModal} onPress={() => {
                setShowPopup(!showPopup)
                setName('')
            }} />

            <View style={styles.modal}>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Tạo Playlist mới</Text>

                    <TextInput
                        ref={inputRef}
                        showSoftInputOnFocus={true}
                        placeholderTextColor={COLORS.grey}
                        placeholder='Nhập tên Playlist'
                        autoCorrect={false}
                        style={styles.textInput}
                        value={name}
                        returnKeyType='default'
                        onSubmitEditing={handleCreatePlaylist}
                        cursorColor={COLORS.primary}
                        onChangeText={text => setName(text)}
                    />
                </View>

                <View style={styles.btnWrapper}>
                    <TouchableOpacity
                        style={[
                            styles.createBtn,
                            {
                                backgroundColor: name === ''
                                    ? COLORS.grey
                                    : COLORS.primary
                            }
                        ]}
                        disabled={name === '' ? true : false}
                        onPress={handleCreatePlaylist}
                    >
                        <Text style={styles.createBtnText}>Tạo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setShowPopup(!showPopup)
                        }}
                        style={styles.cancelBtn}>
                        <Text style={styles.cancelBtnText}>Hủy</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )
}

export default ModalAddPlayList