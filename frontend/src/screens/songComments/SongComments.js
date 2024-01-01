import React, { useEffect, useState, useRef } from 'react'
import styles from './songComments.style'
import { SafeAreaView, TouchableOpacity, Text, View, ScrollView, ActivityIndicator, Image, TextInput, FlatList } from 'react-native'
import Octicons from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants/colors'
import avatar from '../../../assets/images/avatar.png'
import { getSongComments, postComment } from '../../api/comment'
import CommentCard from '../../components/commentCard/CommentCard'
import { useSelector } from 'react-redux'

const SongComments = ({ navigation, route }) => {
    const { songId } = route.params

    const { user } = useSelector(state => state.song)

    const [comments, setComments] = useState()
    const [commentText, setCommentText] = useState('')
    const [inputHeight, setInputHeight] = useState(40);

    const inputRef = useRef()

    const handleContentSizeChange = (contentHeight) => {
        // Set chiều cao của TextInput không vượt quá 80
        const newHeight = Math.min(100, Math.max(40, contentHeight));
        setInputHeight(newHeight);
    };


    const loadData = async () => {
        const result = await getSongComments(songId)

        if (result) {
            
            setComments(result.comments)

        }
        else {
            setComments([])
        }
    }

    // console.log(comments.length)
    const handlePostComment = async () => {
        await postComment(songId, user._id, user.username, user.photo, commentText.trim(), Date.now())

        loadData();

        inputRef.current.clear();
        setCommentText('');
        setInputHeight(40)

    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.invisibleView} />

                <Text style={styles.headerLabel}>
                    Bình luận
                    {comments
                        ? ` (${comments.length})`
                        : ''
                    }
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name='close' style={styles.headerIcon} />
                </TouchableOpacity>

            </View>

            {comments
                ?
                (
                    comments.length !== 0
                        ?
                        <FlatList
                            style={styles.commentList}
                            contentContainerStyle={{paddingBottom: 10, gap: 5}}
                            data={comments}
                            showsVerticalScrollIndicator={false}
                            decelerationRate='fast'
                            initialNumToRender={20}
                            maxToRenderPerBatch={10}
                            updateCellsBatchingPeriod={50}
                            windowSize={20}
                            renderItem={({ item, index }) => {
                                return (
                                    <CommentCard
                                        key={index}
                                        comment={item}
                                        songId={songId}
                                        loadData={loadData}
                                    />
                                )
                            }}
                        />
                        :
                        <View style={styles.noCommentsWrapper}>
                            <Octicons name='comment-discussion' style={styles.commentIcon} />

                            <Text style={styles.noComments}>Chưa có bình luận</Text>

                            <Text style={styles.tooltip}>Hãy trở thành người đầu tiên bình luận bài hát</Text>
                        </View>
                )

                :
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator size='large' color={COLORS.primary} />
                </View>
            }

            {comments &&
                <View style={styles.commentInputWrapper}>
                    <Image
                        source={{uri: user.photo}}
                        style={styles.userAvatar}
                    />

                    <View style={styles.inputWrapper}>
                        <TextInput
                            ref={inputRef}
                            value={commentText}
                            onChangeText={text => setCommentText(text)}
                            placeholder="Chạm để bình luận..."
                            style={[styles.input, { height: inputHeight }]}
                            returnKeyType='none'
                            multiline={true}
                            cursorColor={COLORS.primary}
                            placeholderTextColor={COLORS.grey}
                            onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize.height)}
                        />
                    </View>

                    <TouchableOpacity
                        disabled={commentText.trim() === '' ? true : false}
                        style={[styles.postBtn, {
                            backgroundColor: commentText.trim() !== ''
                                ? COLORS.primary
                                : COLORS.lightBlack
                        }]}
                        onPress={handlePostComment}
                    >
                        <Octicons
                            name='arrow-up'
                            style={styles.postIcon}
                            color={
                                commentText.trim() !== ''
                                    ? COLORS.white
                                    : 'rgba(255, 255, 255, 0.2)'
                            }
                        />
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

export default SongComments
