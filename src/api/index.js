import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

export const signIn = (formData) => {
  return API({
    method: 'POST',
    data: {
      username: formData.email,
      password: formData.password
    },
    withCredentials: true,
    url: "/auth/signin"
  })
}

export const signOut = () => {
  return API({
    method: 'POST',
    url: "/auth/signout"
  })
}

export const checkAuth = () => {
  return API({
    method: 'GET',
    url: "/private"
  })
}

export const getMedias = () => API.get('/data/medias');

export const getMediasByGenre = (genre) => API.get(`/medias/genre/${genre}`);

export const getMediaDetails = (mediaId) => API.get(`/media/${mediaId}`);

export const getMediaSrc = (mediaSrcId) => API.get(`/data/mediaSrc/${mediaSrcId}`);

export const getMediaSrcsAndProgress = (mediaId) => API.get(`/data/media/${mediaId}/mediaSrc/progress`);

export const getMediaInList = (mediaId) => API.get(`/data/media/${mediaId}/list`);

export const putMediaInList = (mediaId) => API.put(`/data/media/${mediaId}/list`);

export const deleteMediaFromList = (mediaId) => API.delete(`/data/media/${mediaId}/list`);

export const getUser = () => API.get('/data/user');

export const postUser = (formData) => API.post('/data/user', { data: formData });

export const putUserData = (user, formData) => API.put(`/data/user`, { user: user, data: formData });

export const deleteUser = (user) => API.delete(`/data/user/${user}`);

export const getUserRole = () => API.get('/data/user/role');

export const getUserList = () => API.get('/data/user/list');

export const getUserReviews = (user) => API.get(`/data/user/${user}/reviews`);

export const getUserViewLogs = (user) => API.get(`/data/user/${user}/viewlogs`);

export const getUserKeepWatching = () => API.get('/data/user/keepwatching');

export const getUserGenreAffinity = () => API.get('/data/user/genres');

export const getUsers = () => API.get('/data/users');

export const getGenres = () => API.get('/data/genres');

export const getUserFeedback = (media) => API.get('/data/media/review', { params: { media }});

export const putFeedback = (media, feedback) => API.put('/data/media/review', { media, feedback });

export const deleteFeedback = (media) => API.delete('/data/media/review', { params: { media }});

export const getViewLog = (mediaSrc) => API.get('/data/viewLog', { params: { mediaSrc }});

export const putViewLog = (mediaSrc, progress) => API.put('/data/viewlog', { mediaSrc, progress });

export const getQuery = (searchQuery) => API.get('/data/medias/search/', { params: { searchQuery }});