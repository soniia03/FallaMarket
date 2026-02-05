import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ApiResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getAllProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/get/all`);
  }

  // Obtener productos disponibles
  getAvailableProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/get/available`);
  }

  // Obtener producto por ID
  getProductById(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/get/${id}`);
  }

  // Crear producto
  createProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/post`, product);
  }

  // Actualizar producto
  updateProduct(id: string, product: Partial<Product>): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/update/${id}`, product);
  }

  // Eliminar producto
  deleteProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.delete<ApiResponse<Product>>(`${this.apiUrl}/delete/${id}`);
  }

  // Buscar productos por categoría
  getProductsByCategory(category: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/category/${category}`);
  }

  // Buscar productos por texto
  searchProducts(query: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/search?q=${encodeURIComponent(query)}`);
  }

  // Marcar producto como vendido
  markAsSold(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.apiUrl}/sold/${id}`, {});
  }

  // Reservar producto
  reserveProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.patch<ApiResponse<Product>>(`${this.apiUrl}/reserve/${id}`, {});
  }

  // Obtener categorías disponibles
  getCategories() {
    return [
      { key: 'traje-fallero', label: 'Traje Fallero', icon: 'fas fa-male', color: 'primary' },
      { key: 'traje-fallera', label: 'Traje Fallera', icon: 'fas fa-female', color: 'info' },
      { key: 'complementos', label: 'Complementos', icon: 'fas fa-scarf', color: 'warning' },
      { key: 'calzado', label: 'Calzado', icon: 'fas fa-shoe-prints', color: 'success' },
      { key: 'accesorios', label: 'Accesorios', icon: 'fas fa-gem', color: 'danger' }
    ];
  }

  // Obtener condiciones disponibles
  getConditions() {
    return [
      { key: 'nuevo', label: 'Nuevo', class: 'bg-success' },
      { key: 'usado', label: 'Usado', class: 'bg-warning' },
      { key: 'reservado', label: 'Reservado', class: 'bg-info' },
      { key: 'vendido', label: 'Vendido', class: 'bg-secondary' }
    ];
  }

  // Formatear precio
  formatPrice(price: number): string {
    return `${price.toFixed(2)}€`;
  }
}