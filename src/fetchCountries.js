import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';

const sectionRef = document.querySelector('section');

export default function fetchCountries(searchQuery) {
  searchQuery.preventDefault();
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery.target.value}`)
    .then(response => response.json())
    .then(createItemMarkup);
}

function createItemMarkup(data) {
  if (data.length === 1) {
    const markupLanguage = data[0].languages.map(item => `<li>${item.name}</li>`).join('');
    sectionRef.innerHTML = `
      <div>    
        <h1>${data[0].name}</h1>
        <ul class="countries_info">
            <li>Capital: ${data[0].capital}</li>
            <li>Population: ${data[0].population}</li>
            <li>languages:
                <ul class="language_info">
                    ${markupLanguage}
                </ul>
            </li>
        </ul>
      </div>
        <img src="${data[0].flag}">
        `;
  }

  if (data.length > 1 && data.length <= 10) {
    const markup = data.map(item => `<li>${item.name}</li>`).join('');
    sectionRef.innerHTML = `<ul>${markup}</ul>`;
  }

  if (data.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}
