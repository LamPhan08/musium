import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Musium from '../../../assets/images/musiumlogo.svg';
import GoogleSVG from '../../../assets/images/google.svg';
import FacebookSVG from '../../../assets/images/facebook.svg';
import TwitterSVG from '../../../assets/images/twitter.svg';

import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import LinearGradient from 'react-native-linear-gradient';

import logo from '../../../assets/images/logo.png'

const LoginScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={["#121111", "#040306" ]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={logo} style={{height: 300, width: 300}}/>
                </View>
                
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        marginBottom: 40,
                        fontFamily: 'Mulish-Bold'
                        
                    }}>
                    Đăng nhập vào tài khoản
                </Text>
                
                <InputField
                    label={'Email'}
                    icon={
                        <MaterialIcons
                            name="alternate-email"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    keyboardType="email-address"
                />

                <InputField
                    label={'Mật khẩu'}
                    icon={
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    fieldButtonLabel={"Quên?"}
                    fieldButtonFunction={() => { }}
                />

                <CustomButton label={"Đăng nhập"} onPress={() => navigation.navigate('App')} />

                <Text style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: 30, fontFamily: 'Mulish-Regular' }}>
                    Hoặc tiếp tục với
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                        gap: 20
                    }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 0.5,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <GoogleSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 0.5,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <FacebookSVG height={24} width={24} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <TwitterSVG height={24} width={24} />
                    </TouchableOpacity> */}
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text style={{fontFamily: 'Mulish-Regular'}}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#06A0B5', fontFamily: 'Mulish-ExtraBold' }}> Đăng ký ngay!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;