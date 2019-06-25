import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Gravatar } from 'react-native-gravatar'

export default (props) => {
    return (
        <View style={styles.container}>
            <Gravatar options={{ email: props.email, secure: true }} style={styles.avatar} />
            <Text style={styles.name}>
                {props.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 10
    },
    name: {
        color: '#444',
        fontSize: 15,
        fontWeight: 'bold',
    }
})