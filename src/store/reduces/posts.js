import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED, SCREEN_LOADED } from '../actions/actionsTypes'

initialState = {
    posts: [],
    isUploading: false,
    isLoaded: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATING_POST:
            return {
                ...state,
                isUploading: true,
                isLoaded: false
            }
        case POST_CREATED:
            return {
                ...state,
                isUploading: false
            }
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SCREEN_LOADED:
            return {
                ...state,
                isLoaded: true
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if (post.comments) {
                            post.comments = post.comments.concat(
                                action.payload.comment
                            )
                        } else {
                            post.comments = [action.payload.comment]
                        }
                    }
                    return post
                })
            }
        default:
            return state
    }
}

export default reducer