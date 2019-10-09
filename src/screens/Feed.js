import React, { Component } from 'react'
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native'
import Header from '../components/Header'
import Post from '../components/Post'
import Style from '../style/Style'
import { connect } from 'react-redux'
import { getPosts } from '../store/actions/posts'

class Feed extends Component {

    state = {
        refreshing: false
    }

    componentDidMount = () => {
        this.props.onGetPosts()
    }

    componentWillUpdateUpdate = () => {
        this.props.onGetPosts()
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.props.onGetPosts()
        this.render()
        this.setState({refreshing: false})
    }

    render() {
        return (
            <View style={styles.container}>
                <Header posts={this.props.posts} />
                <FlatList data={this.props.posts}
                    refreshControl={
                        <RefreshControl color='#2965c1'
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
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

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPosts: () => dispatch(getPosts()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)