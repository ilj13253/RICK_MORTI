document.addEventListener('DOMContentLoaded', (event) => {
    const favoriteCards = document.getElementById('favoriteCards');

    function loadFavorites() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favoriteCards.innerHTML = '';
        if (favorites.length === 0) {
            favoriteCards.innerHTML = '<p>У вас пока нет избранных персонажей.</p>';
        } else {
            favorites.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');
                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}" class="character-image">
                    <button class="cross-icon">x</button>
                    <h4>${character.name}</h4>
                    <p>Статус: ${character.status}</p>
                    <p>Вид: ${character.species}</p>
                `;
                characterCard.querySelector('.cross-icon').addEventListener('click', () => removeFromFavorites(character.id));
                favoriteCards.appendChild(characterCard);
            });
        }
    }

    function removeFromFavorites(characterId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(character => character.id !== characterId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        loadFavorites();
        alert('Персонаж удален из избранного!');
    }

    // Load favorites on page load
    loadFavorites();
});
