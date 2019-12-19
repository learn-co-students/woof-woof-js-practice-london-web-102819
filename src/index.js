PUPS = "http://localhost:3000/pups";

document.addEventListener("DOMContentLoaded", () => {
  fetchingData();
});

function fetchingData() {
  fetch(PUPS)
    .then(resp => resp.json())
    .then(data => loopPups(data));
}

function loopPups(data) {
  data.forEach(element => {
    postPups(element);
  });
}

function postPups(obj) {
  const dogBar = document.querySelector("#dog-bar");
  const span = document.createElement("span");
  span.innerText = obj.name;
  dogBar.append(span);
  span.addEventListener("click", function() {
    showInfo(obj);
  });
}

// Showing info in new div
function showInfo(obj) {
  const dogInfo = document.querySelector("#dog-info");
  dogInfo.innerHTML = " ";
  const img = document.createElement("img");
  img.src = obj.image;
  const h2 = document.createElement("h2");
  h2.innerText = obj.name;
  const button = document.createElement("button");
  if (obj.isGoodDog === true) {
    button.innerText = "Good Dog!";
  } else {
    button.innerText = "Bad Dog!";
  }
  button.addEventListener("click", function() {
    changeStatus(obj, button);
  });

  dogInfo.append(img, h2, button);
}

// PATCH method

function changeStatus(obj, button) {
  const pupObject = {
    isGoodDog: !obj.isGoodDog
  };
  fetch(`http://localhost:3000/pups/${obj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(pupObject)
  })
    .then(resp => resp.json())
    .then(data => {
      showInfo(data);
    });
}
