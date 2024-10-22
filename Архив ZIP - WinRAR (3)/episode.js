document.addEventListener('DOMContentLoaded', async (event) => {
    const characterCards = document.getElementById('characterCards');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageNumbers = document.getElementById('pageNumbers');
    const searchName = document.getElementById('searchName');
    const searchRace = document.getElementById('searchRace');
    const searchStatus = document.getElementById('searchStatus');
    const searchBtn = document.getElementById('searchBtn');
    let currentPage = 1;
    const charactersPerPage = 10;
    let totalPages;
    // Function to add character to favorites
    function addToFavorites(character) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(character);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${character.name} добавлен в избранное`);
    }

    // Load characters from the Rick and Morty API
    async function loadCharacters() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const data = await response.json();
            characterCards.innerHTML = ''; // Clear previous characters
            data.results.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');
                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h4>${character.name}</h4>
                    <p>${character.species}</p>
                    <button class="favorite-btn">Добавить в избранное</button>
                `;
                characterCard.querySelector('.favorite-btn').addEventListener('click', () => addToFavorites(character));
                characterCards.appendChild(characterCard);
            });
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
        updatePagination();
    }

    loadCharacters();
    function updatePagination() {
        pageNumbers.innerHTML = `${currentPage} / ${totalPages}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayCharacters(currentPage, searchName.value, searchRace.value, searchStatus.value);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayCharacters(currentPage, searchName.value, searchRace.value, searchStatus.value);
        }
    });

    searchBtn.addEventListener('click', () => {
        currentPage = 1;
        displayCharacters(currentPage, searchName.value, searchRace.value, searchStatus.value);
    });

    // Display characters on initial load
    displayCharacters(currentPage);
});
