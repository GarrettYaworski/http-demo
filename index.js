const fetchButton = document.querySelector('.starwars-button');
const searchInput = document.querySelector('input');
const charList = document.querySelector('ul');
let pageUrl = "https://swapi.dev/api/planets/";
let characters = [];

const appendListItem = (itemText) => {
  const listItem = document.createElement('li');
  listItem.innerText = itemText;
  charList.appendChild(listItem)
}
    
fetchButton.addEventListener('click', () => {
  axios.get(pageUrl).then((response) => {
    const { results, next } = response.data;
    characters = [...characters, ...results];
    results.forEach((char) => {
      appendListItem(char.name)
    })
    pageUrl = next;
  }).catch(() => {
      appendListItem('Sorry the force was not with this request')
  })
})

searchInput.addEventListener('keyup', (event) => {
  const nameToFilter = event.target.value; // Grab user input
  const validNames = characters.filter(
    (char) => char.name.includes(nameToFilter)
  ); // Loops through all names and keeps names matching user input
  charList.innerHTML = ''; // Resets character list to be empty
  validNames.forEach((char) => appendListItem(char.name)) // Appends valid characters to list
})