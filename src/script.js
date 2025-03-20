function getGreeting() {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12) {
    greeting = "Good Morning! ";
  } else if (hour < 18) {
    greeting = "Good Afternoon!";
  } else {
    greeting = "Good Evening!";
  }

  document.getElementById("greeting").innerText = greeting;
}

document.addEventListener("DOMContentLoaded", function () {
  getGreeting();
});


//console.log(new Date().toLocaleTimeString()); //actualtime
//console.log(new Date().getHours() )// actual hour
function saveName() {
  const name = document.getElementById("userName").value;
  if (name.trim() !== "") {
    localStorage.setItem("username", name); //key,value
    window.location.href = "src/home.html";
  } else {
    alert("Please enter your name!");
  }
}

window.onload = function () {
  const name = localStorage.getItem("username");
  if (name) {
    document.getElementById("welcome").innerText = `Welcome, ${name}`;
  } else {
    window.location.href = "index.html";
  }
};

//quotes
// async function getQuote() {
//   let apiURL = "https://qapi.vercel.app/api/random";

//   try {
//     const response = await fetch(apiURL);
//     const data = await response.json();
//     document.getElementById(
//       "quote"
//     ).innerText = `"${data.quote}"`;
//     document.getElementById("author").innerText = `-"${data.author}"`

//   } catch (error) {
//     console.error("Error getting quote:", error);
//     document.getElementById("quote").innerText = "Failed to load quote";
//   }
// }
async function getQuote() {
  let apiURL = "https://qapi.vercel.app/api/random";

  try {
    console.log("Fetching quote...");
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log("Quote data:", data);

    let quoteElement = document.getElementById("quote");
    let authorElement = document.getElementById("author");

    if (!quoteElement || !authorElement) {
      console.error("Error: Elements not found in DOM");
      return;
    }

    quoteElement.innerText = `"${data.quote}"`;
    authorElement.innerText = `-"${data.author}"`;
  } catch (error) {
    console.error("Error getting quote:", error);
    document.getElementById("quote").innerText = "Failed to load quote";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getQuote(); // Fetch quote when page loads
  document.getElementById("moreInspo").addEventListener("click", getQuote);
});
//weather
function handleKeyPress(event) {
  if (event.key === "Enter") {
    getWeather(); // Runs when Enter is pressed
  }
}
async function getWeather() {
  let city = document.getElementById("cityName").value;
  let apiKey = "bbc6771c6e16bc5f077f19f05f2704cc";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log("Full API Response:", data);

    if (data.cod === 200) {
      let timeZone = data.timezone;
      let localTime = new Date(Date.now() + timeZone * 1000);
      let format = { weekday: "long", day: "numeric", month: "long" };
      let localDate = localTime.toLocaleDateString("en-GB", format);
      let properDate = localDate.replace(/(\w+) (\d+)/, "$1, $2"); //regex

      let weatherTemp = data.main.temp;
      let weatherCondition = data.weather[0].main;
      let weatherDescription = data.weather[0].description;
      let humidity = data.main.humidity;
      let emoji = "";
      if (weatherCondition === "Clear") emoji = "☀️";
      else if (weatherCondition === "Clouds") emoji = "☁️";
      else if (weatherCondition === "Rain") emoji = "🌧️";
      else if (weatherCondition === "Drizzle") emoji = "🌦️";
      else if (weatherCondition === "Thunderstorm") emoji = "⛈️";
      else if (weatherCondition === "Snow") emoji = "❄️";
      else if (weatherCondition === "Mist" || weatherCondition === "Fog")
        emoji = "🌫️";
      else if (weatherCondition === "Haze") emoji = "🌁";

      document.getElementById("date").textContent = properDate;
      document.getElementById(
        "weatherTemp"
      ).textContent = `  ${weatherTemp}°C ${emoji}`;
      document.getElementById("weatherDescription").textContent =
        weatherDescription;
      document.getElementById(
        "humidity"
      ).textContent = `Humidity: ${humidity}%`;
    } else {
      document.getElementById("weatherResult").textContent = "City not found!";
    }
  } catch (error) {
    document.getElementById("weatherResult").textContent =
      "Error fetching weather";
  }
}

// Images

const apiKey = "HLSXb9O7e7jltzVShWBdHARXO9kMhrflhpUH5XQ3XkJKYntFQqRmD92D";
const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

async function getImages() {
  const query = searchInput.value.trim() || "random"; // Get user input or use "random"
  const apiUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=10`; // Fetch 9 images

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();
    resultsContainer.innerHTML = ""; // this will clear previous results

    if (!data.photos.length) {
      resultsContainer.innerHTML =
        "<p class='text-center text-red-500'>No images found</p>";
      return;
    } // if no imgs r found, return stopps the function

    data.photos.forEach((photo) => {
      const imageElement = `
                <div class="relative">
                    <a href="${photo.src.original}" target="_blank">
                        <img src="${photo.src.large}" alt="${photo.photographer}" class="w-full h-64 object-cover rounded-lg shadow-lg">
                        <div class="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded flex items-center space-x-2">
                            <i class="fa-solid fa-camera-retro text-sm"></i>
                            <h3 class="text-sm font-medium">${photo.photographer}</h3>
                        </div>
                    </a>
                </div>
            `;
      resultsContainer.innerHTML += imageElement;
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    resultsContainer.innerHTML =
      "<p class='text-center text-red-500'>Failed to load images</p>";
  }
}
//goals
function saveGoal() {
  let textArea = document.getElementById("goalText");
  let goal = textArea.value.trim();
  if (goal === "") {
    alert("please set a goal");
    return;
  }
  let goalS = JSON.parse(localStorage.getItem("goalS")) || [];
  goalS.push(goal);
  localStorage.setItem("goalS", JSON.stringify(goalS));
  textArea.value = "";
}
function viewGoal() {
  let goalList = document.getElementById("goalList");
  goalList.innerHTML = ""; // Clear previous content

  let goalS = JSON.parse(localStorage.getItem("goalS")) || []; // Always an array

  if (goalS.length === 0) {
    goalList.innerHTML = "<p>You do not have any saved goals</p>"; // Show only if empty
    return;
  }

  // show each goal with a delete button
  goalS.forEach((goal, index) => {
    goalList.innerHTML += `
      <div class="goal-item">
        ${index + 1}. ${goal} 
        <button onclick="deleteGoal(${index})" class="delete-btn button">delete</button>
      </div>
    `;
  });
}

//  delete a goal
function deleteGoal(index) {
  let goalS = JSON.parse(localStorage.getItem("goalS")) || [];

  goalS.splice(index, 1); //  to remove the goal 
  localStorage.setItem("goalS", JSON.stringify(goalS)); //  Update local storage

  viewGoal(); // Refresh the list after deletion
}
//footer
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("year").textContent = new Date().getFullYear();
});
