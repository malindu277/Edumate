const BACKEND_URL = 'http://localhost:3001';
const API_URL = `${BACKEND_URL}/api`;

const API_SERVICE = {
  // course
  courses: `${API_URL}/courses`,
  // purchase
  purchases: `${API_URL}/purchases`,
};

export default API_SERVICE;
export { BACKEND_URL };
