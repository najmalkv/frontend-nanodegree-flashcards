import React from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button,ToastAndroid, Platform } from 'react-native';
import {saveDeckTitle, getDecks} from '../utils/api'
import {receiveDecks} from '../actions'


 class NewDeck extends React.Component {

  constructor() {
    super()

    this.state = {
      title: ''
    }
  }

  // handles adding a new deck
  handleAddDeck(title){
    const {dispatch, navigation} = this.props

    saveDeckTitle(title)
    .then(() => getDecks().then((decks) => dispatch(receiveDecks(JSON.parse(decks)))))
    .then(() => {
      this.setState({title: ''})

    if(Platform.OS !== 'ios' )
      ToastAndroid.show('New deck added!', ToastAndroid.SHORT)})

    navigation.navigate('DeckDetails', {
            deckTitle: title
          })
  }



  render() {
    const {title} = this.state
    return (
      <View style={styles.container}>

        <Text style={styles.question}>What is the title of your new deck?</Text>

        <View>
          <TextInput
            style={{height: 40, width:300}}
            onChangeText={(text) => this.setState({title: text})}
            value={title}
            placeholder="Enter title"
          />
        </View>

        <View  style={{ width: 150, marginTop: 30}}>
          <Button
            onPress={this.handleAddDeck.bind(this,title)}
            title="Create Deck"
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

// export the component
export default connect(mapStateToProps)(NewDeck)

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
