const BASE_URL = 'http://localhost:3001';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max));

async function callApi(endpoint, options = {}) {
  await simulateNetworkLatency();

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
}

const api = {
  tasks: {
    list() {
      // ESTADO DE ERROR
      // throw new Error('500: Server Error');
      // ESTADO OPTIMO
      return callApi('/tasks');
    },
    create(task) {
      return callApi(`/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
      });
    },
    read(taskId) {
      return callApi(`/tasks/${taskId}`);
    },
    update(taskId, updates) {
      return callApi(`/tasks/${taskId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    remove(taskId) {
      return callApi(`/tasks/${taskId}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;
