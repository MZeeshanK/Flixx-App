const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    total_pages: 1,
    total_results: 0,
  },
  api: {
    apiKey: '622d5ca184728b3313d0906e863bac19',
    apiUrl: 'https://api.themoviedb.org/3',
  },
};

const displayPopularMovies = async () => {
  let results = await fetchAPIData('movie/popular');
  results = await results.results;

  results.forEach((movie) => {
    const div = document.createElement('div');

    div.classList.add('card');

    const { id, title, release_date } = movie;

    div.innerHTML = `
    <a href="movie-details.html?id=${id}">
  

      ${
        movie.poster_path
          ? `
          <img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${title}"
      />
        `
          : `
          <img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${title}"
      />
        `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${release_date}</small>
      </p>
    </div>
    `;

    document.querySelector('#popular-movies').appendChild(div);
  });
};

const displayPopularTv = async () => {
  let results = await fetchAPIData('tv/popular');
  results = await results.results;

  console.log(results);

  results.forEach((show) => {
    const div = document.createElement('div');

    div.classList.add('card');

    const { id, name, first_air_date } = show;

    div.innerHTML = `
    <a href="tv-details.html?id=${id}">
  

      ${
        show.poster_path
          ? `
          <img
        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
        class="card-img-top"
        alt="${name}"
      />
        `
          : `
          <img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${name}"
      />
        `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${first_air_date}</small>
      </p>
    </div>
    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
};

const displayMovieDetails = async () => {
  const movieId = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieId}`);

  const {
    title,
    release_date,
    vote_average,
    overview,
    genres,
    production_companies,
    runtime,
    status,
    homepage,
    budget,
    revenue,
    backdrop_path,
  } = movie;

  displayBackgroundImage('movie', backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `
              <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
            }
          </div>
          <div>
            <h2>${title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${release_date}</p>
            <p>
            ${overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${
                genres.length > 0 &&
                genres.map((genre) => `<li>${genre.name}</li>`).join('')
              }
              </ul>
            <a href="${homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${budget.toLocaleString()}</li>
            <li><span class="text-secondary">Revenue:</span> $${revenue.toLocaleString()}</li>
            <li><span class="text-secondary">Runtime:</span> ${runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${
            production_companies.length > 0 &&
            production_companies.map((company) => ` ${company.name}`).join(', ')
          } </div>
        </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
};

const displayShowDetails = async () => {
  const showId = window.location.search.split('=')[1];

  const show = await fetchAPIData(`tv/${showId}`);

  console.log(show);

  const {
    name,
    first_air_date,
    vote_average,
    overview,
    genres,
    production_companies,
    number_of_episodes,
    number_of_seasons,
    status,
    homepage,
    last_episode_to_air,
    backdrop_path,
  } = show;

  displayBackgroundImage('tv', backdrop_path);

  const div = document.createElement('div');

  div.innerHTML = `
  <div class="details-top">
          <div>
          
            ${
              show.poster_path
                ? `
              <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="Show Name"
            />
              `
                : `
              <img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="Show Name"
            />`
            }
          </div>
          <div>
            <h2>${name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${first_air_date}</p>
            <p>
              ${overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${
                genres.length > 0 &&
                genres.map((genre) => `<li>${genre.name}</li>`).join('')
              }
            </ul>
            <a href=${homepage} target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${number_of_episodes}</li>
            <li><span class="text-secondary">Number Of Seasons:</span> ${number_of_seasons}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${production_companies
            .map((company) => company.name)
            .join(', ')}</div>
        </div>
  `;

  document.querySelector('#show-details').appendChild(div);
};

const displayBackgroundImage = (type, backgroundPath) => {
  const overlayDiv = document.createElement('div');

  overlayDiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${backgroundPath}")`;

  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

// display slider movies
const displaySlider = async () => {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');

    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
      movie.title
    }" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
        1
      )} / 10
    </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
};

const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.total_results = total_results;
    global.search.total_pages = total_pages;

    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);

    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
};

const displaySearchResults = (results) => {
  // clear previous results
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');

    div.classList.add('card');

    const { id } = result;

    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${id}">
  

      ${
        result.poster_path
          ? `
          <img
        src="https://image.tmdb.org/t/p/w500${result.poster_path}"
        class="card-img-top"
        alt="${global.search.type === 'movie' ? result.title : result.name}"
      />
        `
          : `
          <img
        src="../images/no-image.jpg"
        class="card-img-top"
        alt="${global.search.type === 'movie' ? result.title : result.name}"
      />
        `
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        global.search.type === 'movie' ? result.title : result.name
      }</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${
          global.search.type === 'movie'
            ? result.release_date
            : result.first_air_date
        }</small>
      </p>
    </div>
    `;

    document.querySelector('#search-results-heading').innerHTML = `
        <h2>${results.length} of ${global.search.total_results} Results for ${global.search.term}</h2>
     `;

    document.querySelector('#search-results').appendChild(div);
  });

  displayPagination();
};

// create and display pagination
const displayPagination = () => {
  const div = document.createElement('div');
  div.classList.add('pagination');

  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.total_pages}</div>
  `;

  document.querySelector('#pagination').appendChild(div);

  const prev = document.querySelector('#prev');
  const next = document.querySelector('#next');

  if (global.search.page === 1) {
    prev.disabled = true;
  }

  if (global.search.page === global.search.total_pages) {
    next.disabled = true;
  }

  // next page
  next.addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();

    displaySearchResults(results);
  });

  // prev page
  prev.addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();

    displaySearchResults(results);
  });
};

const showAlert = (message, className = 'error') => {
  const alertEl = document.createElement('div');

  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 2000);
};

const initSwiper = () => {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

// fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();
  return data;
};

const searchAPIData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  showSpinner();
  const response = await fetch(
    `${API_URL}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );

  const data = await response.json();

  hideSpinner();
  return data;
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// highlight active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
};

function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      displaySlider();
      break;
    case '/shows.html':
      displayPopularTv();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
