const ALL_DOGS_URL = "http://localhost:3000/pups";

const goodDogFilter = document.querySelector("#good-dog-filter");
const dogBar = document.querySelector("#dog-bar");
const summaryContainer = document.querySelector("#dog-summary-container");
const dogInfo = document.querySelector("#dog-info");

goodDogFilter.style.cursor = "pointer";
goodDogFilter.addEventListener("click", () => {
  window.alert("Dog Filter needs to be implemented");
});

const loadDogs = () => {
  fetch(ALL_DOGS_URL)
    .then(res => res.json())
    .then(data => renderDogs(data));
};

const renderDogs = jsonDogs => {
  jsonDogs.forEach(dog => {
    showDogBar(dog);
  });
};

const showDogBar = dog => {
  const dogSpan = document.createElement("span");
  dogSpan.innerText = dog.name;
  dogSpan.style.cursor = "pointer";
  dogBar.append(dogSpan);

  dogSpan.addEventListener("click", () => {
    listDogInfo(dog);
  });
};

const listDogInfo = dog => {
  dogInfo.innerHTML = "";
  const dogName = document.createElement("h3");
  dogName.innerText = dog.name;

  const dogImg = document.createElement("img");
  dogImg.src = dog.image;

  const dogStatus = document.createElement("p");
  dogStatus.style.cursor = "pointer";
  const setDogText = () => {
    if (dog.isGoodDog === true) {
      dogStatus.innerText = "Good Dog";
    } else {
      dogStatus.innerText = "Bad Dog";
    }
  };

  setDogText();

  dogStatus.addEventListener("click", () => {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog
      })
    };
    return fetch(`${ALL_DOGS_URL}/${dog.id}`, configObj)
      .then(res => res.json())
      .then(json => {
        dog.isGoodDog = json.isGoodDog;
        setDogText();
      });
  });

  dogInfo.append(dogName, dogImg, dogStatus);
};

//const changeStatus

document.addEventListener("DOMContentLoaded", () => {
  loadDogs();
});
