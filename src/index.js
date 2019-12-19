const DOG_URL = "http://localhost:3000/pups";

const dogBar = document.querySelector("#dog-bar");
const dogInfo = document.querySelector("#dog-info");
// const toggle = { 1: 0, 0: 1 };

const init = () => {
  fetchDogs();
};

const fetchDogs = () => {
  return fetch(DOG_URL)
    .then(resp => resp.json())
    .then(renderDogs);
};

const renderDogs = dogArray => {
  for (const dog of dogArray) {
    const span = document.createElement("span");
    span.innerText = dog.name;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      renderDog(dog);
    });
    dogBar.append(span);
  }
};

const renderDog = dog => {
  dogInfo.innerHTML = "";
  const img = document.createElement("img");
  img.src = dog.image;
  const h2 = document.createElement("h2");
  h2.innerText = dog.name;
  const btn = renderBtn(dog);

  dogInfo.append(img, h2, btn);
};

const renderBtn = dog => {
  //   if (document.querySelector(".woofbutton") != null) {
  //     document.querySelector(".woofbutton").remove();
  //   }

  const btn = document.createElement("button");
  btn.className = "woofbutton";

  if (dog.isGoodDog == true) {
    btn.innerText = "Good dog!";
  } else {
    btn.innerText = "Bad dog!";
  }

  btn.addEventListener("click", () => {
    configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !dog.isGoodDog
      })
    };

    fetch(DOG_URL + "/" + dog.id, configObj)
      .then(resp => resp.json())
      .then(data => {
        // debugger;
        renderDog(data);
      });
  });

  return btn;
};

document.addEventListener("DOMContentLoaded", init);
