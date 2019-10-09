import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback, TouchableHighlight, Text } from 'react-native'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'
import Icon from 'react-native-vector-icons/Feather'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { deletePost, likePost, dislikePost } from '../store/actions/posts'

class Post extends Component {

    options = () => {
        this.props.onDelete({ postId: this.props.id })
    }

    like = async () => {
        const post = this.props.posts.find(post => post.id == this.props.id)
        const likes = post.likes || []
        const like = likes.find(item => item == this.props.user.nickname) == this.props.user.nickname
        if (like) {
            this.setState({ liked: false })
            await this.props.onDislike({
                postId: this.props.id,
                userNickname: this.props.user.nickname
            })
        } else {
            this.setState({ liked: true })
            await this.props.onLike({
                postId: this.props.id,
                userNickname: this.props.user.nickname
            })
        }
    }

    render() {
        const post = this.props.posts.find(post => post.id == this.props.id)
        const likes = post.likes || []
        var addComment = null
        var buttonOptions = null
        var interationBar = null
        const like = likes.find(item => item == this.props.user.nickname) == this.props.user.nickname ?
            <Icon2 size={30} color='#f00' name='heart' style={styles.icon} /> :
            <Icon size={30} color='#222' name='heart' style={styles.icon} />

        if (this.props.user.name) {
            addComment = <AddComment postId={this.props.id} />
            interationBar =
                <View style={styles.interationBar}>
                    <TouchableWithoutFeedback onPress={this.like}>
                        {like}
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback>
                        <Icon size={30} color='#222' name='message-circle' style={styles.icon} />
                    </TouchableWithoutFeedback>
                </View>
            buttonOptions =
                <TouchableWithoutFeedback onPress={this.options}>
                    <Icon size={20} color='#222' name='more-vertical' />
                </TouchableWithoutFeedback>
        }
        
        var nicksliked
        switch (likes.length) {
            case 0:
                nicksliked = ""
                break
            case 1:
                nicksliked = likes.join(', ') + ' curtiu'
                break
            case 2:
                nicksliked = likes.join(', ') + ' curtiram'
                break
            case 3:
                nicksliked = likes[0] + ', ' + likes[1] + ', mais 1 pessoa curtiram'
                break
            default:
                nicksliked = likes[0] + ', ' + likes[1] + ', mais ' + (likes.length - 2) + ' pessoas curtiram'
                break
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Author email={this.props.email} name={this.props.name} />
                    {buttonOptions}
                </View>
                <TouchableHighlight onLongPress={this.like}>
                    <Image source={{ uri: this.props.image }} style={styles.image} />
                </TouchableHighlight>
                <Text style={styles.likes} >
                    {nicksliked}
                </Text>
                {interationBar}
                <Comments comments={this.props.comments} />
                {addComment}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#eee'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width * 3 / 4,
        resizeMode: 'contain',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
    },
    interationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    icon: {
        marginLeft: 10,
        marginTop: 5
    },
    likes: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#222'
    }
})

const mapStateToProps = ({ user, posts }) => {
    return {
        user,
        posts: posts.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (payload) => dispatch(deletePost(payload)),
        onLike: (payload) => dispatch(likePost(payload)),
        onDislike: (payload) => dispatch(dislikePost(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)