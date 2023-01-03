const container = document.querySelector(".container");
const search = document.getElementById("search");

const createElement = (data) => {
  data.forEach((el) => {
    const section = document.createElement("section");
    const img = document.createElement("img");
    let title = document.createElement("h2");
    let summary = document.createElement("section");
    img.setAttribute("src", el.image.medium);
    summary.innerHTML = el.summary;

    // order episode and season accordingly
    el.season > 9 && el.number > 9
      ? (title.textContent = `${el.name} - S${el.season}E${el.number}`)
      : (title.textContent = `${el.name} - S0${el.season}E0${el.number}`);
    el.season > 9 && el.number < 10
      ? (title.textContent = `${el.name} - S${el.season}E0${el.number}`)
      : (title.textContent = `${el.name} - S0${el.season}E${el.number}`);

    // add elements
    container.append(section);
    section.append(img, title, summary);
    title.style.paddingTop = "15px";
    title.style.paddingBottom = "15px";
    section.classList.add("card");
    summary.classList.add("summary");
  });
};

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  createElement(data);
}

getData("https://api.tvmaze.com/shows/22036/episodes");
