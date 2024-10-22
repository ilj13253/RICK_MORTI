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
        if (!favorites.some(fav => fav.id === character.id)) {
            favorites.push(character);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${character.name} добавлен в избранное!`);
        } else {
            alert(`${character.name} уже в избранном!`);
        }
    }

    async function fetchCharacters(page, name = '', race = '', status = '') {
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}&name=${name}&species=${race}&status=${status}`);
            const data = await response.json();
            totalPages = Math.ceil(data.info.count / charactersPerPage);
            return data.results;
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    async function displayCharacters(page, name = '', race = '', status = '') {
        characterCards.innerHTML = '';
        const characters = await fetchCharacters(page, name, race, status);
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h4>${character.name}</h4>
                <p>Статус: ${character.status}</p>
                <p>Вид: ${character.species}</p>
                <button class="favorite-btn">Добавить в избранное</button>
            `;
            characterCard.querySelector('.favorite-btn').addEventListener('click', () => addToFavorites(character));
            characterCards.appendChild(characterCard);
        });
        updatePagination();
    }

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
