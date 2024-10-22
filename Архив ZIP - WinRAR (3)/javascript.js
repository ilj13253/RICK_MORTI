/*
document.addEventListener('DOMContentLoaded', (event) => {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeRegister = document.getElementById('closeRegister');
    const closeLogin = document.getElementById('closeLogin');
    registerBtn.onclick = function() {
        registerModal.style.display = "block";
    }

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    closeRegister.onclick = function() {
        registerModal.style.display = "none";
    }

    closeLogin.onclick = function() {
        loginModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    }
});
const aboutLink = document.getElementById('activ');
const mainContent = document.getElementById('mainContent');
const aboutContent = document.getElementById('aboutContent');

aboutLink.addEventListener('click', () => {
  mainContent.classList.add('hidden');
  aboutContent.classList.remove('hidden');
});
function showMainContent() {
    document.getElementById('mainContent').style.display = 'block';
    document.getElementById('aboutContent').style.display = 'none';
  }

  function showAboutContent() {
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('aboutContent').style.display = 'block'
  }
*/
document.addEventListener('DOMContentLoaded', (event) => {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');
    const closeRegister = document.getElementById('closeRegister');
    const closeLogin = document.getElementById('closeLogin');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');

    // Function to update UI based on login status
    function updateUIForLoggedInUser(username) {
        usernameDisplay.textContent = `Вы вошли как ${username}`;
        usernameDisplay.style.display = 'inline';
        registerBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline';
        loginError.style.display = 'none'; 
    }

    // Function to update UI for logged-out state
    function updateUIForLoggedOutUser() {
        usernameDisplay.style.display = 'none';
        registerBtn.style.display = 'inline';
        loginBtn.style.display = 'inline';
        logoutBtn.style.display = 'none';
        loginError.style.display = 'none';
    }

    // Check if user is logged in when the page loads
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        updateUIForLoggedInUser(loggedInUser.username);
    } else {
        updateUIForLoggedOutUser();
    }

    registerBtn.onclick = function() {
        registerModal.style.display = "block";
    }

    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    }

    closeRegister.onclick = function() {
        registerModal.style.display = "none";
    }

    closeLogin.onclick = function() {
        loginModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == registerModal) {
            registerModal.style.display = "none";
        }
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    }

    const registerForm = document.getElementById('registerForm');
    registerForm.onsubmit = function(event) {
        event.preventDefault();
        const email = document.getElementById('regEmail').value;
        const username = document.getElementById('regUsername').value;
        const name = document.getElementById('regName').value;
        const lastName = document.getElementById('regLast').value;
        const password = document.getElementById('regPassword').value;
        const passwordRepeat = document.getElementById('regPasswordRepeat').value;

        if (password !== passwordRepeat) {
            alert('Пароли не совпадают!');
            return;
        }

        const user = {
            email: email,
            username: username,
            name: name,
            lastName: lastName,
            password: password
        };

        localStorage.setItem('user', JSON.stringify(user));
        registerModal.style.display = "none";
        alert('Регистрация успешна! Теперь вы можете войти.');
    };

    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = function(event) {
        event.preventDefault();
        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
            loginModal.style.display = "none";
            localStorage.setItem('loggedInUser', JSON.stringify({ username: storedUser.username }));
            updateUIForLoggedInUser(storedUser.username);
        } else {
            loginError.style.display = 'block'; 
        }
    };

    logoutBtn.onclick = function() {
        localStorage.removeItem('loggedInUser');
        updateUIForLoggedOutUser();
    };

    const aboutLink = document.getElementById('activ');
    const mainContent = document.getElementById('mainContent');
    const aboutContent = document.getElementById('aboutContent');

    aboutLink.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        aboutContent.classList.remove('hidden');
    });

    function showMainContent() {
        document.getElementById('mainContent').style.display = 'block';
        document.getElementById('aboutContent').style.display = 'none';
    }

    function showAboutContent() {
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('aboutContent').style.display = 'block';
    }

    window.showMainContent = showMainContent;
    window.showAboutContent = showAboutContent;

});
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    if (input.type === "password") {
        input.type = "text";
        icon.style.backgroundImage = "url('2.png')"; // change to open eye icon
    } else {
        input.type = "password";
        icon.style.backgroundImage = "url(22.png')"; // change back to closed eye icon
    }
}

document.querySelectorAll('.toggle-password').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const fieldId = this.previousElementSibling.id;
        togglePasswordVisibility(fieldId);
    });
});


/*
$(function() {
    // Listen for the login button click event
    $('#user_submit').click(function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input values
        var username = $('#username').val();
        var password = $('#password').val();

        // Simple validation (In a real scenario, you would send this to the server for validation)
        if (username === "user" && password === "password") {
            // Hide the login modal
            $('.modal').hide();

            // Show the username in the header
            $('#loggedIn').val(username);
            $('#loggedIn').show();
            $('#first').hide();
        } else {
            alert("Invalid login credentials.");
        }
    });

    // Initialize the UI
    $('#loggedIn').hide();
});

        async function loadCharacters() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();
            const characterCards = document.getElementById('characterCards');
            characterCards.innerHTML = ''; // Clear previous characters
            data.results.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');
                characterCard.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h4>${character.name}</h4>
                    <p><strong>Species:</strong> ${character.species}</p>
                    <p><strong>Origin:</strong> ${character.origin.name}</p>
                    <p><strong>Status:</strong> ${character.status}</p>
                `;
                characterCards.appendChild(characterCard);
            });
            charactersList.style.display = 'block';
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('aboutContent').style.display = 'none';
            
            
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
        
    async function loadLocation() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/location');
            const data = await response.json();
            const characterCards = document.getElementById('characterCards');
            characterCards.innerHTML = ''; // Clear previous characters
            data.results.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');
                characterCard.innerHTML = `
                    <h4>${character.name}</h4>
                    <p>${character.species}</p>
                `;
                characterCards.appendChild(characterCard);
            });
            charactersList.style.display = 'block';
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('aboutContent').style.display = 'none';
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
    async function loadEpisode() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const data = await response.json();
            const characterCards = document.getElementById('characterCards');
            characterCards.innerHTML = ''; // Clear previous characters
            data.results.forEach(character => {
                const characterCard = document.createElement('div');
                characterCard.classList.add('character-card');
                characterCard.innerHTML = `
                
                    <h4>${character.name}</h4>
                    <p>${character.species}</p>
                `;
                characterCards.appendChild(characterCard);
            });
            charactersList.style.display = 'block';
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('aboutContent').style.display = 'none';
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }
    window.loadCharacters = loadCharacters;
    window.loadCharacters = loadCharacters;
    window.loadLocation=loadLocation;
    window.loadEpisode=loadEpisode;
*/