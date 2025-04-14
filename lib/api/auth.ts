const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Échec de la connexion');
  }

  return response.json();
};

export const logout = async (): Promise<void> => {
  // Implémentez cette fonction si votre backend a une route de déconnexion
  // await fetch(`${API_URL}/api/auth/logout`, { method: 'POST' });
};

export const getCurrentUser = async (token: string): Promise<LoginResponse['user']> => {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des informations utilisateur');
  }

  return response.json();
};