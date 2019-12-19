document.addEventListener('DOMContentLoaded', function (){
    allPups();
});

const BASE_URL = "http://localhost:3000/pups"


function allPups() {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(data => eachPup(data));
};

function eachPup(pup) {
    pup.forEach(puppy => {
        renderSinglePuppy(puppy)
    });
}
// debugger
function renderSinglePuppy(p) {
    const div = document.querySelector("#dog-bar")
    // const span = document.createElement("span")
    const dogBtn = document.createElement("button")
    dogBtn.innerHTML = `<span name='likes'>${p.name}</span>`
    div.append(dogBtn)

    dogBtn.addEventListener("click",() => puppyInfo(p).reset
    )

    return div 
};

function puppyInfo(info) {
    const div = document.querySelector('#dog-info')
    const name = document.createElement("h2")
    name.innerText = info.name
    // const attitude = document.createElement("h3")
    // attitude.innerText = info.isGoodDog
    const image = document.createElement("img")
    image.setAttribute("src", info.image)

    const btn = dogAttitude(info)


    div.append(name, image, btn)
    return div
}

function dogAttitude(dog) {
   const btn = document.createElement("button");
    btn.className = "Woofbutton";
    if (dog.isGoodDog == true) {
        btn.innerText = "Good dog!";
      } else {
        btn.innerText = "Bad dog!";
      }
    
      btn.addEventListener("click", () => {
        configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"},
          body: JSON.stringify({
            isGoodDog: !dog.isGoodDog
        })
    };

    fetch(BASE_URL + "/" + dog.id, configObj)
      .then(resp => resp.json())
      .then(data => {
        renderSinglePuppy(data);
      });
  });

  return btn;
};

// function renderDog() {

// }