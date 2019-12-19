getPups().then(addPupsToDogBar); // get pups when page loads for first time

const filter = document.querySelector("#good-dog-filter");
filter.addEventListener('click', toggleFilter);

function toggleFilter() {
    const stateCheck = filter.innerText.includes("OFF");
    const states = ["Filter good dogs: ON", "Filter good dogs: OFF"];

    getPups()
        .then(pups => addPupsToDogBar(pups, stateCheck))
        .then(() => {
            filter.innerText = ( stateCheck ? states[0] : states[1]);
        })
        .catch(console.log);
}

function getPups(id = "") {
    return fetch(`http://localhost:3000/pups/${id}`)
        .then(data => data.json())
        .catch(console.log);
}

function addPupsToDogBar(pupsData, filter = false) {
    const dogBar = document.querySelector("#dog-bar");
    dogBar.innerHTML = "";
    if (filter) {
        pupsData = pupsData.filter(p => p.isGoodDog);
    }
    pupsData.forEach(p => addPup.call(dogBar, p));
}

function addPup(pupData) {
    const pup = document.createElement('span');
    pup.innerText = pupData.name;
    
    pup.addEventListener('click', (e) => {
        getPups(pupData.id).then(showPupInfo);
    });

    this.append(pup);
    
}

function showPupInfo(pupData) {

    const info = document.querySelector("#dog-info");
    
    info.innerHTML = `<img src=${pupData.image}> 
                      <h2>${pupData.name}</h2> 
                      <button>${pupData.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`;

    const toggleGoodness = info.querySelector("button");

    toggleGoodness.addEventListener('click', () => {
        patchGoodness(pupData.id, !pupData.isGoodDog);
    });
}


function patchGoodness(id, goodness) {
    configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({isGoodDog: goodness})
    }

    const stateCheck = filter.innerText.includes("OFF");

    fetch(`http://localhost:3000/pups/${id}`, configObj)
        .then(resp => resp.json())
        .then(showPupInfo)
        .then(() => getPups().then(pups => addPupsToDogBar(pups, !stateCheck)))
        .catch(console.log);

}