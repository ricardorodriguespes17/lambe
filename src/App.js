import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import Navigator from './Navigator'
import { setMessage } from './store/actions/message'
import { login } from './store/actions/user'
import AsyncStorage from '@react-native-community/async-storage'

class App extends Component {

    componentDidUpdate = () => {
        if (this.props.text && this.props.text.toString().trim()) {
            Alert.alert(this.props.title || 'Mensagem', this.props.text.toString())
            this.props.clearMessage()
        }
    }

    componentWillMount = () => {
        this.loginUserLogged()
    }

    loginUserLogged = async () => {
        const data = await AsyncStorage.getItem('userLogged')
        const user = JSON.parse(data)
        if(user && user.token){
            this.props.onLogin(user)
        }
    }

    render() {
        return (
            <Navigator />
        )
    }
}

const mapStateToProps = ({ message }) => {
    return {
        title: message.title,
        text: message.text,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(setMessage({ title: '', text: '' })),
        onLogin: (user) => dispatch(login(user)),
        setMessage: (title, mensagem) => dispatch(setMessage(title, mensagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)