import React, { useState, useEffect } from 'react'
import styles from './commentCard.style'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { COLORS } from '../../constants/colors'
import { useSelector } from 'react-redux'
import { formatCommentTimestamp } from '../../utils/formatCommentTimestamp'
import CommentBottomSheet from '../commentBottomSheet/CommentBottomSheet'
import { likeComment, unLikeComment } from '../../api/comment'
import { mongoAPI } from '../../axios/axios';

const CommentCard = ({ comment, loadData }) => {
    const { user, song } = useSelector(state => state.song)

    const [userData, setUserData] = useState({
        photo: comment.avatar,
        username: comment.username
    })

    const [isLiked, setIsLiked] = useState(false)
    const [showBottomSheet, setShowBottomSheet] = useState(false)

    const handleLikeOrUnlike = async () => {
        if (isLiked) {
            await unLikeComment(song.id, comment._id, user._id)

            setIsLiked(false)

            loadData()
        }
        else {
            await likeComment(song.id, comment._id, user._id);

            setIsLiked(true)

            loadData()
        }
    }

    useEffect(() => {
        (
            async () => {
                const check = comment.likes.some(like => like.userId === user._id)

                setIsLiked(check)

                try {

                    const getDataRespone = await mongoAPI.get(`/user/getuser/${comment.userId}`)
                    setUserData({ ...getDataRespone.data })

                } catch (error) {
                    console.error(error.message)
                }
            }
        )()
    }, [comment])
    // useEffect(() => {

    //   const getUser = async () => {
    //     try {

    //       const getDataRespone = await mongoAPI.get(`/user/getuser/${user._id}`)
    //       setFormData({...getDataRespone.data})

    //     } catch (error) {
    //       console.error(error.message)
    //     }
    //   };

    //    getUser();
    // }, []);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: userData.photo }}
                style={styles.avatar}
            />

            <View style={styles.commentIn4Wrapper}>
                <View style={styles.commentContentWrapper}>
                    <View style={styles.usernameWrapper}>
                        <Text
                            style={[
                                styles.username,
                                {
                                    color: comment.userId === user._id
                                        ? COLORS.primary
                                        : COLORS.grey
                                }
                            ]}
                            numberOfLines={1}
                        >
                            {userData.username}
                        </Text>

                        <Entypo name='dot-single' style={styles.dotIcon} />

                        <Text style={styles.createdAt}>{formatCommentTimestamp(comment.createdAt)}</Text>
                    </View>

                    <Text style={styles.comment}>{comment.content}</Text>
                </View>

                <View style={styles.commentInteractionWrapper}>
                    <TouchableOpacity style={styles.likeBtn} onPress={handleLikeOrUnlike}>
                        {isLiked
                            ? <Ionicons name='heart' style={styles.heartIcon} color={COLORS.primary} />
                            : <Ionicons name='heart-outline' style={styles.heartIcon} color={COLORS.white} />
                        }

                        {comment.likes !== 0 &&
                            <Text style={styles.likes}>{comment.likes.length}</Text>
                        }
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity>
                        <Text style={styles.reply}>Trả lời</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <TouchableOpacity onPress={() => setShowBottomSheet(!showBottomSheet)}>
                <Feather name='more-vertical' style={styles.moreIcon} />
            </TouchableOpacity>

            {showBottomSheet &&
                <CommentBottomSheet
                    showBottomSheet={showBottomSheet}
                    setShowBottomSheet={setShowBottomSheet}
                    comment={comment}
                    loadData={loadData}
                />
            }
        </View>
    )
}

export default CommentCard
