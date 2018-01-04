import React, { Component } from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export default class CharacterCell extends Component {

    static defaultProps = {
        item     : {},
        onSelect : () => {}
    }


    render() {

        const item     = this.props.item
        const onSelect = this.props.onSelect

        const name   = item.name ? item.name : ''
        const thumbnail    = item.thumbnail ? {uri: item.thumbnail.path + '/landscape_large.' + item.thumbnail.extension} : null
        thumbnail.uri = thumbnail.uri.replace('http', 'https')

        return (
            <TouchableOpacity onPress={ ()=> onSelect(item) }>
                <Image source={thumbnail} resizeMode={'cover'} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}> { name } </Text>
                </View>            
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 250
    },
    textContainer: {
        flexDirection: 'row', // Alineado en la misma línea
        alignItems: 'center',  // Centrado respecto al eje vertical
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)'
    } ,

    name: {
        flex: 1,  // Para que ocupe todo el espacio libre
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})