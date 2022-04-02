const btnBuscar 	= 	document.getElementById('search-btn'); 
const nomPoke 		= 	document.getElementById('name-input'); 
const nomPokeError 	= 	document.getElementById('error-name-input'); 
const pokeName 		= 	document.getElementById('pokemon-name'); 
const pokeMoves 	= 	document.getElementById('pokemon-moves');
const pokePhoto 	= 	document.getElementById('main-screen'); 
const aboutScreen 	= 	document.getElementById('about-screen');
const height 		= 	document.getElementById('height'); 
const weight 		= 	document.getElementById('weight');
const type 			= 	document.getElementById('type');
const ps 			= 	document.getElementById('stat_1');
const ataque 		= 	document.getElementById('stat_2');
const defensa 		= 	document.getElementById('stat_3');
const velocidad 	= 	document.getElementById('stat_4');


const notFound = (url) => {
	pokePhoto.style.backgroundImage = 	`url('assets/img/pokeball.png')`;
	pokeName.innerHTML 				= 	'';
	height.innerHTML 				= 	'';
	weight.innerHTML 				= 	'';
	pokeMoves.innerHTML 			= 	'';
	ps.innerHTML 					= 	'';
	ataque.innerHTML 				= 	'';
	defensa.innerHTML 				= 	'';
	velocidad.innerHTML 			= 	'';
	type.innerHTML 					=	'';
	pokeMoves.innerHTML 			= 	"Pokemon no encontrado";
};

const getPokemonData = (pokemon) => {
	if (pokemon === '') {
		pokeMoves.innerHTML = "Ingrese el nombre de un pokemon";
		return;
	}

	pokemon = pokemon.toLowerCase();

	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((res) => {
			if (res.status != '200') {
				notFound();
			} else {
				return res.json();
			}
		})
		.then((data) => {
			if (data) {
				let id 		= ('00' + data.id).slice(-3);
				let altura 	= data.height / 10;
				let peso 	= data.weight / 10;

				pokePhoto.style.backgroundImage = `url('https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png')`;
				pokeName.innerHTML 				= `#${id}-${data.name}`;
				height.innerHTML 				= `ALTURA: ${altura} M`;
				weight.innerHTML 				= `PESO: ${peso} KG`;
				let moves = '';
				for (const move of data.moves) {
					moves += `<br /><li>${move.move.name}</li>`;
				}
				pokeMoves.innerHTML = moves;
				type.innerHTML 		= data.types[0].type.name;
				ps.innerHTML 		= data.stats[0].base_stat;
				ataque.innerHTML 	= data.stats[1].base_stat;
				defensa.innerHTML 	= data.stats[2].base_stat;
				velocidad.innerHTML = data.stats[3].base_stat;

				nomPoke.value = '';
			} else {
				notFound();
			}
		})
		.catch((error) => {
			notFound();
		});
};

nomPoke.addEventListener('keydown', (event) => event.key === 'Enter' && btnBuscar.click());
btnBuscar.addEventListener('click', () => getPokemonData(nomPoke.value));