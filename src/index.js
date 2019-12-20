// API

const url = 'http://localhost:3000/pups'

// Fetch

const getDogs = () => {
    return fetch(url).then(response => response.json())
}

const getDog = (id) => {
    return fetch(`${url}/${id}`).then(response => response.json())
}

const dogName = (dog) => {
    const dogSpanDiv = document.querySelector('#dog-bar')
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpanDiv.append(dogSpan)
    dogSpan.addEventListener('click', ()=> {
        getDog(dog.id).then(createDogDetails)
    })
    return dogSpanDiv
}

const renderDogNames = (dogs) => {
    dogs.forEach(dogName)
}

const createDogDetails = (dog) => {
    const infoDiv = document.querySelector('#dog-info')
    const dogHtml = `
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button>${ dog.isGoodDog ? "Good Dog!" : "Bad Gog!"}</button>
    `
    infoDiv.innerHTML = dogHtml
    return infoDiv

}


getDogs().then(renderDogNames)