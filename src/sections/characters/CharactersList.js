import React, { Component } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { Colors } from 'practicaReactNative/src/commons'

// Importamos nuestra celda
import CharacterCell from './CharacterCell'

// Redux
import { connect } from 'react-redux';
import * as CharactersActions from 'practicaReactNative/src/redux/actions/characters'


class CharactersList extends Component {

    componentWillMount() {
        this.props.fetchCharactersList()
    }

    onSelect(character) {
        this.props.updateSelected(character)
    }
 
    renderItem(item, index) {
        return < CharacterCell 
            item={item} //parámetros que le pasamos al componente CharacterCell como props
            onSelect= { (character) => // el character que recibo desde el CharacterCell
                        this.onSelect(character) }  // llamamos a la función LOCAL onSelect y le pasamos el character          
        />
    }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data = {this.props.list} // el array con el listado
                    renderItem = { ({item,index}) => this.renderItem(item,index) } // La función que pinta la celda
                    keyExtractor = { (item,index) => index } // un id unico que le tenemos que indicar a Flatlist de cada elemento, pudiera ser cualquiera de los dos.
                    extraData = { this.props } //mira en la doc, no refresca si no tiene esto puesto..
                />
            
            </View>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        list       : state.characters.list,
        character  : state.characters.item,
        isFetching : state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchCharactersList: () => {
            dispatch(CharactersActions.fetchCharactersList())
        },

        updateSelected: (character) => {
            dispatch(CharactersActions.updateCharacterSelected(character))
            Actions.CharacterView({ title: character.name })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList)

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    }
  })

  