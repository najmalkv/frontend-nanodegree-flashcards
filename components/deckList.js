import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View , TouchableOpacity,ScrollView} from 'react-native';
import DeckItem from './deckItem';
import {getDecks} from '../utils/api';
import {receiveDecks} from '../actions';

class DeckList extends Component {

 componentDidMount() {

 	const {dispatch} = this.props

  // get decks from async storage
 	getDecks().
 	then((decks) => dispatch(receiveDecks(JSON.parse(decks))))

 }

  render() {
  	const {decks} = this.props
  	const { navigate } = this.props.navigation;


    return (

      <ScrollView style={styles.deck}>

	      {	decks.decks &&  Object.keys(decks.decks).length? Object.keys(decks.decks).map((title,index) => (
	      	<TouchableOpacity key={index} onPress={() => navigate('DeckDetails', {
	      		deckTitle: title
	      	})}>
				        <DeckItem  title={title} decks={decks.decks}/>
			    </TouchableOpacity>
			)) :
        <View style={[styles.container, styles.deck]}>
          <Text>No Decks! Please add a deck.</Text>
        </View>
	      }

      </ScrollView>

    );
  }
}

function mapStateToProps (decks) {

	return {
		decks
	}

}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deck: {
   	padding: 10
  },
});
