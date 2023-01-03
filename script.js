const container = document.querySelector(".container");
const header = document.querySelector("header");
const search = document.getElementById("search");
const option = document.querySelector("option");
// const html = document.querySelector("html");
const select = document.createElement("select");
const subject = [];
// const idSection = [];

const createElement = (el) => {
  const section = document.createElement("section");
  const img = document.createElement("img");
  let title = document.createElement("h2");
  let summary = document.createElement("section");

  section.setAttribute("id", el.id);
  img.setAttribute("src", el.image.medium);
  summary.innerHTML = el.summary;

  // order episode and season accordingly
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

const showTv = (data) => {
  data.forEach((el) => {
    createElement(el);
  });
};

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

  //   html.addEventListener("click", (e) => {
  //     search.value = "";
  //   });
}

getData("https://api.tvmaze.com/shows/22036/episodes");
