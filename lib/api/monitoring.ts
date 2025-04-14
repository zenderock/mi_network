const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface NetworkUsage {
  bytes_sent_per_sec: number;
  bytes_recv_per_sec: number;
  total_bytes_sent: number;
  total_bytes_recv: number;
}

interface Connection {
  local_address: string;
  remote_address: string;
  status: string;
  pid?: number;
}

export const getNetworkUsage = async (): Promise<NetworkUsage> => {
  const response = await fetch(`${API_URL}/api/monitoring/network-usage`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des statistiques réseau');
  }

  return response.json();
};

export const getActiveConnections = async (): Promise<Connection[]> => {
  const response = await fetch(`${API_URL}/api/monitoring/connections`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des connexions actives');
  }

  return response.json();
};

export const getSystemStats = async () => {
  const response = await fetch(`${API_URL}/api/monitoring/system`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des statistiques système');
  }

  return response.json();
};