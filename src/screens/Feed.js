import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'
import Style from '../style/Style'
import { connect } from 'react-redux'

class Feed extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header posts={this.props.posts} />
                <FlatList data={this.props.posts}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item }) =>
                        <Post key={item.id} {...item} />} >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { ...Style.container }
})

const mapStateToProps = ({ posts }) => {
    return {
        posts: posts.posts
    }
}

export default connect(mapStateToProps, null)(Feed)