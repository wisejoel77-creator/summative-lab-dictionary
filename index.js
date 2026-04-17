const button = document.getElementById("look-for-word-in-dictionary")
const userInput = document.getElementById("input-word")
let favourites = []

function fetchWordData (word){
const dictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(dictionaryAPI)
    .then(response =>{
        if (!response.ok){
        throw new Error("Word not found")  
    }     
        return response.json()
    })
    .then(data => {
        document.getElementById("word-meaning").innerHTML = "";
        displayWordData(data)
        console.log("Word found successfully!")
    })
    
    .catch(error =>{
        document.getElementById("word-meaning").innerHTML =
        `<p>Word not found. Try searching on google</p>`
    })
}


function displayWordData (data){
  const wordMeaning = document.getElementById("word-meaning")
  wordMeaning.innerHTML = ""
  
  const entry = data[0]
  const word = entry.word
  const definition = entry.meanings?.[0]?.definitions[0]?.definition ||
  "Definition not found"

  let synonyms = []

  entry.meanings.forEach(meaning => {
    if (meaning.synonyms?.length){
        synonyms.push(...meaning.synonyms)
    }

  meaning.definitions.forEach(definition =>{
    if(definition.synonyms?.length){
        synonyms.push(...definition.synonyms)
    }
});
})  
  
  synonyms = [...new Set(synonyms)]

  const pronunciation =
    entry.phonetic ||
    entry.phonetics?.find(p => p.text)?.text ||
    "Not available"

  const wordTitle = document.createElement("h2")
  const meaning = document.createElement("p")
  const similar = document.createElement("p")
  const sayingWay = document.createElement("p")

  if (synonyms.length > 0){
    similar.textContent = `Synonyms: ${synonyms.join(", ")}`
  } else {
    similar.textContent = "Synonyms: Not available. Search for a synonym on google"
  }
  
  sayingWay.textContent = `Pronunciation: ${pronunciation ||"Not available"}`
  wordTitle.textContent = word
  meaning.textContent = `Definition: ${definition}`

  wordMeaning.append(wordTitle)
  wordMeaning.append(meaning)
  wordMeaning.append(similar)
  wordMeaning.append(sayingWay)

  console.log("Synonyms:", synonyms)
  console.log("Pronunciation:", pronunciation)

  const favouriteWordsButton = document.createElement("button")
  favouriteWordsButton.textContent = "Add to favourite words"
  favouriteWordsButton.id = "favourites"

  favouriteWordsButton.addEventListener("click", ()=> {
    const message = document.getElementById("message")
    
    if(!favourites.includes(word)){
        favourites.push(word)
     displayFavourites()
    
     message.textContent = "Word added to favourite words"
    } else{
        message.textContent = "Word already added to favourites!"
    }
  })
  wordMeaning.append(favouriteWordsButton)
  
}

function displayFavourites(){
    const favouriteWords = document.getElementById("favourite-words")
    favouriteWords.innerHTML = ""

    favourites.forEach(word =>{
      const favouriteSection = document.createElement("p")
      favouriteSection.textContent = word
      favouriteWords.append(favouriteSection)
    })
}

button.addEventListener("click" ,(event) =>{
        event.preventDefault();
    
    const word = userInput.value
    if(!word) return
    fetchWordData(word)
})
