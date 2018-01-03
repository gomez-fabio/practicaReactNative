import React, { Component } from 'react';
import { StyleSheet,View, StatusBar } from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import * as webservices from 'practicaReactNative/src/webservices/webservices'
import { Colors } from 'practicaReactNative/src/commons'

import CharactersList from 'practicaReactNative/src/sections/characters/CharactersList';


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
        StatusBar.setBarStyle('light-content')
      }

    render() {
        console.disableYellowBox = true;

        return (
            <Provider store= {store}>
        <Router>
          <Scene key="root">
            <Scene 
              key = {'CharactersList'}
              component= { CharactersList }
              hideNavBar
            />

            {/* <Scene 
              key = {'CharactersList'}
              component = { CharactersList }
              navigationBarStyle= { styles.navBar }
              navBarButtonColor= { 'white' }            
            /> */}
          </Scene>
        </Router>
      </Provider>
        );
    }
}

const styles = StyleSheet.create({
    navBar: {
      backgroundColor: Colors.navBar
    }
  });
