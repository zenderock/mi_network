// Types pour les réponses API
export interface ApiResponse<T> {
    data?: T;
    error?: string;
  }
  
  // Types pour l'authentification
  export interface AuthUser {
    id: number;
    username: string;
    email: string;
    is_admin: boolean;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  // Types pour le monitoring
  export interface NetworkStats {
    bytes_sent_per_sec: number;
    bytes_recv_per_sec: number;
    total_bytes_sent: number;
    total_bytes_recv: number;
  }
  
  export interface NetworkConnection {
    local_address: string;
    remote_address: string;
    status: string;
    pid?: number;
  }
  
  // Types pour les utilisateurs
  export interface UserFormData {
    username: string;
    email: string;
    password?: string;
    is_admin: boolean;
  }