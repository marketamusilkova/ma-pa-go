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

// export const listDayTasks = async (planId, date) => {
//   const response = await fetch(`${API_URL}/tasks/${planId}/${date}`);
//   return await response.json();
// };

// fetch for zipcode
export const sendZipcode = async (zipcode) => {
  const response = await fetch(`${API_URL}/zipcode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(zipcode),
  });
  return await response.json();
}
