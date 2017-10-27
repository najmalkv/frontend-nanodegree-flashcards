import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DeckItem (deck) {

    return (

      <View style={styles.container}>
        <Text  style={styles.heading}>{deck.title}!</Text>
        <Text  style={styles.description}>{ deck.decks[deck.title].questions.length} Cards!</Text>
      </View>

    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
	borderBottomWidth: 1,
	borderBottomColor: '#ccc'
  },
  heading: {
  	fontWeight: 'bold',
  	fontSize: 18
  },
  description: {
  	fontSize: 14,
  	color: '#ccc'
  }
});
