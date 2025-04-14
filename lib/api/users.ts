const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/api/users/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des utilisateurs');
  }

  return response.json();
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la création de l\'utilisateur');
  }

  return response.json();
};

export const updateUser = async (
  userId: number,
  userData: Partial<{
    username: string;
    email: string;
    password: string;
    is_admin: boolean;
  }>
): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la mise à jour de l\'utilisateur');
  }

  return response.json();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de la suppression de l\'utilisateur');
  }
};