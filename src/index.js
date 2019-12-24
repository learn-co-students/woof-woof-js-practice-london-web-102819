const DOG_URL = "http://localhost:3000/pups";

let allDogArr = [];

document.addEventListener("DOMContentLoaded", () => {
  loadDogData();
});

const loadDogData = () => {
  fetch(DOG_URL)
    .then(res => res.json())
    .then(data => {
      allDogArr = data;
      renderDog(data);
    });
};

const renderDog = dogJson => {
  dogJson.forEach(dog => {
    listingDog(dog);
  });
};

const logDebug = (message, data = {}) => {
  console.log(`${message} ${JSON.stringify(data)}`);
};

const listingDog = dog => {
  const dogBar = document.querySelector("#dog-bar");
  const span = document.createElement("span");
  span.innerText = dog.name;
  dogBar.append(span);

  span.style.cursor = "pointer";
  span.addEventListener("click", () => {
    const dogInfo = document.querySelector("#dog-info");
    dogInfo.innerHTML = "";
    const dogPic = document.createElement("img");
    dogPic.src = dog.image;

    const dogName = document.createElement("h2");
    dogName.innerText = dog.name;

    const dogStatus = document.createElement("p");
    dogStatus.style.cursor = "pointer";

    const setStatus = () => {
      if (dog.isGoodDog === false) {
        dogStatus.innerText = "Bad Dog";
      } else {
        dogStatus.innerText = "Good Dog";
      }
    };

    setStatus();

    dogStatus.addEventListener("click", () => {
      logDebug("clicked dog status");
      dog.isGoodDog = !dog.isGoodDog;
      changeDogStatus(dog.id, dog.isGoodDog).then(data => {
        logDebug("dog status response", { data });
        dog.isGoodDog = data.isGoodDog;
        dogStatus.innerText = dog.isGoodDog ? "Good Dog" : "Bad Dog";
      });
    });
    dogInfo.append(dogPic, dogName, dogStatus);
  });
};

const changeDogStatus = (dogId, newStatus) => {
  logDebug("changeDogStatus", { dogId, newStatus });
  obj = {
    isGoodDog: newStatus
  };
  configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
  };
  logDebug(`PATCH to ${DOG_URL}/${dogId}`, { configObj });
  return fetch(`${DOG_URL}/${dogId}`, configObj)
    .then(res => res.json())
    .catch(err => logDebug(err, { err }));
};

const dogFilter = document.querySelector("#good-dog-filter");
dogFilter.addEventListener("click", () => {
  if (dogFilter.dataFilterIsSwitchedOn) {
    const dogBar = document.querySelector("#dog-bar");
    dogBar.innerHTML = "";
    renderDog(allDogArr);
    dogFilter.dataFilterIsSwitchedOn = false;
    dogFilter.innerText = "Filter good dogs: Off";
  } else {
    const goodDogs = allDogArr.filter(dog => dog.isGoodDog === true);
    const dogBar = document.querySelector("#dog-bar");
    dogBar.innerHTML = "";
    renderDog(goodDogs);
    dogFilter.dataFilterIsSwitchedOn = true;
    dogFilter.innerText = "Filter good dogs: On";
  }
});
