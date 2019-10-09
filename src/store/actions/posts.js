import { SET_POSTS, CREATING_POST, POST_CREATED, SCREEN_LOADED } from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'

export const addPost = (post) => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-lambe-ricardo.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => {
                dispatch(setMessage({ title: 'Erro', text: 'Dados inválidos!' }))
                dispatch(screenLoaded())
            })
            .then(res => {
                post.image = res.data.imageUrl
                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({ title: 'Erro', text: 'Dados inválidos!' }))
                        dispatch(screenLoaded())
                    })
                    .then(res => {
                        dispatch(getPosts())
                        dispatch(postCreated())
                        dispatch(setMessage({ title: 'Sucesso', text: 'Nova postagem!' }))
                        dispatch(screenLoaded())
                    })
            })
    }
}

export const deletePost = (payload) => {
    return (dispatch, getState) => {
        dispatch(creatingPost())
        axios.delete(`/posts/${payload.postId}.json?auth=${getState().user.token}`)
            .catch(err => {
                dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema '}))
                dispatch(screenLoaded())
            })
            .then(res => {
                dispatch(setMessage({ title: 'Sucesso', text: `Postagem excluída` }))
                dispatch(getPosts())
                dispatch(screenLoaded())
            })
    }
}

export const likePost = (payload) => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({ title: 'Erro', text: 'Erro ao encontrar os dados!' }))
            })
            .then(res => {
                const likes = res.data.likes || []
                likes.push(payload.userNickname)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { likes })
                    .catch(err => {
                        dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                    })
            })
    }
}

export const dislikePost = (payload) => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({ title: 'Erro', text: 'Erro ao encontrar os dados!' }))
            })
            .then(res => {
                var likes = res.data.likes
                likes = likes.filter(userNickname => userNickname != payload.userNickname)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { likes })
                    .catch(err => {
                        dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' }))
                    })
                    .then(res => {
                        dispatch(getPosts())
                    })
            })
    }
}

export const addComment = (payload) => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => { dispatch(setMessage({ title: 'Erro', text: 'Erro ao encontrar os dados!' })) })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => { dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' })) })
                    .then(res => {
                        dispatch(getPosts())
                        //dispatch(setMessage({ title: 'Sucesso', text: 'Comentário adicionado!' }))
                    })
            })
    }
}

export const setPosts = (posts) => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const getPosts = () => {
    return (dispatch) => {
        axios.get('/posts.json')
            .catch(err => { dispatch(setMessage({ title: 'Erro', text: 'Dados inválidos!' })) })
            .then(res => {
                const rawPosts = res.data
                const posts = []
                for (let key in rawPosts) {
                    posts.push({
                        ...rawPosts[key],
                        id: key
                    })
                }

                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}

export const screenLoaded = () => {
    return {
        type: SCREEN_LOADED
    }
}