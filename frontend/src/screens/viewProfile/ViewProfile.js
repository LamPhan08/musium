import React from 'react'
import styles from './viewProfile.style'
import { SafeAreaView, View, Text, Image, TouchableOpacity } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { StackActions } from '@react-navigation/native'

const ViewProfile = ({ navigation }) => {
    const { user } = useSelector(state => state.song)

    const handleLogout = async () => {
        try {
            // Clear user data from AsyncStorage
            await AsyncStorage.removeItem('userData');
            console.log('removed user data from storage and proceed to login screen')
            if (auth().currentUser) {
                await auth().signOut()
                    .then(() => {
                        GoogleSignin.revokeAccess();
                    });
            }
            // Navigate to the "Login" screen
            navigation.dispatch(StackActions.popToTop());
            navigation.replace('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name='chevron-thin-left' style={styles.headerIcon} />
                </TouchableOpacity>

                <Text style={styles.headerLabel}>Thông tin cá nhân</Text>

                <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
                    <Text style={styles.editBtnText}>Sửa</Text>
                </TouchableOpacity>
            </View>

            <Image style={styles.avatar} source={{ uri: user.photo }} />

            <View style={{ flex: 1 }}>
                <View style={styles.in4Wrapper}>
                    <Text style={styles.heading}>Giới thiệu về bạn</Text>

                    <View style={styles.profileDetailsWrapper}>
                        <View style={styles.detailsItem}>
                            <Text style={styles.title}>Tên của bạn</Text>

                            <Text style={styles.detail}>{user.username}</Text>
                        </View>

                        <View style={styles.detailsItem}>
                            <Text style={styles.title}>ID</Text>

                            <Text style={styles.detail}>{user._id}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.in4Wrapper}>
                    <Text style={styles.heading}>Thông tin tài khoản</Text>

                    <View style={styles.profileDetailsWrapper}>
                        <View style={styles.detailsItem}>
                            <Text style={styles.title}>Email</Text>

                            <Text style={styles.detail}>{user.email}</Text>
                        </View>

                        {/* <View style={styles.detailsItem}>
                        <Text style={styles.title}>Mật khẩu</Text>

                        <Text style={styles.detail}>{user._id}</Text>
                    </View> */}
                    </View>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.btnText}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ViewProfile
