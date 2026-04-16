const button = document.getElementById("look-for-word-in-dictionary")
const userInput = document.getElementById("input-word")

function fetchWordData (word){
const dictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(dictionaryAPI)
    .then(response =>{
        if (!response.ok){
            throw new Error("Word not found")
        }
        
        return response.json()
    })
    .then(data =>{
        userInput.value = ""
        displayWordData(data)
    })
    .then( () => {
        console.log("Word found successfully!")
    })
    
    .catch(error =>{
        console.log("Error: Cannot find the word you were looking for. Try searching for your word on google")
    })
}

function displayWordData (data){
  const wordMeaning = document.getElementById("word-meaning")
  wordMeaning.innerHTML = ""
  
  const word = data[0].word
  const definition = data[0].meanings[0].definitions[0].definition
  const synonyms = data[0].meanings[0].synonyms ||[]
  const pronunciation = data[0].phonetic

  const wordTitle = document.createElement("h2")
  const meaning = document.createElement("p")
  const similar = document.createElement("p")
  
  wordTitle.textContent = word
  meaning.textContent = `definition: ${definition}`
  similar.textContent = synonyms

  wordMeaning.append(meaning)
  wordMeaning.append(wordTitle)
  wordMeaning.append(synonyms)
  wordMeaning.append(pronunciation)
}

button.addEventListener("click" ,(event) =>{
        event.preventDefault()
    
    const word = userInput.value
    fetchWordData(word)
})