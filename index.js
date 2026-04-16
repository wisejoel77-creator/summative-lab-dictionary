const dictionaryAPI = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
const buttton = document.getElementById("look-for-word-in-dictionary")
const userInput = document.getElementById("input-word")

function fetchWordData (word){
    fetch(dictionaryAPI)
    .then(response =>response.json())
    .then(data ()=>{

    })
    .catch(error =>{
        console.log("Error: Cannot find the word you were looking for. Try searching for your word on google")
    })
}

buttton.addEventListener("click" ,() =>{
    fetchWordData(word)
})