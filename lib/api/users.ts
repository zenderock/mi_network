import { fetchApi } from "@/lib/api";

interface User {
  id: number;
  username: string;
  email: string;
  is_admin: boolean;
}

export const getUsers = async (): Promise<User[]> => {
  return await fetchApi("/api/users/");
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}): Promise<User> => {
  return await fetchApi("/api/users/", {
    method: "POST",
    body: JSON.stringify(userData),
  });
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
  return await fetchApi(`/api/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

export const deleteUser = async (userId: number): Promise<void> => {
  await fetchApi(`/api/users/${userId}`, {
    method: "DELETE",
  });
};