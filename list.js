const savedMoviesContainer = document.getElementById('savedMoviesList');
const savedMovieTemplate = document.getElementById('savedMovieTemplate');
const sortOption = document.getElementById('sortOption');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageNumbersContainer = document.getElementById('pageNumbers');
const emptyMessage = document.getElementById('emptyMessage');

let savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
let currentPage = 1;
const itemsPerPage = 6;

function renderSavedMovies() {
    savedMoviesContainer.innerHTML = '';
    const sortedMovies = sortMovies(savedMovies);
    const paginatedMovies = getPaginatedMovies(sortedMovies, currentPage);

    paginatedMovies.forEach(movie => {
        const movieEl = savedMovieTemplate.content.cloneNode(true);
        movieEl.querySelector('.movie-poster').src = movie.poster;
        movieEl.querySelector('.movie-title').textContent = movie.title;
        movieEl.querySelector('.movie-rating').innerHTML = generateRatingStars(movie.rating);
        movieEl.querySelector('.movie-desc').textContent = movie.description;
        movieEl.querySelector('.added-date').textContent = `Ajouté le ${new Date(movie.dateAdded).toLocaleString()}`;
        movieEl.querySelector('.movie-link').href = `detail.html?id=${movie.id}`;
        movieEl.querySelector('.remove-btn').addEventListener('click', () => removeSavedMovie(movie.id));
        savedMoviesContainer.appendChild(movieEl);
    });

    updatePagination(sortedMovies.length);
    toggleEmptyMessage();
}

function sortMovies(movies) {
    return movies.sort((a, b) => {
        const sortBy = sortOption.value;
        if (sortBy === 'date') return new Date(b.dateAdded) - new Date(a.dateAdded);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'rating') return b.rating - a.rating;
    });
}

function getPaginatedMovies(movies, page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return movies.slice(startIndex, endIndex);
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    pageNumbersContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => goToPage(i));
        pageNumbersContainer.appendChild(pageNumber);
    }

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
    currentPage = page;
    renderSavedMovies();
}

function removeSavedMovie(movieId) {
    savedMovies = savedMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    renderSavedMovies();
}

function toggleEmptyMessage() {
    emptyMessage.classList.toggle('hidden', savedMovies.length > 0);
}

sortOption.addEventListener('change', () => renderSavedMovies());
prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));

renderSavedMovies();