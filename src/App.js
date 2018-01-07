import React, { Component } from 'react';
import { StyleSheet,View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from 'practicaReactNative/src/webservices/webservices'
import { Colors } from 'practicaReactNative/src/commons'

/********************* COMPONENTS *********************/
import CharactersList from 'practicaReactNative/src/sections/characters/CharactersList';
import CharacterView  from 'practicaReactNative/src/sections/characters/CharacterView';
import CharacterNew  from 'practicaReactNative/src/sections/characters/CharacterNew';


/********************* REDUX *********************/
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'

import * as reducers from 'practicaReactNative/src/redux/reducers' // tenemos un index, no hay que especificar mas
const reducer = combineReducers(reducers) // combina los que hemos importado en reducers, que ya vienen todos juntos desde el index.
const store = createStore(                // Creamos el store con:
  reducer,                                // nuestros reducers combinados
  applyMiddleware(thunk)                  // Nuestro middleware
)

export default class App extends Component {
    
    componentWillMount() {
        webservices.configureAxios()
        StatusBar.setBarStyle('dark-content')
      }

    renderAddCharacterButton() {
      return (
        <TouchableOpacity style={styles.addButton} onPress={ () => Actions.CharacterNew() }>
          <Text style={styles.addButtonText}>{'Add'}</Text>
        </TouchableOpacity>
      )
    }
    
    render() {
        console.disableYellowBox = true;

        return (
          <Provider store= {store}>
            <Router>
              <Scene key="root">
                <Scene 
                  title = {'MARVEL Characters'}
                  key = {'CharactersList'}
                  component= { CharactersList }
                  navigationBarStyle= { styles.navBar }
                  navBarButtonColor= { 'black' }
                  renderRightButton={ () => this.renderAddCharacterButton() }
                />

                <Scene
                  key = {'CharacterView'}
                  component = { CharacterView }
                  navigationBarStyle= { styles.navBar }
                  navBarButtonColor= { 'black' }  
                />

                <Scene
                  key={'CharacterNew'}
                  component= {CharacterNew}
                  navigationBarStyle= {styles.navBar}
                  navBarButtonColor= { 'black' }
                  title={ 'Add' }
                />
              </Scene>
            </Router>
          </Provider>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: Colors.navBar
    },

    addButton: {
      padding: 20,
      alignItems: 'center',
      justifyContent:'center'
    },
  
    addButtonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600'
    }
  });
