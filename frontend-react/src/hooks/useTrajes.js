import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const useTrajes = () => {
  const [trajes, setTrajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrajes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/trajes/`);
      if (response.data.status) {
        setTrajes(response.data.status);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching trajes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrajes();
  }, []);

  const createTraje = async (trajeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/trajes/anadir`, trajeData);
      if (response.data.status === 'Traje agregado correctamente') {
        await fetchTrajes(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.status || err.message);
    }
  };

  const updateTraje = async (id, trajeData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/trajes/editar/${id}`, trajeData);
      if (response.data.status === 'Traje actualizado correctamente') {
        await fetchTrajes(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.status || err.message);
    }
  };

  const deleteTraje = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/trajes/eliminar/${id}`);
      if (response.data.status === 'Traje eliminado correctamente') {
        await fetchTrajes(); // Refresh the list
        return true;
      }
    } catch (err) {
      throw new Error(err.response?.data?.status || err.message);
    }
  };

  const getTrajeById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trajes/traje/${id}`);
      if (response.data.status === 'Traje encontrado correctamente') {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.status || err.message);
    }
  };

  return {
    trajes,
    loading,
    error,
    createTraje,
    updateTraje,
    deleteTraje,
    getTrajeById,
    refetch: fetchTrajes
  };
};