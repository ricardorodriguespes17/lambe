import { ADD_POST, ADD_COMMENT } from '../actions/actionsTypes'

initialState = {
    posts: [
        {
            id: Math.random(),
            name: 'Maria Eduarda Martins',
            email: 'funnyduda14@gmail.com',
            image: require('../../../assets/imgs/fence.jpg'),
            comments: [
                {
                    name: 'Ricardo Rodrigues',
                    comment: 'Linda foto!'
                }
            ]
        },
        {
            id: Math.random(),
            name: 'Ricardo Rodrigues',
            email: 'ricardor662@gmail.com',
            image: require('../../../assets/imgs/bw.jpg'),
            comments: [
                {
                    name: 'Thiago Viana',
                    comment: 'Massa demais'
                },
                {
                    name: 'Maria Eduarda Martins',
                    comment: 'Toooop'
                }
            ]
        },
        {
            id: Math.random(),
            name: 'Ricardo Rodrigues',
            email: 'ricardor662@gmail.com',
            image: require('../../../assets/imgs/boat.jpg'),
            comments: []
        }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: state.posts.concat({ ...action.payload })
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.postId) {
                        if(post.comments){
                            post.comments = post.comments.concat(
                                action.payload.comment
                            )
                        }else{
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