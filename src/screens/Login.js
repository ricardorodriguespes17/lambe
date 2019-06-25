import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import Style from '../style/Style'

class Login extends Component {

    state = {
        name: 'Ricardo Rodrigues',
        email: '',
        password: ''
    }

    login = () => {
        this.props.onLogin({ ...this.state })
        this.props.navigation.navigate('Profile')
    }

    openRegister = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Email'
                    style={styles.input}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })} />
                <TextInput placeholder='Password'
                    style={styles.input}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })} />
                <TouchableOpacity style={styles.button}
                    onPress={this.login}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={this.openRegister} >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { ...Style.container },
    input: { ...Style.input },
    button: { ...Style.button },
    buttonText: { ...Style.buttonText }
})

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)