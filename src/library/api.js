const API_URL = import.meta.env.VITE_API_URL ?? '/api';

// fetches for plans
export const listPlans = async () => {
  const response = await fetch(`${API_URL}/plans`);
  return await response.json();
};

export const appendPlan = async (plan) => {
  const response = await fetch(`${API_URL}/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const deletePlan = async (planId) => {
  const response = await fetch(`${API_URL}/plans/${planId}`, {
    method: 'DELETE',
  });
};

export const getPlan = async (planId) => {
  const response = await fetch(`${API_URL}/plans/${planId}`);
  return await response.json();
};

export const updatePlan = async (planId, plan) => {
  const response = await fetch(`${API_URL}/plans/${planId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

// fetches for tasks
export const listAllTasks = async (planId) => {
  const response = await fetch(`${API_URL}/tasks/${planId}/`);
  return await response.json();
};

export const appendTask = async (task) => {
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
};

export const getTask = async (taskId) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`);
  return await response.json();
};

export const updateTask = async (taskId, task) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return await response.json();
};

// fetches for books
export const listBooks = async () => {
  const response = await fetch(`${API_URL}/books`);
  return await response.json();
};

export const appendBook = async (book) => {
  const response = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return await response.json();
};

export const deleteBook = async (bookId) => {
  const response = await fetch(`${API_URL}/books/${bookId}`, {
    method: 'DELETE',
  });
};

// fetches for films
export const listFilms = async () => {
  const response = await fetch(`${API_URL}/films`);
  return await response.json();
};

export const appendFilm = async (film) => {
  const response = await fetch(`${API_URL}/films`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(film),
  });
  return await response.json();
};

export const deleteFilm = async (filmId) => {
  const response = await fetch(`${API_URL}/films/${filmId}`, {
    method: 'DELETE',
  });
};

// fetch for notifications
export const appendUser = async (user) => {
  const response = await fetch(`https://ma-pa-go.deno.dev/api/notifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};

//fetch for checklist
export const listCheckedStates = async () => {
  const response = await fetch(`${API_URL}/checkbox`);
  return await response.json();
};

export const appenCheck = async (check) => {
  const response = await fetch(`${API_URL}/checkbox`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(check),
  });
  return await response.json();
};

// fetch for name-days
export const nameDays = async () => {
  const response = await fetch('https://nameday.abalin.net/api/V1/today');
  return await response.json();
};
