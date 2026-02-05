import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { Product, User } from '../../models/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="hero-section bg-primary text-white p-5 mb-5 rounded">
      <div class="row align-items-center">
        <div class="col-md-8">
          <h1 class="display-4 fw-bold mb-3">
            <i class="fas fa-crown me-3"></i>
            FallaMarket
          </h1>
          <p class="lead mb-4">
            El marketplace especializado en trajes falleros valencianos y sus accesorios. 
            Encuentra y vende piezas únicas para las fallas de Valencia.
          </p>
          <div class="d-flex gap-3">
            <a routerLink="/products" class="btn btn-warning btn-lg">
              <i class="fas fa-tshirt me-2"></i>
              Ver Productos
            </a>
            <a routerLink="/products/add" class="btn btn-outline-light btn-lg">
              <i class="fas fa-plus me-2"></i>
              Vender
            </a>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <i class="fas fa-crown" style="font-size: 150px; opacity: 0.3;"></i>
        </div>
      </div>
    </div>

    <div class="row mb-5">
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-tshirt fa-3x text-primary mb-3"></i>
            <h5 class="card-title">Trajes Tradicionales</h5>
            <p class="card-text">
              Encuentra trajes falleros auténticos de diferentes épocas y estilos.
            </p>
            <div class="text-primary fw-bold fs-4">{{ stats.totalProducts }}</div>
            <small class="text-muted">productos disponibles</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-users fa-3x text-success mb-3"></i>
            <h5 class="card-title">Comunidad Fallera</h5>
            <p class="card-text">
              Conecta con falleros de toda Valencia para comprar y vender.
            </p>
            <div class="text-success fw-bold fs-4">{{ stats.totalUsers }}</div>
            <small class="text-muted">usuarios registrados</small>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100 text-center">
          <div class="card-body">
            <i class="fas fa-gem fa-3x text-warning mb-3"></i>
            <h5 class="card-title">Accesorios Únicos</h5>
            <p class="card-text">
              Complementos artesanales y piezas especiales para tu traje.
            </p>
            <div class="text-warning fw-bold fs-4">{{ stats.accessoriesCount }}</div>
            <small class="text-muted">accesorios únicos</small>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb-4">Categorías Principales</h2>
    <div class="row mb-5">
      <div class="col-md-6 col-lg-3 mb-3" *ngFor="let category of categories">
        <div class="card category-card h-100 border-0 shadow-sm" 
             [routerLink]="['/products']" 
             [queryParams]="{category: category.key}"
             style="cursor: pointer;">
          <div class="card-body text-center p-4">
            <i [class]="category.icon" 
               class="fa-3x mb-3"
               [ngClass]="'text-' + category.color"></i>
            <h5 class="card-title">{{ category.label }}</h5>
            <div class="fw-bold" [ngClass]="'text-' + category.color">
              {{ getCategoryCount(category.key) }}
            </div>
            <small class="text-muted">productos</small>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mb-4">Productos Destacados</h2>
    <div class="row" *ngIf="featuredProducts.length > 0">
      <div class="col-md-6 col-lg-3 mb-4" *ngFor="let product of featuredProducts">
        <div class="card product-card h-100">
          <div class="position-relative">
            <img 
              [src]="product.images[0] || '/assets/images/no-image.jpg'" 
              class="card-img-top product-image"
              [alt]="product.name"
              style="height: 200px; object-fit: cover;">
            <span class="badge position-absolute top-0 end-0 m-2"
                  [ngClass]="getConditionClass(product.condition)">
              {{ product.condition }}
            </span>
          </div>
          <div class="card-body d-flex flex-column">
            <h6 class="card-title">{{ product.name }}</h6>
            <p class="card-text text-muted small">
              {{ product.description | slice:0:80 }}...
            </p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center">
                <span class="price-tag">{{ formatPrice(product.price) }}</span>
                <span class="badge category-badge" 
                      [ngClass]="'bg-' + getCategoryColor(product.category)">
                  {{ product.category }}
                </span>
              </div>
              <a [routerLink]="['/products', product._id]" 
                 class="btn btn-primary btn-sm mt-2 w-100">
                Ver Detalles
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info mt-4" *ngIf="featuredProducts.length === 0 && !loading">
      <i class="fas fa-info-circle me-2"></i>
      No hay productos destacados disponibles en este momento.
    </div>

    <div class="text-center" *ngIf="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    }
    
    .category-card:hover {
      transform: translateY(-5px);
      transition: transform 0.2s ease-in-out;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
    }
    
    .product-card:hover {
      transform: translateY(-2px);
      transition: transform 0.2s ease-in-out;
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: any[] = [];
  stats = {
    totalProducts: 0,
    totalUsers: 0,
    accessoriesCount: 0
  };
  loading = true;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadStats();
    this.loadFeaturedProducts();
  }

  loadCategories(): void {
    this.categories = this.productService.getCategories();
  }

  loadStats(): void {
    // Cargar estadísticas de productos
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.totalProducts = response.data.length;
          this.stats.accessoriesCount = response.data.filter(p => 
            p.category === 'accesorios' || p.category === 'complementos'
          ).length;
        }
      },
      error: (error) => console.error('Error loading product stats:', error)
    });

    // Cargar estadísticas de usuarios
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats.totalUsers = response.data.length;
        }
      },
      error: (error) => console.error('Error loading user stats:', error)
    });
  }

  loadFeaturedProducts(): void {
    this.productService.getAvailableProducts().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          // Mostrar los 4 productos más recientes disponibles
          this.featuredProducts = response.data
            .filter(p => p.available && p.condition !== 'vendido')
            .slice(0, 4);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading featured products:', error);
        this.loading = false;
      }
    });
  }

  getCategoryCount(categoryKey: string): number {
    return this.featuredProducts.filter(p => p.category === categoryKey).length;
  }

  getCategoryColor(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'traje-fallero': 'primary',
      'traje-fallera': 'info',
      'complementos': 'warning',
      'calzado': 'success',
      'accesorios': 'danger'
    };
    return categoryMap[category] || 'secondary';
  }

  getConditionClass(condition: string): string {
    const conditionMap: { [key: string]: string } = {
      'nuevo': 'bg-success',
      'usado': 'bg-warning text-dark',
      'reservado': 'bg-info',
      'vendido': 'bg-secondary'
    };
    return conditionMap[condition] || 'bg-secondary';
  }

  formatPrice(price: number): string {
    return this.productService.formatPrice(price);
  }
}