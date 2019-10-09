import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_LOADED, LOADING_USER, SCREEN_LOADED } from '../actions/actionsTypes'

const initialState = {
    name: null,
    nickname: null,
    email: null,
    token: null,
    isLoading: false,
    isLoaded: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                name: action.payload.name,
                nickname: action.payload.nickname,
                email: action.payload.email,
                token: action.payload.token,
            }
        case USER_LOGGED_OUT:
            return {
                ...state,
                name: null,
                nickname: null,
                email: null,
                token: null,
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false,
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            }
        case SCREEN_LOADED:
            return {
                ...state,
                isLoaded: true,
            }
        default:
            return state
    }
}

export default reducer
