let nextPageURL = null;
// Pedimos los datos de la API de Rick & Morty de los personajes
async function fetchCharacters(name = '', status = '') {
    //Añadimos los parametros de busqueda y filtro
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    const URL = `https://rickandmortyapi.com/api/character?${params.toString()}`
    try {
        const response = await fetch(URL);
        if (!response.ok) return {characters: [], nextPage: null}; ; // Si la respuesta no es correcta, devolvemos un array vacío Evitamos pantallas negras
        const data = await response.json();
        return {
            characters: data.results,
            nextPage: data.info.next
        }; // Devolvemos el array de personajes y la info de la siguiente pagina para la paginacion
    } catch (error) {
        console.error('Error al obtener los personajes:', error);
        if (!response.ok) return {characters: [], nextPage: null}; // En caso de error, devolvemos un objeto con un array vacío y null para la siguiente página
    }
}
//Renderizamos los personajes en el contenedor
function renderCharacters(characters) {
    const traduccionesEstado = { //Traducir los estados al español
            Alive: 'Vivo',
            Dead: 'Muerto',
            unknown: 'Desconocido'
        }
        const traduccionesEspecie = { // traducir las especies al español
            Human: 'Humano',
            Alien: 'Alienígena',
            Humanoid: 'Humanoide',
            'Mythological Creature': 'Criatura Mitológica',
            Animal: 'Animal',
            Robot: 'Robot',
            Cronenberg: 'Cronenberg',
            unknown: 'Desconocida',
            Disease: 'Enfermedad',
        }
        const traduccionesGenero = { // traducir los géneros al español
            Male: 'Masculino',
            Female: 'Femenino',
            Genderless: 'Sin género',
            unknown: 'Desconocido'
        } 
        const traduccionesOrigen = { // traducir los origenes al español
            'Earth (C-137)': 'Tierra (C-137)',
            'Abadango': 'Abadango',
            'Citadel of Ricks': 'Ciudadela de Ricks',
            'Worldender\'s lair': 'Guarida del Destructor de Mundos',
            'Anatomy Park': 'Parque de Anatomía',
            'Interdimensional Cable': 'Cable Interdimensional', 
            'Immortality Field Resort': 'Resort del Campo de Inmortalidad',
            'Post-Apocalyptic Earth': 'Tierra Post-Apocalíptica',
            'Purge Planet': 'Planeta Purga',
            'Venzenulon 7': 'Venzenulon 7',
            'Bepis 9': 'Bepis 9',
            'Cronenberg Earth': 'Tierra Cronenberg',
            'Nuptia 4': 'Nuptia 4', 
            'Gromflom Prime': 'Gromflom Prime',
            'Earth (Replacement Dimension)': 'Tierra (Dimensión de Reemplazo)',
            'Earth (5-126)': 'Tierra (5-126)',
            'Earth (C-500A)': 'Tierra (C-500A)',
            'Earth (C-172)': 'Tierra (C-172)',
            'Earth (C-319)': 'Tierra (C-319)', 
            'Earth (C-136)': 'Tierra (C-136)',
            'Earth (C-123)': 'Tierra (C-123)',
            'Earth (C-594)': 'Tierra (C-594)',
            unknown: 'Desconocido'
        }
        const traduccionesUbicacion = {
            'Earth (C-137)': 'Tierra (C-137)',
            'Abadango': 'Abadango',
            'Citadel of Ricks': 'Ciudadela de Ricks',
            'Worldender\'s lair': 'Guarida del Destructor de Mundos',
            'Anatomy Park': 'Parque de Anatomía',
            'Interdimensional Cable': 'Cable Interdimensional', 
            'Immortality Field Resort': 'Resort del Campo de Inmortalidad',
            'Post-Apocalyptic Earth': 'Tierra Post-Apocalíptica',
            'Purge Planet': 'Planeta Purga',
            'Venzenulon 7': 'Venzenulon 7',
            'Bepis 9': 'Bepis 9',
            'Cronenberg Earth': 'Tierra Cronenberg',
            'Nuptia 4': 'Nuptia 4', 
            'Gromflom Prime': 'Gromflom Prime',
            'Earth (Replacement Dimension)': 'Tierra (Dimensión de Reemplazo)',
            'Earth (5-126)': 'Tierra (5-126)',
            'Earth (C-500A)': 'Tierra (C-500A)',
            'Earth (C-172)': 'Tierra (C-172)',
            'Earth (C-319)': 'Tierra (C-319)', 
            'Earth (C-136)': 'Tierra (C-136)',
            'Earth (C-123)': 'Tierra (C-123)',
            'Earth (C-594)': 'Tierra (C-594)',
            unknown: 'Desconocido'
         } // traducir las ubicaciones al español
    const card = document.getElementById('characterContainer');
    characters.forEach(character => {
        const characterElement = document.createElement('div');
        characterElement.classList.add('character-card');
        characterElement.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Estado: ${traduccionesEstado[character.status] || character.status}</p>
            <p>Especie: ${traduccionesEspecie[character.species] || character.species}</p>
        `;
        card.appendChild(characterElement);
        characterElement.addEventListener('click', () => { // Agregamos un evento de clic a cada tarjeta de personaje para mostrar el modal con más detalles
            document.getElementById("modalTitle").textContent = character.name;
            document.getElementById("modalOverlay").classList.remove('hidden'); // Mostramos el modal al hacer clic en la tarjeta del personaje
            document.querySelector('.modal-body').innerHTML = `
                <p>Estado: ${traduccionesEstado[character.status] || character.status}</p>
                <p>Especie: ${traduccionesEspecie[character.species] || character.species}</p>
                <p>Género: ${traduccionesGenero[character.gender] || character.gender}</p>
                <p>Origen: ${traduccionesOrigen[character.origin.name] || character.origin.name}</p>
                <p>Ubicación: ${traduccionesUbicacion[character.location.name] || character.location.name}</p>
            `;
    });
});
}

//creamos una funcion init  para obtener los personajes y renderizarlos. Lo utilicé al principio para ir llamando la funcion
//Actualmente, con la función search, que se llama al inicio y cada vez que se cambia el input o el select, no es necesario llamar a init, 
//pero la dejo comentada por si quiero volver a usarla para mostrar los personajes sin filtros al inicio
/*
    async function init() {
        const {characters, nextPage} = await fetchCharacters(name = "", status = ""); //Obtenemos los personajes sin filtros para mostrar todos al inicio
        renderCharacters(characters);
};
    //llamar a la funcio init para iniciar la aplicacion
    init()
*/

// Agregamos eventos a los inputs de busqueda y filtro
async function search() {
    // 1. Leemos los valores actuales del input y el select
    const name = document.getElementById('searchInput').value;
    const status = document.getElementById('statusFilter').value;
    const card = document.getElementById('characterContainer');

    document.getElementById('spinner').classList.remove('hidden'); // Mostramos el spinner mientras se cargan los personajes
    document.getElementById('error-message').classList.add('hidden'); // Ocultamos el mensaje de error mientras se cargan los personajes        
    // 2. Pedimos los personajes con esos filtros
    const {characters, nextPage} = await fetchCharacters(name, status);
    document.getElementById('spinner').classList.add('hidden'); // Ocultamos el spinner una vez que se han cargado los personajes
    document.getElementById('error-message').classList.toggle('hidden', characters.length > 0); // Mostramos el mensaje de error si no se encontraron personajes con los filtros aplicados
    nextPageURL = nextPage; // Actualizamos la URL de la siguiente página para la paginación
    const btn = document.getElementById('loadMoreBtn');
    btn.disabled = !nextPageURL;// Aplicamos la lógica para habilitar o deshabilitar el botón de cargar más dependiendo de si hay una siguiente página disponible
    
    // 3. Los pintamos en el DOM
    card.innerHTML = ''; // Limpiamos el contenedor antes de renderizar los nuevos personajes
    renderCharacters(characters);
    
}

// Escuchamos los eventos — cada vez que algo cambia, relanzamos la búsqueda
document.getElementById('searchInput').addEventListener('input', search);
document.getElementById('statusFilter').addEventListener('change', search);

// Llamada inicial para cargar los personajes al abrir la página
search();

async function loadMore() {
    if (!nextPageURL) return; // Si no hay una URL para la siguiente página, no hacemos nada
    try {
        const response = await fetch(nextPageURL);
        if (!response.ok) return; // Si la respuesta no es correcta, no hacemos nada
        const data = await response.json();
        renderCharacters(data.results); // Renderizamos los nuevos personajes
        nextPageURL = data.info.next; // Actualizamos la URL de la siguiente página
        const btn = document.getElementById('loadMoreBtn');
        btn.disabled = !nextPageURL;// Aplicamos la lógica para habilitar o deshabilitar el botón de cargar más dependiendo de si hay una siguiente página disponible
    } catch (error) {
        console.error('Error al cargar más personajes:', error);
    }
}
document.getElementById('loadMoreBtn').addEventListener('click', loadMore) //Llamamos al evento click del boton de cargar mas para cargar la siguiente pagina de personajes

document.getElementById("closeModalBtn").addEventListener('click', () => {
        document.getElementById("modalOverlay").classList.add('hidden');
    }); // Agregamos un evento para cerrar el modal al hacer clic en el botón de cerrar.
