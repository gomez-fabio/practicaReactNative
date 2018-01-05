import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, Button,ScrollView } from 'react-native';
import { Colors } from 'practicaReactNative/src/commons'
import { connect } from 'react-redux'

class CharacterView extends Component {

    render () {
        console.log ("this.props.character: ", this.props.character)
        const { character } = this.props
        const description = character.description ? character.description : 'No description available'
        const thumbnail = character && character.thumbnail ? {uri: character.thumbnail.path + '/landscape_amazing.' + character.thumbnail.extension} : null

        return(
            <ScrollView style={styles.container}>
                <Image source={thumbnail} style={styles.image} resizeMode={'cover'} /> 
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{ description }</Text>
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button title={'Eliminar'} onPress={ () => this.onSubmit(character) } isFetching={this.props.isFetching} />
                </View> */}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        character: state.characters.item,
    }
}

export default connect(mapStateToProps, null)(CharacterView)


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    description: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },

    image: {
        width: '100%',
        height: 250,
    },

    buttonContainer: {
        margin: 20,
    },
});