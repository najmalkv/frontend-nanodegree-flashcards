import { AsyncStorage } from 'react-native'

const FLASHCARDS_STORAGE_KEY = 'FlashCards:decks'

export function getDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => result)
}

export function getDeck (key) {

  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
        const data = JSON.parse(result)
        return data[key]
    })
}

export function saveDeckTitle (title) {

  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: []
    }
  }))

}


export function addCardToDeck (title, card) {

  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((result) => {
        const data = JSON.parse(result)
        data[title].questions.push(card)

        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))

    })

}


// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }