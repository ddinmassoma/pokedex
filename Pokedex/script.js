const container = document.getElementById('poke-container')
const searchInput = document.getElementById('search')
const filter = document.getElementById('filter')

const modal = document.getElementById('modal')
const modalBody = document.getElementById('modalBody')
const closeModal = document.getElementById('closeModal')

const pokemonCount = 150
let allPokemon = []

// Fetch rapide
const fetchPokemons = async () => {
  const promises = []

  for (let i = 1; i <= pokemonCount; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()))
  }

  allPokemon = await Promise.all(promises)
  displayPokemons(allPokemon)
}

// Affichage
const displayPokemons = (pokemons) => {
  container.innerHTML = ""

  pokemons.forEach(pokemon => {
    const div = document.createElement('div')
    div.classList.add('pokemon')

    const name = pokemon.name
    const type = pokemon.types[0].type.name

    div.innerHTML = `
      <img src="${pokemon.sprites.front_default}">
      <h3>${name}</h3>
      <p>${type}</p>
    `

    // Click → modal
    div.addEventListener('click', () => {
      modalBody.innerHTML = `
        <h2>${name}</h2>
        <img src="${pokemon.sprites.front_default}">
        <p>HP: ${pokemon.stats[0].base_stat}</p>
        <p>Attaque: ${pokemon.stats[1].base_stat}</p>
        <p>Défense: ${pokemon.stats[2].base_stat}</p>
      `
      modal.classList.remove('hidden')
    })

    container.appendChild(div)
  })
}

// Recherche
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase()

  const filtered = allPokemon.filter(p =>
    p.name.includes(value)
  )

  displayPokemons(filtered)
})

// Filtre
filter.addEventListener('change', () => {
  const value = filter.value

  if (value === 'all') {
    displayPokemons(allPokemon)
    return
  }

  const filtered = allPokemon.filter(p =>
    p.types.some(t => t.type.name === value)
  )

  displayPokemons(filtered)
})

// Dark mode
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark')
})

// Fermer modal
closeModal.addEventListener('click', () => {
  modal.classList.add('hidden')
})

// Lancement
fetchPokemons()