import React, { Component } from 'react';
import {connect} from 'react-redux';

import { StyleSheet, Text, View, Button, ToastAndroid, Platform} from 'react-native';

import {getDeck} from '../utils/api'


class DeckList extends Component {

	 constructor() {
	 	super()

	 	this.state = {
	 		deck:{}
	 	}

	 }

	 componentDidMount() {
	 	const { deckTitle } = this.props.navigation.state.params

	 	// get deck info from asyncStorage and set state
	 	getDeck(deckTitle)
	 	.then((result) => this.setState({deck: result}))
	 }

 	static navigationOptions = ({navigation}) => {
 		const { deckTitle } = navigation.state.params


 		return {
 			title: deckTitle
 		}
 	}

  render() {

  	const { navigate } = this.props.navigation;

  	const { deck } = this.state

    return (
      <View style={styles.container}>

			<Text style={styles.heading}>{deck.title}</Text>
			<Text style={styles.description}>{deck.questions && deck.questions.length} Cards</Text>

			<View  style={{ width: 100, marginTop: 120}}>
	          <Button
	            onPress={() => navigate('AddCard', { deckTitle: deck.title})}
	            title="Add Card"
	            color="#841533"

	          />
       		 </View>
       		 <View  style={{ width: 100, marginTop: 30}}>
	          <Button
	            onPress={() => deck.questions && deck.questions.length
	            	? navigate('QuizView', { deckTitle: deck.title})
	            	: Platform.OS !== 'ios' && ToastAndroid.show('Please add cards to start quiz!', ToastAndroid.SHORT)}
	            title="Start Quiz"
	            color="#241533"

	          />
       		 </View>

      </View>
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

  heading: {
  	fontWeight: 'bold',
  	fontSize: 32
  },
  description: {
  	fontSize: 16,
  	color: '#ccc'
  }
});
