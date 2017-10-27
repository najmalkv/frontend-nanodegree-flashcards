import React, { Component } from 'react';
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Button, Animated, TouchableOpacity } from 'react-native';
import {getDeck} from '../utils/api';
import { clearLocalNotification, setLocalNotification} from '../utils/helpers';

class QuizView extends Component {

 constructor() {
 	super()

 	this.state = {
 		deck:{},
 		value: 0,
 		questionCount: 0,
 		score: 0,
 		showScore: false
 	}

 }

 componentWillMount() {

 	// flipcard animation intialisations
 	this.animatedValue = new Animated.Value(0);

    this.animatedValue.addListener(({ value }) => {
      this.setState({value});
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
    	inputRange: [89, 90],
    	outputRange: [0, 1]
    })
 }



 	componentDidMount() {
	 	const { deckTitle } = this.props.navigation.state.params

	 	//get deck info from asyncStorage
	 	getDeck(deckTitle)
	 	.then((result) => this.setState({deck: result}))
 	}

	static navigationOptions = ({navigation}) => {

		const { deckTitle } = navigation.state.params

		return {
			title: deckTitle
		}

	}

	// handles/triggers flipcard animation

	flipCard() {

	    if (this.state.value >= 90) {
	      Animated.spring(this.animatedValue,{
	        toValue: 0,
	        friction: 5,
	        tension: 5
	      }).start();
	    } else {
	      Animated.spring(this.animatedValue,{
	        toValue: 180,
	        friction: 5,
	        tension: 5
	      }).start();
	    }

	}

  //handles changing the question card
  incrementQuestion(correct) {

		const { questionCount, deck , score} = this.state

		if (this.state.value >= 90) {
			this.flipCard()


		setTimeout(() => {
			if(questionCount < deck.questions.length - 1)
  				this.setState({questionCount: questionCount + 1, score: correct? score + 1: score})
  			else {
  		 		this.setState({showScore: true, score: correct? score + 1: score})
  		 		clearLocalNotification()
  		 		.then(setLocalNotification())
  		 	}

		}, 300)

	}
	else {
		if(questionCount < deck.questions.length - 1)
  				this.setState({questionCount: questionCount + 1, score: correct? score + 1: score})
		else {
	 		this.setState({showScore: true, score: correct? score + 1: score})
 			clearLocalNotification()
		 		.then(setLocalNotification())
	 	}

	}
  }

  // Handles restarting the quiz
  restartQuiz() {
  	this.setState({questionCount: 0, showScore: false, score: 0})
  }

  render() {

  	const { navigate } = this.props.navigation;

  	const { deck, value, questionCount, showScore, score } = this.state


  	//styles for flip animation

  	const frontAnimatedStyle = {
  	  opacity: this.frontOpacity,
      transform: [
        { rotateY: this.frontInterpolate}
      ]
    }

    const backAnimatedStyle = {

      opacity: this.backOpacity,
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.container}>

      	{ !showScore && <View>
      			<Text style={styles.progressText}>{deck.questions && questionCount + 1 + '/' + deck.questions.length}</Text>
      		</View>	}

		 { !showScore ? <View style={{flex: 1}}>

	          <Animated.View style={[styles.flipCard, frontAnimatedStyle]} >
				<Text style={styles.question}>{deck.questions && deck.questions[questionCount].question}</Text>
				<TouchableOpacity onPress={() => this.flipCard()}>
					<Text style={styles.answerBtn}>View Answer</Text>
				</TouchableOpacity>

				<View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={() => this.incrementQuestion(true)}
		            title="Correct"
		            color="#4CAF50"

		          />
	       		 </View>
	       		 <View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={() => this.incrementQuestion(false)}

		            // onPress={this.handleAddDeck.bind(this,title)}
		            title="Incorrect"
		            color="#C62828"

		          />
	       		 </View>
			</Animated.View>

			<Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack,{ zIndex: value >= 90? 1 : -1}]}>
				<Text style={styles.question}>{deck.questions && deck.questions[questionCount].answer}</Text>
				<TouchableOpacity onPress={() => this.flipCard()}>
					<Text style={styles.answerBtn}>View Question</Text>
				</TouchableOpacity>

				<View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={() => this.incrementQuestion(true)}
		            title="Correct"
		            color="#4CAF50"
		          />
	       		 </View>
	       		 <View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={() => this.incrementQuestion(false)}
		            title="Incorrect"
		            color="#C62828"
		          />
	       		 </View>
			</Animated.View>
      	</View>
      : <View style={styles.container}>
	      	<Text style={styles.question}>Your scored {deck.questions && Math.round((score/deck.questions.length) * 100)}% </Text>
	      	<View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={()=> this.restartQuiz()}
		            title="Restart Quiz"
		            color="#42A5F5"
		          />
	       	</View>
	       	<View  style={{ width: 150, marginTop: 30, padding: 10}}>
		          <Button
		            onPress={()=> navigate('DeckDetails', {
		            	deckTitle: deck.title
		            })}
		            title="Back to Deck"
		            color="#C62828"
		          />
	       	</View>
      </View>}
     </View>
    );
  }
}

function mapStateToProps (decks) {

	return {
		decks
	}

}

// export component
export default connect(mapStateToProps)(QuizView)


//styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  question: {
  	fontWeight: 'bold',
  	fontSize: 40,
  	textAlign: 'center',

  },
  answerBtn: {
  	fontSize: 20,
  	color: '#D50000',
  	marginTop: 20,
  },
  progressText: {
	marginTop: 20,
  },
  flipCard: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backfaceVisibility: 'hidden',
	position: "relative",
  },
  flipCardBack: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }


});
