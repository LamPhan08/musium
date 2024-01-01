import React from 'react'
import styles from './commentBottomSheet.style'
import { Modal, View, Text, TouchableOpacity, ToastAndroid, Pressable } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import Clipboard from '@react-native-clipboard/clipboard';
import { deleteComment } from '../../api/comment'

const CommentBottomSheet = ({showBottomSheet, setShowBottomSheet, comment, loadData,}) => {
    const { user, song } = useSelector(state => state.song)

    const handleCopyToClipboard = () => {
        Clipboard.setString(comment.content);

        setShowBottomSheet(!showBottomSheet)
    }

    const handleDeleteComment = async () => {
        await deleteComment(song.id, comment._id)

        if (loadData) {
            loadData()
        }
        
        ToastAndroid.show('Đã xóa bình luận!', ToastAndroid.BOTTOM)

        setShowBottomSheet(!showBottomSheet)
    }

    return (
        <Modal
            transparent={true}
            visible={showBottomSheet}
            animationType='slide'
            onRequestClose={() => setShowBottomSheet(!showBottomSheet)}
        >
            <Pressable
                style={styles.backdrop}
                onPress={() => setShowBottomSheet(!showBottomSheet)}
            />

            <View style={styles.bottomSheet}>
                <View style={styles.labelWrapper}>
                    <Text style={styles.label}>Bình luận của {comment.username}</Text>
                </View>

                <View style={styles.optionsWrapper}>
                    <TouchableOpacity style={styles.optionBtn} onPress={handleCopyToClipboard}>
                        <Feather name='copy' style={styles.icon} />

                        <Text style={styles.optionText}>Sao chép bình luận</Text>
                    </TouchableOpacity>

                    {comment.userId === user._id &&
                        <TouchableOpacity style={styles.optionBtn} onPress={handleDeleteComment}>
                            <Feather name='trash-2' style={styles.icon} />

                            <Text style={styles.optionText}>Xóa bình luận</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </Modal>
    )
}

export default CommentBottomSheet
