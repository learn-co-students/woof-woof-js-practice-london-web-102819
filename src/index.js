const URL = "http://localhost:3000/pups"

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#filter-div').addEventListener('click', changeFilter)
    loadDogs();
})

const loadDogs = () => {
    fetch(URL).then(resp => resp.json()).then(createDogs);
}

const createDogs = dogs => {
    
    console.log(dogs)
    dogs.forEach(function(dog) {
        addToDogBar(dog);
    })
}

const addToDogBar = dog => {
    let field = document.querySelector("#dog-bar");
    const span = document.createElement('span');
        span.innerText = dog.name;
        span.addEventListener('click', showDog);
        span.id = `dog-bar-${dog.id}`
        field.appendChild(span);
}

const showDog = e => {
    let dogId = e.target.id.split("-")[2]
    loadDog(dogId)
}

const loadDog = dogId => {
    fetch(`${URL}/${dogId}`).then(resp => resp.json()).then(renderDog);
}

const renderDog = dog => {

    let field = document.querySelector("#dog-info");
    while (field.firstChild) {field.removeChild(field.firstChild)}

    const div = document.createElement('div');
        div.id = "d" + dog.id;

        let img = document.createElement('img'); 
        img.src = dog.image; img.id = "i" + dog.id;
        div.appendChild(img);

        let name = document.createElement('h2'); 
        name.innerText = dog.name; name.id = "n" + dog.id;
        div.appendChild(name);

        let isGoodDog = document.createElement('h3'); 
        isGoodDog.innerText = dog.isGoodDog; isGoodDog.id = "g" + dog.id;
        isGoodDog.style.display = "none";
        div.appendChild(isGoodDog);

        let button = document.createElement('button'); 
        button.id = "b" + dog.id;
        button.innerText = buttonText(dog)
        button.addEventListener('click', changeDogStatus)
        div.appendChild(button);

        field.appendChild(div)
}

const buttonText = dog => {
    if (dog.isGoodDog === true) {return "Good Dog!"}  
    else {return "Bad Dog"}
}

const changeDogStatus = e => {

    const dogId = parseInt(e.target.parentElement.id.split("d")[1]);
    // debugger
    let isGoodDog = document.querySelector(`#g${dogId}`).innerText

    let newStatus
    if ( isGoodDog ==="true") {newStatus = false}
    else {newStatus = true}

    const editURL = `${URL}/${dogId}`
    const formData = {
        isGoodDog: newStatus
    }

    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify(formData)
    }

    fetch(editURL, configurationObject).then(resp => resp.json())
    .then(setTimeout(function(){
        loadDog(dogId)
    }, 100))
    .then(setTimeout(function(){
        updateFilter()
    }, 100))
}

const changeFilter = () => {
    let field = document.querySelector("#dog-bar");
    while (field.firstChild) {field.removeChild(field.firstChild)}
    let filterStatus = document.querySelector('#filter-div button').innerText.split(" ")[3]

    if (filterStatus==='ON') {loadDogs(); document.querySelector('#filter-div button').innerText = "Filter good dogs: OFF"}
    else {loadGoodDogs(); document.querySelector('#filter-div button').innerText = "Filter good dogs: ON";}
}

const updateFilter = () => {
    let field = document.querySelector("#dog-bar");
    while (field.firstChild) {field.removeChild(field.firstChild)}
    let filterStatus = document.querySelector('#filter-div button').innerText.split(" ")[3]

    if (filterStatus==='ON') {loadGoodDogs()}
    else {loadDogs()}
}

const loadGoodDogs = () => {
    fetch(URL).then(resp => resp.json()).then(createGoodDogs);
}

const createGoodDogs = dogs => {
    
    console.log(dogs)
    dogs.forEach(function(dog) {
        if (dog.isGoodDog === true) { addToDogBar(dog) };
    })
}