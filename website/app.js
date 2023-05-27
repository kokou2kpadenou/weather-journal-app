/* Global Variables */
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// Base URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
// Personal API Key for OpenWeatherMap API
const apiKey = "23046d89c34e85c80fe4624c036432de&units=imperial";

// Select DOM elements
const generateButton = document.getElementById("generate");
const zipInput = document.getElementById("zip");
const feelingsInput = document.getElementById("feelings");
const dateDisplay = document.getElementById("date");
const tempDisplay = document.getElementById("temp");
const contentDisplay = document.getElementById("content");

const processing = document.getElementById("processing");
const dlgErr = document.getElementById("dialog-err");
const dlgErrMsg = document.getElementById("dialog-err-msg");

// icons
const iconMessage = `<svg class="icon" viewBox="0 0 24 24" width="24px" height="24px">
<path d="M18 8.016v-2.016h-12v2.016h12zM18 11.016v-2.016h-12v2.016h12zM18 14.016v-2.016h-12v2.016h12zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-14.016l-3.984 3.984v-18q0-0.797 0.586-1.383t1.383-0.586h16.031z"></path>
</svg>`;
const iconDate = `<svg class="icon" viewBox="0 0 32 32" width="32px" height="32px">
<path d="M28 30h-24c-1.104 0-2-0.896-2-2v-21c0-1.104 0.896-2 2-2h2v1c0 1.657 1.343 3 3 3s3-1.343 3-3v-1h8v1c0 1.657 1.344 3 3 3s3-1.343 3-3v-1h2c1.104 0 2 0.896 2 2v21c0 1.104-0.896 2-2 2zM28 12h-24v16h24v-16zM13.069 19.829c0.197-0.314 0.296-0.646 0.296-0.993 0-0.773-0.416-1.16-1.248-1.16-0.723 0-1.414 0.287-2.074 0.861v-1.629c0.73-0.473 1.555-0.709 2.473-0.709 0.859 0 1.53 0.216 2.013 0.647s0.724 1.015 0.724 1.749c0 0.98-0.588 1.994-1.764 3.041l-1.729 1.535v0.035h3.41v1.535h-5.531v-1.441l2.408-2.303c0.484-0.464 0.825-0.853 1.022-1.168zM19.837 23.166c0.264-0.203 0.396-0.486 0.396-0.85 0-0.375-0.163-0.664-0.489-0.867s-0.774-0.305-1.345-0.305h-0.756v-1.418h0.697c1.094 0 1.641-0.363 1.641-1.090 0-0.684-0.42-1.025-1.26-1.025-0.562 0-1.109 0.182-1.641 0.545v-1.512c0.59-0.297 1.277-0.445 2.062-0.445 0.859 0 1.528 0.193 2.007 0.58s0.718 0.889 0.718 1.506c0 1.098-0.557 1.785-1.67 2.062v0.029c0.594 0.074 1.062 0.29 1.406 0.647s0.516 0.796 0.516 1.315c0 0.785-0.287 1.406-0.861 1.863s-1.367 0.686-2.379 0.686c-0.867 0-1.572-0.141-2.115-0.422v-1.611c0.562 0.41 1.219 0.615 1.969 0.615 0.472 0.002 0.84-0.1 1.104-0.303zM22.969 8c-1.088 0-1.969-0.881-1.969-1.969v-2.062c0-1.088 0.881-1.969 1.969-1.969s1.969 0.881 1.969 1.969v2.062c0 1.088-0.881 1.969-1.969 1.969zM8.969 8c-1.088 0-1.969-0.881-1.969-1.969v-2.062c0-1.088 0.881-1.969 1.969-1.969s1.969 0.881 1.969 1.969v2.062c0 1.088-0.882 1.969-1.969 1.969z"></path>
</svg>`;
const iconTemp = `<svg class="icon" viewBox="0 0 32 32" width="32px" height="32px">
<path d="M18.959 17.913v-0.917h3.063v0.917h-3.063zM18.959 14.975h3.063v0.979h-3.063v-0.979zM18.959 13.015h3.063v0.98h-3.063v-0.98zM18.959 10.993h3.063v0.979l-3.063-0.062v-0.917zM18.959 8.909h3.063v1.042h-3.063v-1.042zM18.959 6.95h3.063v0.98h-3.063v-0.98zM20.733 24.153c0 3.246-2.632 5.878-5.878 5.878s-5.878-2.632-5.878-5.878c0-2.226 1.175-4.161 2.999-5.159v-13.087c0-1.623 1.378-2.938 3.001-2.938s2.939 1.315 2.939 2.938v13.235c1.688 1.034 2.817 2.888 2.817 5.011zM16.937 19.735v-13.828c0-1.082-0.877-1.959-1.959-1.959s-1.959 0.877-1.959 1.959v13.711c-1.794 0.728-3.062 2.48-3.062 4.535 0 2.705 2.193 4.898 4.898 4.898s4.897-2.193 4.897-4.898c0.001-1.958-1.155-3.633-2.815-4.418zM14.855 28.072c-2.165 0-3.919-1.755-3.919-3.919 0-1.869 1.311-3.426 3.062-3.818v-9.342h1.96v9.418c1.623 0.479 2.816 1.964 2.816 3.742 0 2.164-1.754 3.919-3.919 3.919z"></path>
</svg>`;

