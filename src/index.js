import debounce from '../node_modules/lodash.debounce';
import fetchCountries from './fetchCountries';

const inputRef = document.querySelector('.form_input');

inputRef.addEventListener('input', debounce(fetchCountries, 500));
