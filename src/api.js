import axios from 'axios';

const API_KEY = 'e08f08863ac872ab198f62f7406e629d'
const BASE_URL = 'https://api.themoviedb.org/3';

const get = async (url, params) => {
  try {
    const response = await axios.get(url, {
        params: {
        ...params,
        api_key: API_KEY,
      },
    });
    return await response.data;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day`;
  try {
    const response = await get(url);
    const results = response.results;
    return results;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}`;
  const movieData = await get(url);
  return movieData;
};

export const getMovieCredits = async (movieId) => {
  try {
    const url = `${BASE_URL}/movie/${movieId}/credits`;
    const actorsData = await get(url);
    return actorsData
  }
  catch (err) { 
    console.log('Cringe Error', err);
    throw err;
  }
};

export const getMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews`;
  const reviewsData = await get(url)
  return reviewsData
};

export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie`;
  const searchData = await get(url, { query });
  // console.log(searchData)
  return searchData
};