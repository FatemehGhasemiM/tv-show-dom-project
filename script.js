const container = document.querySelector(".container");
const header = document.querySelector("header");
const search = document.getElementById("search");
<<<<<<< HEAD
const btn = document.querySelector("button");
const subject = [];

// create card
=======
const option = document.querySelector("option");
// const html = document.querySelector("html");
const select = document.createElement("select");
const subject = [];
// const idSection = [];

>>>>>>> 1dafe42a74b2e38a194437f51917d696f4e32ec5
const createElement = (el) => {
  const section = document.createElement("section");
  const img = document.createElement("img");
  let title = document.createElement("h2");
  let summary = document.createElement("section");

  section.setAttribute("id", el.id);
  img.setAttribute("src", el.image.medium);
  summary.innerHTML = el.summary;

<<<<<<< HEAD
  // episode and season
=======
  // order episode and season accordingly
>>>>>>> 1dafe42a74b2e38a194437f51917d696f4e32ec5
  el.season > 9 && el.number > 9
    ? (title.textContent = `${el.name} - S${el.season}E${el.number}`)
    : (title.textContent = `${el.name} - S0${el.season}E0${el.number}`);
  el.season > 9 && el.number < 10
    ? (title.textContent = `${el.name} - S${el.season}E0${el.number}`)
    : (title.textContent = `${el.name} - S0${el.season}E${el.number}`);

  subject.push(title.textContent);

  // add elements
  container.append(section);
  section.append(img, title, summary);
  title.style.paddingTop = "15px";
  title.style.paddingBottom = "15px";
  section.classList.add("card");
  summary.classList.add("summary");
};

<<<<<<< HEAD
// display every card
=======
>>>>>>> 1dafe42a74b2e38a194437f51917d696f4e32ec5
const showTv = (data) => {
  data.forEach((el) => {
    createElement(el);
  });
};

<<<<<<< HEAD
let data = [];
async function getData(url) {
  const response = await fetch(url);
  data = await response.json();
  showTv(data);
  selectCharacters(data);
=======
select.setAttribute("onchange", "location = this.value;");
subject.unshift("  All episodes");
const selectList = (data) => {
  subject.map((s) => {
    select.innerHTML += `<option class="option">${s}</option>`;
  });
  data.forEach((id, i) => {
    // option.value = id.id;
    select[i + 1].setAttribute("value", id.id);
  });
  select.addEventListener("change", () => {
    const option = document.getElementsByClassName("option");
    const box = document.getElementsByClassName("card");
    let selects1 = select.options[select.selectedIndex].value;
    //console.log(selects1);
    for (let i = 0; i < select.length; i++) {
      if (option[i].value === selects1) {
        box[i].style.display = "block";
      } else {
        box[i].style.display = "none";
      }
    }
  });

  header.append(select);
};

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  showTv(data);
  selectList(data);
>>>>>>> 1dafe42a74b2e38a194437f51917d696f4e32ec5

  // search in cards
  search.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.toUpperCase();
    let dataSearch = [];
    data.map((p) => {
      if (
        p.name.toUpperCase().includes(searchTerm) ||
        p.summary.toUpperCase().includes(searchTerm)
      ) {
        dataSearch.push(p);
      }
      container.innerHTML = "";
      showTv(dataSearch);
    });
<<<<<<< HEAD
    if (!search.value) {
      container.innerHTML = "";
      showTv(data);
    }
    console.log(e.target.value.toUpperCase());
  });
=======
    if (!search.value) showTv(data);
    console.log(e.target.value.toUpperCase());
  });

  //   html.addEventListener("click", (e) => {
  //     search.value = "";
  //   });
>>>>>>> 1dafe42a74b2e38a194437f51917d696f4e32ec5
}

// select option
const select = document.createElement("select");
function selectCharacters() {
  for (webpage of data) {
    select.classList.add("select");
    const option = document.createElement("option");
    option.innerHTML = `S0${webpage.season}E0${webpage.number} - ${webpage.name}`;
    option.classList = "option";
    select.appendChild(option);
  }
}
header.appendChild(select);
select.addEventListener("change", () => {
  search.value = "";
  const option = document.getElementsByClassName("option");
  const box = document.getElementsByClassName("card");
  let selects1 = select.options[select.selectedIndex].value;

  for (let i = 0; i < select.length; i++) {
    if (option[i].value === selects1) {
      box[i].style.display = "block";
    } else {
      box[i].style.display = "none";
    }
  }
  box.style.overflow = "hidden";
});

btn.addEventListener("click", () => {
  search.value = "";
  container.innerHTML = "";
  showTv(data);
});
getData("https://api.tvmaze.com/shows/22036/episodes");
