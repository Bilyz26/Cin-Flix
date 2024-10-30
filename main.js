// Données mockées pour le développement
const mockMovies = [
    {
        id: 1,
        title: "12 Angry Men",
        description: "Un jury délibère sur un cas de meurtre, et les tensions montent.",
        poster: "assets/img/12-angry-men.avif",
        rating: 4.9,
        genre: "Drame",
        year: 1957,
        likes: 2000
    },
    {
        id: 2,
        title: "The Godfather",
        description: "L'histoire d'une famille de mafieux et de leur lutte pour le pouvoir.",
        poster: "assets/img/the-godfather.avif",
        rating: 4.9,
        genre: "Crime/Drame",
        year: 1972,
        likes: 5200
    },
    {
        id: 3,
        title: "Schindler's List",
        description: "L'histoire vraie d'Oskar Schindler, qui a sauvé des Juifs pendant l'Holocauste.",
        poster: "assets/img/schindlers-list.avif",
        rating: 4.8,
        genre: "Historique/Drame",
        year: 1993,
        likes: 4100
    },
    {
        id: 4,
        title: "Pulp Fiction",
        description: "Un récit non linéaire qui suit plusieurs personnages liés au crime à Los Angeles.",
        poster: "assets/img/pulp-fiction.avif",
        rating: 4.8,
        genre: "Crime",
        year: 1994,
        likes: 3550
    },
    {
        id: 5,
        title: "The Dark Knight",
        description: "Batman fait face au Joker, un criminel sadique qui menace Gotham City.",
        poster: "assets/img/the-dark-knight.avif",
        rating: 4.9,
        genre: "Action",
        year: 2008,
        likes: 5500
    },
    {
        id: 6,
        title: "Inception",
        description: "Dom Cobb, un voleur de secrets, entre dans les rêves des gens.",
        poster: "assets/img/inception.avif",
        rating: 4.7,
        genre: "Science-Fiction",
        year: 2010,
        likes: 2341
    },
    {
        id: 7,
        title: "Mad Max: Fury Road",
        description: "Dans un monde post-apocalyptique, un groupe de survivants lutte pour leur liberté.",
        poster: "assets/img/mad-max-fury-road.avif",
        rating: 4.7,
        genre: "Action",
        year: 2015,
        likes: 3000
    },
    {
        id: 8,
        title: "Parasite",
        description: "Une famille pauvre s'infiltre dans la vie d'une riche famille avec des conséquences inattendues.",
        poster: "assets/img/parasite.avif",
        rating: 4.6,
        genre: "Drame/Thriller",
        year: 2019,
        likes: 2800
    },
    {
        id: 9,
        title: "Nomadland",
        description: "Une femme perd tout pendant la Grande Récession et se lance dans une vie de nomade moderne.",
        poster: "assets/img/nomadland.avif",
        rating: 4.5,
        genre: "Drame",
        year: 2020,
        likes: 2200
    },
    {
        id: 10,
        title: "Dune",
        description: "Sur la planète désertique d'Arrakis, un jeune noble doit défendre son héritage.",
        poster: "assets/img/dune.avif",
        rating: 4.6,
        genre: "Science-Fiction",
        year: 2021,
        likes: 2700
    },
    {
        id: 11,
        title: "Everything Everywhere All at Once",
        description: "Une femme se retrouve impliquée dans un multivers de possibilités infinies.",
        poster: "assets/img/everything-everywhere-all-at-once.avif",
        rating: 4.8,
        genre: "Science-Fiction/Comédie",
        year: 2022,
        likes: 3500
    },
    {
        id: 12,
        title: "Oppenheimer",
        description: "L'histoire de J. Robert Oppenheimer et le développement de la première bombe atomique.",
        poster: "assets/img/oppenheimer.avif",
        rating: 4.9,
        genre: "Biographie/Drame",
        year: 2023,
        likes: 1500
    }
];


// Gestion du mode sombre
class DarkModeManager {
    constructor() {
        this.darkModeToggle = document.getElementById('darkModeToggle');
        this.init();
    }

    init() {
        // Vérifie les préférences sauvegardées
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }

        // Ajoute l'écouteur d'événement
        this.darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
    }

    toggleDarkMode() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    }
}

// Gestion du carrousel
class Carousel {
    constructor() {
        this.carousel = document.getElementById('carousel');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.slides = mockMovies.slice(0, 5); // Utilise les 5 premiers films
        this.init();
    }

