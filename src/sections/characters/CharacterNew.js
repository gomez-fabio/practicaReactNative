import React, { Component } from 'react';
import { View, TextInput, Image, StyleSheet } from 'react-native';
import { Colors } from 'practicaReactNative/src/commons'
import { Input, Button } from 'practicaReactNative/src/widgets'

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
        }
    }

    render () {
        return (
            <View style={ styles.container }>
                
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
                
                <View style={styles.buttonContainer} >
                    <Button
                        label   = { 'Submit' }
                        onPress = { () => this.onSubmit }
                        isFetching = { this.props.isFetching }
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.characters.isFetching
    }
}

export default connect(mapStateToProps, null)(CharacterNew)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20
    },

    inputContainer : {
        margin: 20,
    },

    buttonContainer: {
        margin: 20,
    }
})