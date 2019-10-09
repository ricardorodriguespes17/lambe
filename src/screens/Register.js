import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import Style from '../style/Style'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({ name: '', email: '', password: '', confirmPassword: '' })
            this.props.navigation.navigate('Profile')
        }
    }

    render() {
        loading = this.props.isLoaded ? null : <ActivityIndicator size='large' color='#2965c1' />

        return (
            <View style={styles.container}>
                <TextInput placeholder='Nome'
                    autoFocus={true}
                    autoCapitalize='words'
                    onChangeText={(name) => this.setState({ name })}
                    value={this.state.name}
                    style={styles.input} />
                <TextInput placeholder='Email'
                    autoCapitalize='none'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    style={styles.input} />
                <TextInput placeholder='Senha'
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    style={styles.input} />
                <TextInput placeholder='Confirmar senha'
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    value={this.state.confirmPassword}
                    style={styles.input} />
                <TouchableOpacity onPress={() => { this.props.onCreateUser(this.state) }}
                    style={[styles.button, this.props.isLoaded ? null : styles.buttonDisable]}>
                    <Text style={styles.buttonText}>Criar</Text>
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
        isLoaded: user.isLoaded
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateUser: (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)