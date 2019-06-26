import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Image, Dimensions } from 'react-native'
import Author from './Author'
import Comments from './Comments'
import AddComment from './AddComment'

class Post extends Component {
    render() {
        const addComment = this.props.user.name ? <AddComment postId={this.props.id} /> : null

        return (
            <View style={styles.container}>
                <Author email={this.props.email} name={this.props.name} />
                <Image source={{ uri: this.props.image }} style={styles.image} />
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
    }
})

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(mapStateToProps, null)(Post)