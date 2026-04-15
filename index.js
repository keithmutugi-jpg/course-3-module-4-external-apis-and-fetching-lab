// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById("state-input");
const button = document.getElementById("get-alerts");
const alertsDiv = document.getElementById("alerts");
const errorDiv = document.getElementById("error-message");

if (button) {
  button.addEventListener("click", getAlerts);
}

function getAlerts() {
  const state = input.value.trim().toUpperCase();

  alertsDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.style.display = "none";

  if (!/^[A-Z]{2}$/.test(state)) {
    return displayError("Please enter a valid 2-letter state code.");
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch alerts.");
      return res.json();
    })
    .then(data => {
      errorDiv.textContent = "";
      errorDiv.style.display = "none";

      const summary = document.createElement("h2");
      summary.textContent = `${data.title}: ${data.features.length}`;
      alertsDiv.appendChild(summary);

      data.features.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDiv.appendChild(p);
      });

      input.value = "";
    })
    .catch(err => displayError(err.message));
}

function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = "block";
}

module.exports = { getAlerts };