let section = document.querySelector("section");
let create = document.getElementById("create");
let input = document.querySelector("input");
let btn = document.querySelector("button");

let apiKey = "eaa5545307881ec088c9e8f0a377b6f5";

const now = new Date();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const month = monthNames[now.getMonth()];

btn.addEventListener("click", () => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        create.innerHTML = "";

        let info = document.createElement("div");
        info.classList.add("info");
        create.appendChild(info);

        let img = document.createElement("img");
        img.src = `http://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`;
        info.appendChild(img);

        let temp = document.createElement("h1");
        temp.innerHTML = `${Math.round(data?.main?.temp)}°C`;
        info.appendChild(temp);

        let city = document.createElement("b");
        city.innerHTML = data?.name;
        info.appendChild(city);

        let ul1 = document.createElement("ul");
        info.appendChild(ul1);

        let max = document.createElement("li");
        max.innerHTML = `Max: ${Math.round(data?.main?.temp_max)}°C`;
        ul1.appendChild(max);

        let min = document.createElement("li");
        min.innerHTML = `Min: ${Math.round(data?.main?.temp_min)}°C`;
        ul1.appendChild(min);

        let date = document.createElement("div");
        date.classList.add("date");
        create.appendChild(date);

        let ul2 = document.createElement("ul");
        date.appendChild(ul2);

        let today = document.createElement("li");
        today.innerHTML = "Today";
        ul2.appendChild(today);

        let day = document.createElement("li");
        day.innerHTML = `${month} ${now.getDate()}`;
        ul2.appendChild(day);

        section.style.gap = 0;
        section.style.justifyContent = "space-between";
        input.value = "";
      } else {
        alert("City not found. Try again!");
      }
    })
    .catch((error) => {
      alert("Error fetching data. Please try again.");
      console.error("Error:", error);
    });
});
