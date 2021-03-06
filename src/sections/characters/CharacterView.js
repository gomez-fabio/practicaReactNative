import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, Linking } from 'react-native';
import { Colors } from 'practicaReactNative/src/commons'
import { connect } from 'react-redux'
import { Button } from 'practicaReactNative/src/widgets'

class CharacterView extends Component {

    onSubmit() {

    }

    render () {
        // console.log ("this.props.character: ", this.props.character)
        const { character } = this.props
        const description = character.description ? character.description : 'No description available'
        const thumbnail = character && character.thumbnail ? {uri: character.thumbnail.path + '/landscape_amazing.' + character.thumbnail.extension} : null
        const wikiUrl = character.urls && character.urls[1] && character.urls[1].type  == 'wiki' ? character.urls[1].url : null
        const detailUrl = character.urls && character.urls[0] && character.urls[0].type  == 'detail' ? character.urls[0].url : null

        return(
            <ScrollView style={styles.container}>
                <Image source={thumbnail} style={styles.image} resizeMode={'cover'} /> 
                <View style={styles.textContainer}>
                    <Text style={styles.description}>{ description }</Text>
                </View>
                <View style={styles.buttonContainer}>
                    { wikiUrl ? <Button label={'Wiki'} containerStyle={styles.button} onPress={ () => Linking.openURL(wikiUrl) } /> : null}
                    { detailUrl ? <Button label={'Detail'} containerStyle={styles.button} onPress={ () => Linking.openURL(detailUrl) } /> : null }
                </View>
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

    button:{
        flex: 1,
        margin:10,
    },

    buttonContainer: {
        flexDirection: 'row',
        margin: 20,
    },
});