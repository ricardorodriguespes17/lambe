import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED, SCREEN_LOADED } from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'
import AsyncStorage from '@react-native-community/async-storage'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyDdaB2vJVzSTeDmbz85yUmbU2-e6DDnP3k'

export const userLogged = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logouted = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return (dispatch) => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' }))
                dispatch(screenLoaded())
            })
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name,
                        nickname: user.nickname
                    })
                        .catch(err => {
                            dispatch(setMessage({ title: 'Sucesso', text: 'Ocorreu um problema!' }))
                            dispatch(screenLoaded())
                        })
                        .then(() => {
                            dispatch(login(user))
                            dispatch(screenLoaded())
                        })
                }
            })
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}

export const screenLoaded = () => {
    return {
        type: SCREEN_LOADED
    }
}

export const login = (user) => {
    return (dispatch) => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => {
                dispatch(setMessage({ title: 'Erro no login', text: 'Não foi possível logar, verifique o dados!' }))
                dispatch(screenLoaded())
            })
            .then(res => {
                if (res && res.data && res.data.localId) {
                    user.token = res.data.idToken
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err => {
                            dispatch(setMessage({ title: 'Erro', text: 'Erro ao encontrar os dados do usuário' }))
                            dispatch(screenLoaded())
                        })
                        .then(res => {
                            user.name = res.data.name
                            user.nickname = res.data.nickname
                            writeUser(user)
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                            dispatch(screenLoaded())
                        })
                }
            })
    }
}

export const logout = () => {
    return (dispatch) => {
        writeUser({})
        dispatch(logouted())
    }
}

const writeUser = async (user) => {
    await AsyncStorage.setItem('userLogged', JSON.stringify(user))
}