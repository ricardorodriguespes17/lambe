import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'

const authBaseURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'
const API_KEY = 'AIzaSyDdaB2vJVzSTeDmbz85yUmbU2-e6DDnP3k'

export const userLogged = (user) => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const createUser = (user) => {
    return (dispatch) => {
        axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' })))
            .then(res => {
                if (res.data.localId) {
                    axios.put(`/users/${res.data.localId}.json`, {
                        name: user.name
                    })
                        .catch(err => dispatch(setMessage({ title: 'Sucesso', text: 'Ocorreu um problema!' })))
                        .then(res => {
                            dispatch(setMessage({ title: 'Sucesso', text: 'Dados inválidos!' }))
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

export const login = (user) => {
    return (dispatch) => {
        dispatch(loadingUser())
        axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
            .catch(err => dispatch(setMessage({ title: 'Erro', text: 'Dados inválidos!' })))
            .then(res => {
                if (res.data.localId) {
                    axios.get(`/users/${res.data.localId}.json`)
                        .catch(err =>
                            dispatch(setMessage({ title: 'Sucesso', text: 'Ocorreu um problema!' }))
                        )
                        .then(res => {
                            user.password = null,
                                user.name = res.data.name
                            dispatch(userLogged(user))
                            dispatch(userLoaded())
                            dispatch(setMessage({ title: 'Sucesso', text: 'Usuário logado!' }))
                        })
                }
            })
    }
}