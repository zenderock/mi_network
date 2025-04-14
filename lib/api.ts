/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  if(!token) {
    window.location.href = "/login";
    return;
  }
    
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      error = {};
    }
    
    if (error?.msg === 'Token has expired') {
      localStorage.removeItem('authToken');
      if (typeof window !== 'undefined') {
        // Affiche avec AlertProvider
        import("@/lib/alert-client").then(({ showAlert }) => {
          showAlert('Votre session a expiré. Veuillez vous reconnecter.', 'error');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        });
      }
      throw new Error('Votre session a expiré. Veuillez vous reconnecter.');
    }
    throw new Error(error?.message || error?.msg || 'Une erreur est survenue');
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}


export async function login(username: string, password: string) {
  const data = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
  
  if (data.token) {
    localStorage.setItem('authToken', data.token);
  }
  
  return data;
}

export function logout() {
  localStorage.removeItem('authToken');
}


export function fetchUsers() {
  return fetchApi('/users/');
}

export function fetchUser(id: number) {
  return fetchApi(`/users/${id}`);
}

export function createUser(userData: any) {
  return fetchApi('/users/', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

export function updateUser(id: number, userData: any) {
  return fetchApi(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
}

export function deleteUser(id: number) {
  return fetchApi(`/users/${id}`, {
    method: 'DELETE',
  });
}
