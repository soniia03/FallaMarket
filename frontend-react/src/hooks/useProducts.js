import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/products/get/all`);
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/post`, productData);
      if (response.data.success) {
        await fetchProducts(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/update/${id}`, productData);
      if (response.data.success) {
        await fetchProducts(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/delete/${id}`);
      if (response.data.success) {
        await fetchProducts(); // Refresh the list
        return true;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/get/${id}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const searchProducts = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/category/${category}`);
      if (response.data.success) {
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const reserveProduct = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/products/reserve/${id}`);
      if (response.data.success) {
        await fetchProducts(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  const markAsSold = async (id) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/products/sold/${id}`);
      if (response.data.success) {
        await fetchProducts(); // Refresh the list
        return response.data.data;
      }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message);
    }
  };

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    searchProducts,
    getProductsByCategory,
    reserveProduct,
    markAsSold,
    refetch: fetchProducts
  };
};