    init() {
        // Crée les slides
        this.slides.forEach((movie, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="carousel-caption">
                    <h2 class="text-xl font-bold">${movie.title}</h2>
                    <p class="mt-2">${movie.description}</p>
                </div>
            `;
            this.carousel.appendChild(slide);
        });

        // Configure les boutons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Démarre le défilement automatique
        this.startAutoSlide();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentSlide);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(this.currentSlide);
    }

    startAutoSlide() {
        setInterval(() => this.nextSlide(), 5000);
    }
}

// Gestion de la recherche et des filtres
class SearchAndFilter {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.genreFilter = document.getElementById('genreFilter');
        this.yearFilter = document.getElementById('yearFilter');
        this.ratingFilter = document.getElementById('ratingFilter');
        this.moviesList = document.getElementById('moviesList');
        this.init();
    }

    init() {
        // Initialise les filtres
        this.populateFilters();
        
        // Configure les écouteurs d'événements
        this.searchInput.addEventListener('input', () => this.filterMovies());
        this.genreFilter.addEventListener('change', () => this.filterMovies());
        this.yearFilter.addEventListener('change', () => this.filterMovies());
        this.ratingFilter.addEventListener('change', () => this.filterMovies());

        // Affiche tous les films initialement
        this.displayMovies(mockMovies);
    }

    populateFilters() {
        // Récupère les genres uniques
        const genres = [...new Set(mockMovies.map(movie => movie.genre))];
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            this.genreFilter.appendChild(option);
        });

        // Récupère les années uniques
        const years = [...new Set(mockMovies.map(movie => movie.year))].sort().reverse();
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            this.yearFilter.appendChild(option);
        });
    }

    filterMovies() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedGenre = this.genreFilter.value;
        const selectedYear = this.yearFilter.value;
        const minRating = parseFloat(this.ratingFilter.value) || 0;

        const filteredMovies = mockMovies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
            const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
            const matchesYear = !selectedYear || movie.year === parseInt(selectedYear);
            const matchesRating = movie.rating >= minRating;

            return matchesSearch && matchesGenre && matchesYear && matchesRating;
        });

        this.displayMovies(filteredMovies);
    }

    displayMovies(movies) {
        this.moviesList.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="w-full">
                <div class="p-4">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">${movie.title}</h3>
                    <div class="flex items-center mt-2">
                        ${this.generateRatingStars(movie.rating)}
                        <span class="ml-2 text-gray-600 dark:text-gray-400">${movie.rating}/5</span>
                    </div>
                    <p class="mt-2 text-gray-600 dark:text-gray-400">${movie.description}</p>
                    <div class="mt-4 flex justify-between items-center">
                        <span class="text-sm text-gray-500 dark:text-gray-400">${movie.year}</span>
                        <a href="details.html?id=${movie.id}" 
                           class="text-blue-600 hover:text-blue-700">Voir détails</a>
                    </div>
                </div>
            `;
            this.moviesList.appendChild(movieCard);
        });
    }

    generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars += `<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>`;
            } else if (i === fullStars && hasHalfStar) {
                stars += `<svg class="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stop-color="currentColor"/>
                            <stop offset="50%" stop-color="#D1D5DB"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>`;
            } else {
                stars += `<svg class="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>`;
            }
        }
        return stars;
    }
}

// Gestion de la sauvegarde des configurations
class ConfigManager {
    constructor() {
        this.saveConfigBtn = document.getElementById('saveConfigBtn');
        this.loadConfigBtn = document.getElementById('loadConfigBtn');
        this.init();
    }

    init() {
        this.saveConfigBtn?.addEventListener('click', () => this.saveCurrentConfig());
        this.loadConfigBtn?.addEventListener('click', () => this.loadSavedConfig());
    }

    saveCurrentConfig() {
        const config = {
            genre: document.getElementById('genreFilter').value,
            year: document.getElementById('yearFilter').value,
            rating: document.getElementById('ratingFilter').value,
            timestamp: new Date().toISOString()
        };

        let savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '[]');
        savedConfigs.push(config);
        localStorage.setItem('savedConfigs', JSON.stringify(savedConfigs));

        alert('Configuration sauvegardée !');
    }

    loadSavedConfig() {
        const savedConfigs = JSON.parse(localStorage.getItem('savedConfigs') || '[]');
        if (savedConfigs.length === 0) {
            alert('Aucune configuration sauvegardée');
            return;
        }

        // Prend la configuration la plus récente
        const config = savedConfigs[savedConfigs.length - 1];
        
        document.getElementById('genreFilter').value = config.genre;
        document.getElementById('yearFilter').value = config.year;
        document.getElementById('ratingFilter').value = config.rating;

        // Déclenche la recherche avec les nouveaux filtres
        document.getElementById('genreFilter').dispatchEvent(new Event('change'));
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
    new Carousel();
    new SearchAndFilter();
    new ConfigManager();
});