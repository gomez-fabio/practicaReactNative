import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from 'practicaReactNative/src/commons'
import { Input, Button } from 'practicaReactNative/src/widgets'
import ImagePicker from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'

// Redux
import { connect } from  'react-redux'
import * as CharactersActions from 'practicaReactNative/src/redux/actions/characters'

class CharacterNew extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            nameError: '',

            description: '',
            descriptionError: '',

            comics: '',
            comicsError: '',

            wikiUrl: '',
            wikiUrlError: '',

            detailUrl: '',
            detailUrlError: '',

            image: null,
        }
    }

    validateForm() {
        let valid = true
        let errors = {}

        if(!this.state.name) {
            errors.name = 'Please fill name.'
            valid = false
        }

        if(!this.state.description) {
            errors.description = 'Please fill description.'
            valid = false
        }

        this.setState({ 
            nameError: errors.name ? errors.name : '',
            descriptionError: errors.description ? errors.description : '',
        })

        return valid
    }

    onSubmit(){
        if( this.validateForm() ) {
            
            const characterData = {
                name: this.state.name,
                description: this.state.description ? this.state.description : null,
                comics: this.state.comics ? this.state.comics : null,
                wikiUrl : this.state.wikiUrl ? this.state.wikiUrl : null,
                detailUrl : this.statdetailUrl ? this.statdetailUrl : null,
                image: this.state.image ? 'data:image/jpeg;base64,' + this.state.image.data : null,
            }

            this.props.postCharacter(characterData)  
        } 
    }

    onSelectImageTapped() {
        const options = {
            title: 'Select image',
            storageOptions: {
              skipBackup: true,
              path: 'images'
            }
          };

        ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response); 
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            let source = { uri: response.uri };
        
            this.setState({
            image: response
            });
        }
        });
    }

    render () {      
        const imageUri = this.state.image ? { uri: this.state.image.uri } : null
        const imageButtonText = this.state.image ? this.state.image.fileName : 'Choose image'

        return (
            <ScrollView style={ styles.container }>

                <View style={styles.imageContainer}>
                    <Image source={ imageUri } style={ styles.imageContainerBackground } resizeMode={'cover'} />
                    <TouchableOpacity style={styles.button} onPress={() => this.onSelectImageTapped()}>
                        <Text style={styles.textButton}>{ imageButtonText }</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputContainer}>
                    <Input
                        onChangeText={ (v) => this.setState({ name: v }) } 
                        value = {this.state.name}
                        error = {this.state.nameError}
                        label = {'Name: '}
                        placeholder = {'Spider-Man'} 
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText={ (v) => this.setState({ description: v }) } 
                        value = {this.state.description}
                        error = {this.state.descriptionError}
                        label = {'Description: '}
                        placeholder = {'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. Adopting the name Spider-Man, Peter hoped to start a career using his new abilities. Taught that with great power comes great responsibility, Spidey has vowed to use his powers to help people.'} 
                        multiline = {true}
                        numberOflines = {5}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText={ (v) => this.setState({ comics: v }) } 
                        value = {this.state.comics}
                        error = {this.state.comicsError}
                        label = {'Comics: '}
                        placeholder = {'Spider-Man, New Fantastic Four, etc..'} 
                        multiline = {true}
                        numberOflines = {5}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText={ (v) => this.setState({ wikiUrl: v }) } 
                        value = {this.state.wikiUrl}
                        error = {this.state.wikiUrlError}
                        label = {'Wiki Url: '}
                        placeholder = {'http://www.marvel.com/spider-man/wiki'} 
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input 
                        onChangeText={ (v) => this.setState({ detailUrl: v }) } 
                        value = {this.state.detailUrl}
                        error = {this.state.detailUrlError}
                        label = {'Detail Url: '}
                        placeholder = {'http://www.marvel.com/spider-man/detail'} 
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <Button
                        label   = { 'Submit' }
                        onPress = { () => this.onSubmit() }
                        isFetching = { this.props.isFetching }
                    />
                </View>

            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        postCharacter: (data) => {
            dispatch(CharactersActions.postCharacter(data))
            Actions.pop()
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    imageContainer: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        backgroundColor: 'grey',
        justifyContent: 'center',
    },

    imageContainerBackground: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left:  0,
        right: 0,
    },

    inputContainer : {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    },

    button: {
        padding: 10,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
    },

    textButton: {
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: '600',
    },
})