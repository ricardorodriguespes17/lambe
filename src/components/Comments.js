import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class Comments extends Component {
    render() {
        let view = null
        const space = " "

        if(this.props.comments){
            view = this.props.comments.map((item, index) => {
                return(
                    <View style={styles.commentContainer} key={index}>
                        <Text style={styles.name}>
                            {item.name}
                            {space}
                        </Text>
                        <Text style={styles.comment}>
                            {item.comment}
                        </Text>
                    </View>
                )
            })
        }

        return (
            <View style={styles.container}>
                {view}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginVertical: 5,
    },
    commentContainer: {
        flexDirection: 'row',
        marginTop: 5
    },
    name: {
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#444'
    },
    comment: {
        color: '#555'
    }
})