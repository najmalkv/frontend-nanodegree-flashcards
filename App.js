import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { StackNavigator,TabNavigator } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DeckDetails from './containers/deckDetails'
import DeckList from './components/deckList'
import NewDeck from './components/newDeck'
import AddCard from './components/addCard'
import QuizView from './components/quizView'
import { Constants } from 'expo'
import {setLocalNotification} from './utils/helpers'

const Tabs = TabNavigator({
      Decks: {
        screen: DeckList
      },
      ['New Deck']: {
        screen: NewDeck
      },
    });

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions:{
      title: "Home",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#841584'
      }
    }
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions:{
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#841584'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions:{
      title: "Add Card",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#841584'
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions:{
      title: "Quiz",
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#841584'
      }
    }
  }
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (

      <Provider store={createStore(reducer)}>
         <View style={{flex: 1}}>
           <View style={{height: Constants.statusBarHeight}}></View>
            <Stack />
         </View>
      </Provider>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
