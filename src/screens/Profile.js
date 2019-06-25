import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store/actions/user'
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Gravatar } from 'react-native-gravatar'
import Style from '../style/Style'

class Profile extends Component {

    logout = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
    }

    editProfile = () => {

    }

    render() {
        const options = {
            email: this.props.email,
            secure: true
        }

        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.name}>
                    {this.props.name}
                </Text>
                <Text style={styles.email}>
                    {this.props.email}
                </Text>
                <TouchableOpacity style={styles.button}
                    onPress={this.editProfile}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={this.logout}>
                    <Text style={styles.buttonText}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { ...Style.container },
    input: { ...Style.input },
    button: { ...Style.button },
    buttonText: { ...Style.buttonText },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginTop: 100,
    },
    name: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#444'
    },
    email: {
        fontSize: 25,
        marginTop: 20,
        color: '#999',
    },
})

const mapStateToProps = ({ user }) => {
    return {
        name: user.name,
        email: user.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)