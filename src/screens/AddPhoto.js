import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import {
    View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback,
    Dimensions, TextInput, Platform, ScrollView, Alert,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Style from '../style/Style'

const noUserMsg = 'Você precisa estar logado para adicionar imagens'

class AddPhoto extends Component {

    state = {
        image: null,
        comment: '',
        fullImage: false,
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({ image: null, comment: '', fullImage: false })
            this.props.navigation.navigate('Feed')
        }
    }

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Falha!', noUserMsg)
            return
        }

        ImagePicker.showImagePicker({
            title: 'Escolha a imagem',
            takePhotoButtonTitle: 'Abrir camera',
            chooseFromLibraryButtonTitle: 'Abrir galeria',
            cancelButtonTitle: 'Cancelar',
            mediaType: 'mixed',
            maxHeight: 600,
            maxWidth: 800,
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: { uri: res.uri, base64: res.data } })
            }
        })
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Falha!', noUserMsg)
            return
        }

        this.props.onAddPost({
            id: Math.random(),
            name: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                name: this.props.name,
                comment: this.state.comment
            }]
        })
    }

    render() {
        minimizePhoto = (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Compartilhe uma imagem</Text>
                    <View style={styles.imageContainer}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ fullImage: true })}
                            style={styles.imageContainer}>
                            <Image source={this.state.image}
                                style={styles.image} />
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={this.pickImage} >
                        <Text style={styles.buttonText}>
                            Escolha uma foto
                        </Text>
                    </TouchableOpacity>
                    <TextInput placeholder='Adicione uma descrição para a foto'
                        style={styles.input}
                        editable={this.props.name != null}
                        onChangeText={(comment) => this.setState({ comment })}
                        value={this.state.comment} />
                    <TouchableOpacity style={[styles.button, this.props.loading ? styles.buttonDisable : null]}
                        onPress={this.save}
                        disabled={this.props.loading} >
                        <Text style={styles.buttonText}>
                            Salvar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )

        maximazePhoto = (
            <TouchableWithoutFeedback onPress={() => this.setState({ fullImage: false })}
                style={styles.fullImage}>
                <Image source={this.state.image}
                    style={styles.image} />
            </TouchableWithoutFeedback>
        )

        return (
            (this.state.image && this.state.fullImage) ? maximazePhoto : minimizePhoto
        )
    }
}

const styles = StyleSheet.create({
    container: { ...Style.container },
    input: { ...Style.input },
    button: { ...Style.button },
    buttonText: { ...Style.buttonText },
    fullImage: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width * 3 / 4,
        backgroundColor: '#f5f5f5',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    buttonDisable: {
        backgroundColor: '#aaa'
    }
})

const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.name,
        name: user.name,
        loading: posts.isUploading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPost: (post) => dispatch(addPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)