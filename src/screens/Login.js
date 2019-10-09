import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import Style from '../style/Style'

class Login extends Component {

    state = {
        name: '',
        email: '',
        password: '',

    }

    componentWillMount = () => {
        if(this.props.user.token){
            this.props.navigation.navigate('Profile')
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = () => {
        this.props.onLogin({ ...this.state })
    }

    openRegister = () => {
        this.props.navigation.navigate('Register')
    }

    render() {
        loading = this.props.isLoaded ? null : <ActivityIndicator size='large' color='#2965c1' />

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
                <TouchableOpacity style={[styles.button, this.props.isLoaded ? null : styles.buttonDisable]}
                    disabled={!this.props.isLoaded}
                    onPress={this.login}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, this.props.isLoaded ? null : styles.buttonDisable]}
                    disabled={!this.props.isLoaded}
                    onPress={this.openRegister} >
                    <Text style={styles.buttonText}>Criar conta</Text>
                </TouchableOpacity>
                {loading}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { ...Style.container },
    input: { ...Style.input },
    button: { ...Style.button },
    buttonText: { ...Style.buttonText },
    buttonDisable: { backgroundColor: '#aaa' }
})

const mapStateToProps = ({ user }) => {
    return {
        user,
        isLoading: user.isLoading,
        isLoaded: user.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)