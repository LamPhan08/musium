import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    Keyboard,
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
import { COLORS } from '../../constants/colors';

// import { Link, useNavigate } from 'react-router-dom'

import { mongoAPI } from '../../axios/axios';

import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/songSlice';

// import com.facebook.FacebookSdk;
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

const { width, height } = Dimensions.get('window')

const LoginScreen = ({ navigation }) => {
    const [facebookLoginInProgress, setFacebookLoginInProgress] = useState(false);

    const [inputs, setInputs] = React.useState({
        email: '',
        password: '',
    });
    const email = inputs.email
    const password = inputs.password
    const [errors, setErrors] = React.useState({});

    const dispatch = useDispatch()


    // const navigate = useNavigate();
    // const {dispatch} = useContext(AuthContext);

    GoogleSignin.configure({
        webClientId: '916968479424-8beoiql3s7il2ao2p085vqm4128ecs0c.apps.googleusercontent.com',
        // webClientId: '768264570933-ec9atg4laq8l9vgcjdqq731id97cd72t.apps.googleusercontent.com'
    });

    // useEffect(() => {
    //     // Initialize GoogleSignin
    //     GoogleSignin.configure({
    //       webClientId: '768264570933-ec9atg4laq8l9vgcjdqq731id97cd72t.apps.googleusercontent.com',
    //       offlineAccess: true,
    //     });
    // }, []);

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        const userCredential = await auth().signInWithCredential(googleCredential);

        // Extract user information
        const user = userCredential.user;
        console.log(user);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    // const signInWithGoogle = async () => {
    //     try {
    //       await GoogleSignin.hasPlayServices();
    //       const userInfo = await GoogleSignin.signIn();
    //       console.log('User Info:', userInfo);
    //       // Handle the successful login here
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         console.log('User cancelled the login process');
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         console.log('Signin in progress');
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         console.log('Play services not available or outdated');
    //       } else {
    //         console.log('Something went wrong:', error);
    //       }
    //     }
    //   };

    async function onFacebookButtonPress() {
        try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions([
                'email'
            ]);
        
            if (result.grantedPermissions === "") {
                // throw 'User cancelled the login process';
                console.log("No permission granted")
            }

            if (result.isCancelled) {
            // throw 'User cancelled the login process';
                console.log("Clicked cancel")
                // navigation.navigate('Login')
            }
        
            // Once signed in, get the users AccessToken
            const data = await AccessToken.getCurrentAccessToken();
        
            if (!data) {
            throw 'Something went wrong obtaining access token';
            }
        
            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            const userCredential = await auth().signInWithCredential(facebookCredential);
            // Extract user information
            const user = userCredential.user;
            console.log(user);
        
            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleClick = async e => {
        e.preventDefault();
        const loginResponse = await mongoAPI.post(`/auth/login`,
            {
                email,
                password
            }
        );
        // console.warn(`${email}` + ' ' + `${password}`)
        console.log("Login Response:", loginResponse.data);
        // Assuming your login response contains user data, adjust the following code accordingly
        const userData = loginResponse.data;

        // Store user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        dispatch(setUser(userData.data))

        navigation.replace('App')
    }

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Vui lòng điên email hợp lệ', 'email');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Bạn phải điền password ', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Password quá yếu', 'password');
            isValid = false;
        }

        if (isValid) {
            handleClick();
        }
    };


    return (
        <LinearGradient colors={["#121111", "#040306"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ paddingHorizontal: 25 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={logo} style={{ height: 300, width: 300 }} />
                    </View>

                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: width * 0.06,
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
                        onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        error={errors.email}

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
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        error={errors.password}

                    />

                    <CustomButton label={"Đăng nhập"} onPress={handleClick} />

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
                            // onPress={() => { }}
                            onPress={
                                () => onGoogleButtonPress()
                                .then(() => {
                                    console.log('Signed in with Google!');
                                    navigation.navigate('App');
                                }
                                )
                                .catch((error) => {
                                    console.log(error.message);
                                })
                                // signInWithGoogle
                            }
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
                            // onPress={() => { }}
                            onPress={() => 
                                // onFacebookButtonPress().
                                // then(() => 
                                //     {
                                //         console.log('Signed in with Facebook!');
                                //         navigation.navigate('App')
                                //     })
                                // .catch(() => console.log("Sign in with facebook failed"))
                                {
                                    setFacebookLoginInProgress(true);
                                    onFacebookButtonPress()
                                        .then(() => {
                                            console.log('Signed in with Facebook!');
                                            // Conditionally navigate only if Facebook login is not in progress
                                            if (!facebookLoginInProgress) {
                                                navigation.navigate('App');
                                            }
                                        })
                                        .catch(() => console.log('Sign in with Facebook failed'))
                                        .finally(() => setFacebookLoginInProgress(false));
                                }
                            }
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
                        <Text style={{ fontFamily: 'Mulish-Regular', color: COLORS.text }}>Bạn chưa có tài khoản?</Text>
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