const urlParams = new URLSearchParams(window.location.search);
const movieId = parseInt(urlParams.get('id'));

const movie = mockMovies.find(m => m.id === movieId);

// Gestion de l'affichage des détails du film
const moviePoster = document.getElementById('moviePoster');
const movieTitle = document.getElementById('movieTitle');
const movieDescription = document.getElementById('movieDescription');
const ratingStars = document.getElementById('ratingStars');
const ratingCount = document.getElementById('ratingCount');
const addToListBtn = document.getElementById('addToListBtn');
const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

moviePoster.src = movie.poster;
movieTitle.textContent = movie.title;
movieDescription.textContent = movie.description;
ratingCount.textContent = `(${movie.rating.toFixed(1)})`;

// Affichage des étoiles de notation
ratingStars.innerHTML = generateRatingStars(movie.rating);

// Gestion de l'ajout à la liste
const savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
const isSaved = savedMovies.some(m => m.id === movie.id);
addToListBtn.textContent = isSaved ? 'Retirer de ma liste' : 'Ajouter à ma liste';
addToListBtn.addEventListener('click', () => toggleSavedMovie(movie));

// Gestion du "j'aime"
likeCount.textContent = movie.likes.toLocaleString();
likeBtn.addEventListener('click', () => {
    movie.likes++;
    likeCount.textContent = movie.likes.toLocaleString();
    likeBtn.classList.add('like-animation');
    setTimeout(() => likeBtn.classList.remove('like-animation'), 300);
});

// Gestion des commentaires
const commentForm = document.getElementById('commentForm');
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');

let comments = JSON.parse(localStorage.getItem(`comments-${movieId}`) || '[]');
renderComments(comments);

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = commentInput.value.trim();
    if (comment) {
        const newComment = {
            text: comment,
            date: new Date().toISOString()
        };
        comments.push(newComment);
        localStorage.setItem(`comments-${movieId}`, JSON.stringify(comments));
        renderComments(comments);
        commentInput.value = '';
    }
});

function renderComments(comments) {
    commentsList.innerHTML = '';
    comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.className = 'comment bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4';
        commentEl.innerHTML = `
            <p class="text-gray-900 dark:text-white">${comment.text}</p>
            <div class="comment-date mt-2">${new Date(comment.date).toLocaleString()}</div>
        `;
        commentsList.appendChild(commentEl);
    });
}

function toggleSavedMovie(movie) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    const index = savedMovies.findIndex(m => m.id === movie.id);
    if (index === -1) {
        savedMovies.push(movie);
        alert(`${movie.title} a été ajouté à votre liste`);
    } else {
        savedMovies.splice(index, 1);
        alert(`${movie.title} a été retiré de votre liste`);
    }
    localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
    updateAddToListButton(movie);
}

function updateAddToListButton(movie) {
    const isSaved = savedMovies.some(m => m.id === movie.id);
    addToListBtn.textContent = isSaved ? 'Retirer de ma liste' : 'Ajouter à ma liste';
}

// function generateRatingStars(rating) {

// }