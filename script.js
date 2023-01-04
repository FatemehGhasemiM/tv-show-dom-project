const container = document.querySelector(".container");
const header = document.querySelector("header");
const search = document.getElementById("search");
const btn = document.querySelector("button");
const subject = [];

// create card
const createElement = (el) => {
  const section = document.createElement("section");
  const img = document.createElement("img");
  let title = document.createElement("h2");
  let summary = document.createElement("section");

  section.setAttribute("id", el.id);
  img.setAttribute("src", el.image.medium);
  summary.innerHTML = el.summary;

  // episode and season
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

// display every card
const showTv = (data) => {
  data.forEach((el) => {
    createElement(el);
  });
};

let data = [];
async function getData(url) {
  const response = await fetch(url);
  data = await response.json();
  console.log(data);
  showTv(data);
  selectCharacters(data);

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
    if (!search.value) showTv(data);
    console.log(e.target.value.toUpperCase());
  });
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
});

btn.addEventListener("click", () => {
  search.value = "";
  container.innerHTML = "";
  showTv(data);
});
getData("https://api.tvmaze.com/shows/22036/episodes");
