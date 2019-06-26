import { SET_POSTS, ADD_COMMENT, CREATING_POST, POST_CREATED } from './actionsTypes'
import axios from 'axios'
import { setMessage } from './message'

export const addPost = (post) => {
    return (dispatch) => {
        dispatch(creatingPost())
        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-lambe-lambe-ricardo.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image.base64
            }
        })
            .catch(err => console.log(err))
            .then(res => {
                post.image = res.data.imageUrl
                axios.post('/posts.json', { ...post })
                    .catch(err => dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' })))
                    .then(res => {
                        dispatch(getPosts())
                        dispatch(postCreated())
                        dispatch(setMessage({ title: 'Sucesso', text: 'Nova postagem!' }))
                    })
            })
    }
}

export const addComment = (payload) => {
    return (dispatch) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' })))
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)
                axios.patch(`/posts/${payload.postId}.json`, { comments })
                    .catch(err => dispatch(setMessage({ title: 'Erro', text: 'Ocorreu um problema!' })))
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
            .catch(err => console.log(err))
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