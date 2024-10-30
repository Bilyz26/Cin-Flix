// script.js

// Données fictives pour les films
const movies = [
    { id: 1, title: "Film 1", description: "Description du film 1", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Film 2", description: "Description du film 2", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Film 3", description: "Description du film 3", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Film 4", description: "Description du film 4", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Film 5", description: "Description du film 5", image: "https://via.placeholder.com/150" }
];

let currentIndex = 0;

// Fonction pour afficher les films dans le carrousel
function displayMovies() {
    const carouselInner = document.getElementById("carousel-inner");
    carouselInner.innerHTML = ""; // Réinitialiser le contenu

    movies.forEach((movie, index) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-32 object-cover rounded-t">
            <h3 class="p-2">${movie.title}</h3>
            <p class="p-2">${movie.description}</p>
            <button onclick="viewDetails(${movie.id})" class="p-2 bg-blue-600 text-white rounded mb-2">Voir Détails</button>
        `;
        carouselInner.appendChild(movieCard);
    });
}

// Fonction pour naviguer dans le carrousel
function navigateCarousel(direction) {
    const carouselInner = document.getElementById("carousel-inner");
    const totalMovies = movies.length;

    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % totalMovies;
    } else {
        currentIndex = (currentIndex - 1 + totalMovies) % totalMovies;
    }

    const offset = -currentIndex * 100; // Ajustez selon la largeur de la carte
    carouselInner.style.transform = `translateX(${offset}%)`;
}

// Fonction pour basculer entre le mode jour/nuit
function toggleMode() {
    const body = document.body;
    body.classList.toggle('night-mode');
    const button = document.getElementById('toggle-mode');
    button.textContent = body.classList.contains('night-mode') ? 'Mode Jour' : 'Mode Nuit';
}

// Fonction pour filtrer les films
function filterMovies() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchInput));
    displayFilteredMovies(filteredMovies);
}

function displayFilteredMovies(filteredMovies) {
    const moviesContainer = document.getElementById("movies");
    moviesContainer.innerHTML = ""; // Réinitialiser le contenu

    filteredMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-32 object-cover rounded-t">
            <h3 class="p-2">${movie.title}</h3>
            <button onclick="viewDetails(${movie.id})" class="p-2 bg-blue-600 text-white rounded mb-2">Voir Détails</button>
        `;
        moviesContainer.appendChild(movieCard);
    });
}

// Fonction pour voir les détails d'un film
function viewDetails(movieId) {
    // Rediriger vers la page de détails du film
    window.location.href = `movie-detail.html?id=${movieId}`;
}

// Événements
document.getElementById("next").addEventListener("click", () => navigateCarousel('next'));
document.getElementById("prev").addEventListener("click", () => navigateCarousel('prev'));
document.getElementById("toggle-mode").addEventListener("click", toggleMode);
document.getElementById("search").addEventListener("input", filterMovies);

// Afficher les films au chargement
displayMovies();