
// State
let elemek = [
  {
    id: 1,
    imageURL: "./images/accountant.jpeg",
    title: "Accountant",
  },
  {
    id: 2,
    imageURL: "./images/photographer.jpeg",
    title: "Photographer",
  },
  {
    id: 3,
    imageURL: "./images/football.jpeg",
    title: "Football player",
  },
  {
    id: 4,
    imageURL: "./images/delivery.jpeg",
    title: "Delivery Guy",
  },
  {
    id: 5,
    imageURL: "./images/ux.jpeg",
    title: "UX Designer",
  },
  {
    id: 6,
    imageURL: "./images/businessman.jpeg",
    title: "Businessman",
  },
  {
    id: 7,
    imageURL: "./images/boss.jpeg",
    title: "Boss",
  },
];

function arrayRotate(arr, count) {
  const ret = arr.slice();
  count -= ret.length * Math.floor(count / ret.length);
  ret.push.apply(ret, ret.splice(0, count));
  return ret;
}

render();

function render() {

  let elemekHTML = "";

  for(let elem of elemek.slice(0, 3)) {
    elemekHTML += `
            <div class="card px-2 col-sm-6">
              <img src="${elem.imageURL}" class="card-img-top">
              <div class="card-body p-0">
                <h5 class="card-title"><b>#${elem.id}</b></h5>
                <p class="card-text fs-6">${elem.title}</p>
               </div>
              </div>  
    `;
  }
  document.getElementById("gallery-app").innerHTML = `

          <div class="d-flex" style="min-height: 260px">
          <div class="m-auto">
            <button id="prevButton" class="btn btn-primary"><</button>
          </div>

          <div class="w-100 m-auto">      
            <div id="elemek-kontener" class="card-group w-100">
              ${elemekHTML}
            </div>
          </div>

          <div class="m-auto">
            <button id="nextButton" class="btn btn-primary">></button>
          </div>
        </div>
  `;

  //funkcionalitás bekötése, gombnyomás eseményre.
document.getElementById("prevButton").onclick = goToPreviousItems;
document.getElementById("nextButton").onclick = goToNextItems;

}

//Ha végetért egy átmenet, arra úgy tudsz reagálni, hogy az element ontransitionend kulcs alá bekötsz egy függvényt, alább.
function goToPreviousItems() {
  const container = document.getElementById("elemek-kontener");
  // 1. Rakjuk rá a container-re a "to-right" class-t
  container.classList.add("to-right");
  container.ontransitionend = () => {
    // 2. Amikor végetért az átmenet, rotate-eljünk és rendereljünk
    elemek = arrayRotate(elemek, -3); //State változtatás előző 3 képre
    render();//renderelés, megjelenítés
    // 3. Selecteljük ki újra az "elemek-kontener" id-jú elementet
    const container = document.getElementById("elemek-kontener");
    //Itt azért kell újra kiselectelni a konténert, mert a régit elveszítjük a renderelés miatt.
    // 4. Kényszerítsük a böngészőt reflow-ra
    container.offsetHeight;
    //A böngészőt ezen a ponton reflow-ra kell kényszerítenünk, ahhoz hogy a transition effekt rendben végbemehessen.
    
    // 5. Rakjuk rá az "elemek-kontener"-re a "from-left" class-t
    container.classList.add("form-left");
    container.ontransitionend = () => {
      // 6. Amikor végetért az átmenet, távolítsuk el a "from-left" class-t
      container.classList.remove("from-left");
    };
  };
  
}

function goToNextItems() {
  const container = document.getElementById("elemek-kontener");
  container.classList.add("to-left");
  container.onanimationend = () => {
    elemek = arrayRotate(elemek, 3);
    render();
    const container = document.getElementById("elemek-kontener");
    container.offsetHeight;
    container.classList.add("from-right");
    container.onanimationend = () => {
      container.classList.remove("from-right");
    };
  };
  elemek = arrayRotate(elemek, 3); //State változtatás kovetkező 3 képre
  render();//renderelés, megjelenítés
}