import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../store/actions/posts'
import { View, Text, StyleSheet, TextInput, Alert, TouchableWithoutFeedback as TWF } from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

class AddComment extends Component {

    state = {
        comment: '',
        editMode: false
    }

    handleAddComment = () => {
        this.props.onAddComment({
            postId: this.props.postId,
            comment: {
                name: this.props.name,
                comment: this.state.comment
            }
        })

        this.setState({ comment: '', editMode: false })
    }

    render() {
        let commentArea = null

        if (this.state.editMode) {
            commentArea = (
                <View style={styles.container}>
                    <TextInput placeholder='Digite um comentário...'
                        style={styles.input}
                        autoFocus={true}
                        value={this.state.comment}
                        onChangeText={(comment) => this.setState({ comment })}
                        onSubmitEditing={this.handleAddComment} />
                    <TWF onPress={() => this.setState({ editMode: false })} >
                        <Icon name='close' size={15} color='#555' />
                    </TWF>
                </View>
            )
        } else {
            commentArea = (
                <TWF onPress={() => this.setState({ editMode: true })}>
                    <View style={styles.container}>
                        <Icon name='comment' size={25} color='#555' />
                        <Text style={styles.caption}>
                            Adicione um comentário...
                        </Text>
                    </View>
                </TWF>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                {commentArea}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    input: {
        width: '90%',
    },
    caption: {
        marginLeft: 10,
        fontSize: 12,
        color: '#ccc'
    }
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddComment: (payload) => dispatch(addComment(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)