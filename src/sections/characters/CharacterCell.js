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
        const thumbnail    = item.thumbnail ? {uri: item.thumbnail.path + '/landscape_amazing.' + item.thumbnail.extension} : null
        thumbnail.uri = thumbnail.uri.replace('http', 'https')

        return (
            <TouchableOpacity onPress={ ()=> onSelect(item) }>
                <Image source={thumbnail} resizeMode={'cover'} style={styles.image} />
                <View style={styles.textContainerBack}>
                    <Text style={styles.nameBack}> { name } </Text>
                </View>
                <View style={styles.textContainerFront}>
                    <Text style={styles.nameFront}> { name } </Text>
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
    textContainerFront: {
        flexDirection: 'row', // Alineado en la misma línea
        alignItems: 'center',  // Centrado respecto al eje vertical
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.2)'
    } ,

    textContainerBack: {
        flexDirection: 'row', // Alineado en la misma línea
        alignItems: 'center',  // Centrado respecto al eje vertical
        padding: 20,
        position: 'absolute',
        bottom: -2,
        right: 0,
        left: 2,
        backgroundColor: 'transparent'
    } ,

    nameBack: {
        flex: 1,  // Para que ocupe todo el espacio libre
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },

    nameFront: {
        flex: 1,  // Para que ocupe todo el espacio libre
        fontSize: 18,
        fontWeight: 'bold',
        color: 'yellow',
    },
})