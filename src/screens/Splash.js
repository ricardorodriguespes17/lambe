import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Style from '../style/Style'

export default class Spash extends Component {

    componentDidMount = () => {
        //setTimeout(() => { this.props.navigation.navigate('App') }, 2000)
    }

    render() {
        return (
            <View style={Style.container}>
                <Image source={require('../../assets/imgs/icon.png')} style={styles.image} />
                <Text style={styles.header}>
                    Lambe-Lambe
                </Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    image:{
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    header: {
        fontSize: 50,
        fontFamily: 'shelter',
        color: '#000'
    }
})