import { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const initial_state = {
//     user: AsyncStorage.getItem('user') !== undefined ? JSON.parse(AsyncStorage.getItem('user')) : null,
//     loading: false,
//     error: null
// };

const loadInitialState = async () => {
    try {
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;
    
        return {
            user,
            loading: false,
            error: null
        };
        } catch (error) {
            console.error("Error loading initial state:", error);
        
            return {
                user: null,
                loading: false,
                error: error.message
            };
        }
    };
  
const initial_state = loadInitialState();

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
    switch(action.type)
    {
        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'REGISTER_SUCCESS':
            return {
                user: null,
                loading: false,
                error: null,
            };
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(AuthReducer, initial_state);

    useEffect(() => {
        AsyncStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return <AuthContext.Provider value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
    }}>
        {children}
    </AuthContext.Provider>;
};
