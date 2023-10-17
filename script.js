document.getElementById("search-button").addEventListener("click", async () => {
  const countryName = document.getElementById("country-name").value;

  if (countryName) {
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.length > 0) {
        const country = data[0];
        console.log(country);
        displayCountryInfo(country);
      } else {
        displayErrorMessage("Country not found.");
      }
    } catch (error) {
      displayErrorMessage(`Error: ${error.message}`);
    }
  } else {
    displayErrorMessage("Please enter a country name.");
  }
});

function displayCountryInfo(country) {
  const countryInfo = document.getElementById("country-info");
  countryInfo.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Subregion: ${country.subregion}</p>
        <p><img src =${country.flags.png}></p>
        
    `;
  countryInfo.style.display = "block";
}

function displayErrorMessage(message) {
  const countryInfo = document.getElementById("country-info");
  countryInfo.innerHTML = `<p class="error-message">${message}</p>`;
  countryInfo.style.display = "block";
}
