import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/users/get/all`);
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/post`, userData);
      if (response.data.success) {
        await fetchUsers(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/users/update/${id}`, userData);
      if (response.data.success) {
        await fetchUsers(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/users/delete/${id}`);
      if (response.data.success) {
        await fetchUsers(); // Refresh the list
        return true;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/get/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getUserByEmail = async (email) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getActiveUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/get/active`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getUserProducts = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/products/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const deactivateUser = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/deactivate/${id}`);
      if (response.data.success) {
        await fetchUsers(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const reactivateUser = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/users/reactivate/${id}`);
      if (response.data.success) {
        await fetchUsers(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail,
    getActiveUsers,
    getUserProducts,
    deactivateUser,
    reactivateUser,
    refetch: fetchUsers
  };
};