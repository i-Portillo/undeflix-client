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

export const putMediaData = (mediaId, formData) => API.put(`/data/media`, { mediaId: mediaId, data: formData });

export const postMedia = (formData) => API.post(`/data/media`, { data: formData })

export const deleteMedia = (mediaId) => API.delete(`/data/media/${mediaId}`);

export const getUser = () => API.get('/data/user');

export const postUser = (formData) => API.post('/data/user', { data: formData });

export const putUserData = (user, formData) => API.put(`/data/user`, { user: user, data: formData });

export const putUserPassword = (password) => API.put(`/data/user/password`, { password: password })

export const deleteUser = (user) => API.delete(`/data/user/${user}`);

export const getUserRole = () => API.get('/data/user/role');

export const getUserList = () => API.get('/data/user/list');

export const getUserReviews = (user) => API.get(`/data/user/${user}/reviews`);

export const getUserViewLogs = (user) => API.get(`/data/user/${user}/viewlogs`);

export const getUserKeepWatching = () => API.get('/data/user/keepwatching');

export const getUserGenreAffinity = () => API.get('/data/user/genres');

export const getUserBankDetails = () => API.get('/data/user/bank');

export const getUsers = () => API.get('/data/users');

export const getGenres = () => API.get('/data/genres');

export const postGenre = (genre) => API.post('/data/genre', { genre: genre } );

export const getUserFeedback = (media) => API.get('/data/media/review', { params: { media }});

export const putFeedback = (media, feedback) => API.put('/data/media/review', { media, feedback });

export const deleteFeedback = (media) => API.delete('/data/media/review', { params: { media }});

export const getViewLog = (mediaSrc) => API.get('/data/viewLog', { params: { mediaSrc }});

export const putViewLog = (mediaSrc, progress) => API.put('/data/viewlog', { mediaSrc, progress });

export const getQuery = (searchQuery) => API.get('/data/medias/search/', { params: { searchQuery }});

export const getMediaReviewsData = (mediaId) => API.get(`/data/media/${mediaId}/reviewData`);

export const getListedData = (mediaId) => API.get(`/data/media/${mediaId}/listedData`);

export const postFile = (formData) => API.post('/data/upload', formData);

// export const dumpDatabase = () => API.get('/data/db/backup');

export const dumpDatabase = () => API({
  method: 'GET',
  url: '/data/db/backup',
  responseType: 'blob',
})

export const restoreDatabase = (formData) => API.post('/data/db/restore', formData);