// Error messageg
let errMsg = "";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

// function to make a get request to the OpenWeatherMapAPI
const getData = async (base, zip, key) => {
  const url = `${base}?q=${zip}&appid=${key}`;

  const request = await fetch(url);

  try {
    const data = await request.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// function to make POST request to add the API data
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // TODO: Check if everything is correct here.
  try {
    // const newData = await response.json();
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

// function to make GET request
const retrieveData = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();

    // Write updated data to DOM elements
    tempDisplay.innerHTML = `${iconTemp} ${Math.round(Number(allData.temp))} degrees`;
    contentDisplay.innerHTML = `${iconMessage} ${allData.content}`;
    dateDisplay.innerHTML = `${iconDate} ${allData.date}`;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

// Function to pause the execution of code
const sleep = async (milliseconds) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

// EventListener click for genetate button
generateButton.addEventListener("click", generateOnClickHandler);

// Add input event listeners to the zip and feelings inputs
zipInput.addEventListener("input", activateGenerateButton);
feelingsInput.addEventListener("input", activateGenerateButton);

// Reset errMsg when dlgerr is closed
dlgErr.addEventListener("close", () => {errMsg = ""});

// Prevent processing dialog from closing on keydown Esc
processing.addEventListener('cancel', (event) => {
    event.preventDefault();
});

// Callback function for generate button click event
async function generateOnClickHandler() {
  // Show modal progressing dialog
  processing.showModal();

  // INFO: Delay the execution for processing dialog testing
  await sleep(1000);

  // Chained the api calls
  await getData(baseURL, zipInput.value, apiKey)
    .then(function(data) {
      if (data.cod === 200) {
        const dataToSend = {
          temp: data.main.temp,
          date: newDate,
          content: feelingsInput.value,
        };
        postData("/temperature", dataToSend);
      } else {
        throw new Error(data.message);
      }
    })
    .then(function() {
      retrieveData();
    })
    .catch(function(error) {
      console.log(error.message);
      errMsg = error.message;
    });

  // Clode the modal progressing dialog
  processing.close();

  // If any error dispay it in a dialog
  if (errMsg) {
    dlgErrMsg.textContent = errMsg;
    dlgErr.showModal();
  }
}

// Callback function to activate or deactivate the generate button
function activateGenerateButton() {
  if (zipInput.value.trim() !== "" && feelingsInput.value.trim() !== "") {
    generateButton.disabled = false;
  } else {
    generateButton.disabled = true;
  }
}
