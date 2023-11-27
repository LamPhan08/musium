import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Musium from '../../assets/images/musiumlogo.svg';
import GoogleSVG from '../../assets/images/google.svg';
import FacebookSVG from '../../assets/images/facebook.svg';
import TwitterSVG from '../../assets/images/twitter.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={["#121111", "#040306" ]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <View style={{ alignItems: 'center' }}>
                    <Musium
                        height={300}
                        width={300}
                        
                    />
                </View>
                
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        marginBottom: 40,
                        
                        
                    }}>
                    Login to your account
                </Text>
                
                <InputField
                    label={'Email ID'}
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
                    label={'Password'}
                    icon={
                        <Ionicons
                            name="lock-closed"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    fieldButtonLabel={"Forgot?"}
                    fieldButtonFunction={() => { }}
                />

                <CustomButton label={"Login"} onPress={() => navigation.navigate('App')} />

                <Text style={{ textAlign: 'center', color: '#FFFFFF', marginBottom: 30 }}>
                    Or, login with ...
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 30,
                    }}>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
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
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <FacebookSVG height={24} width={24} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            borderColor: '#ddd',
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 10,
                        }}>
                        <TwitterSVG height={24} width={24} />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 30,
                    }}>
                    <Text>New to the app?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#06A0B5', fontWeight: '700' }}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
        </LinearGradient>
    );
};

export default LoginScreen;