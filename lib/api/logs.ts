const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSystemLogs = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/logs/system`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la récupération des logs système');
  }
  const data = await response.json();
  return data.logs;
};

export const getAuthLogs = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/api/logs/auth`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erreur lors de la récupération des logs auth');
  }
  const data = await response.json();
  return data.logs;
};
