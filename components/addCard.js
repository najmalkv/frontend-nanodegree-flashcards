import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button,ToastAndroid, Platform } from 'react-native';
import {addCardToDeck,getDecks} from '../utils/api'
import {receiveDecks} from '../actions'


 class AddDeck extends React.Component {

  constructor() {
    super()

    this.state = {
      question: '',
      answer: ''
    }
  }

  // handles adding a new card to deck
  handleAddCard(title, question, answer){
    const {dispatch, navigation} = this.props

    this.card = {
      question: question,
      answer: answer
    }

    addCardToDeck(title, this.card)
    .then(() => getDecks().then((decks) => dispatch(receiveDecks(JSON.parse(decks)))))
    .then(() => {
      this.setState({question: '',answer: ''})
      if(Platform.OS !== 'ios' )
      ToastAndroid.show('New Card added!', ToastAndroid.SHORT)
      navigation.navigate('DeckDetails', {
            deckTitle: title
          })
    })
  }



  render() {
    const {question,answer} = this.state
    const { deckTitle } = this.props.navigation.state.params
    return (
      <View style={styles.container}>

          <View style={{marginTop: 100}}>
            <Text>Question</Text>
            <TextInput
              style={{height: 40, width:300}}
              onChangeText={(text) => this.setState({question: text})}
              value={question}
            />
          </View>

          <View>
            <Text>Answer</Text>
            <TextInput
              style={{height: 40, width:300}}
              onChangeText={(text) => this.setState({answer: text})}
              value={answer}
            />
          </View>

          <View  style={{ width: 100, marginTop: 30}}>
            <Button
              onPress={this.handleAddCard.bind(this, deckTitle, question, answer)}
              title="Submit"
              color="#841584"

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

//export component
export default connect(mapStateToProps)(AddDeck)

//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  question: {

    textAlign: 'center',
    fontSize: 22,
    padding: 50
  }

});
