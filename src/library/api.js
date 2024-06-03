const API_URL = import.meta.env.VITE_API_URL ?? '/api';

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

export const deletePlan = async (id) => {
  const response = await fetch(`${API_URL}/plans/${id}`, {
    method: 'DELETE',
  });
};

export const updatePlan = async (id, plan) => {
  const response = await fetch(`${API_URL}/plans/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(plan),
  });
  return await response.json();
};

export const getPlan = async (id) => {
  const response = await fetch(`${API_URL}/plans/${id}`);
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

export const listAllTasks = async (planId) => {
  const response = await fetch(`${API_URL}/tasks/${planId}/`);
  return await response.json();
};

export const listDayTasks = async (planId, date) => {
  const response = await fetch(`${API_URL}/tasks/${planId}/${date}`);
  return await response.json();
};
