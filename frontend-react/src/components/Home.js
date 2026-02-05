import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useUsers } from '../hooks/useUsers';

const Home = () => {
  const { products, loading: productsLoading } = useProducts();
  const { users, loading: usersLoading } = useUsers();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    accessoriesCount: 0
  });

  const categories = [
    { key: 'traje-fallero', label: 'Traje Fallero', icon: 'fas fa-male', color: 'primary' },
    { key: 'traje-fallera', label: 'Traje Fallera', icon: 'fas fa-female', color: 'info' },
    { key: 'complementos', label: 'Complementos', icon: 'fas fa-scarf', color: 'warning' },
    { key: 'calzado', label: 'Calzado', icon: 'fas fa-shoe-prints', color: 'success' },
    { key: 'accesorios', label: 'Accesorios', icon: 'fas fa-gem', color: 'danger' }
  ];

  useEffect(() => {
    if (products && products.length > 0) {
      // Calcular estadísticas
      setStats({
        totalProducts: products.length,
        totalUsers: users.length,
        accessoriesCount: products.filter(p => 
          p.category === 'accesorios' || p.category === 'complementos'
        ).length
      });

      // Obtener productos destacados (4 más recientes disponibles)
      const featured = products
        .filter(p => p.available && p.condition !== 'vendido')
        .slice(0, 4);
      setFeaturedProducts(featured);
    }
  }, [products, users]);

  const getCategoryCount = (categoryKey) => {
    return featuredProducts.filter(p => p.category === categoryKey).length;
  };

  const getCategoryColor = (category) => {
    const categoryMap = {
      'traje-fallero': 'primary',
      'traje-fallera': 'info',
      'complementos': 'warning',
      'calzado': 'success',
      'accesorios': 'danger'
    };
    return categoryMap[category] || 'secondary';
  };

  const getConditionClass = (condition) => {
    const conditionMap = {
      'nuevo': 'bg-success',
      'usado': 'bg-warning text-dark',
      'reservado': 'bg-info',
      'vendido': 'bg-secondary'
    };
    return conditionMap[condition] || 'bg-secondary';
  };

  const formatPrice = (price) => {
    return `${price.toFixed(2)}€`;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-white p-5 mb-5 rounded">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h1 className="display-4 fw-bold mb-3">
              <i className="fas fa-crown me-3"></i>
              FallaMarket
            </h1>
            <p className="lead mb-4">
              El marketplace especializado en trajes falleros valencianos y sus accesorios. 
              Encuentra y vende piezas únicas para las fallas de Valencia.
            </p>
            <div className="d-flex gap-3">
              <Link to="/products" className="btn btn-warning btn-lg">
                <i className="fas fa-tshirt me-2"></i>
                Ver Productos
              </Link>
              <Link to="/products/add" className="btn btn-outline-light btn-lg">
                <i className="fas fa-plus me-2"></i>
                Vender
              </Link>
            </div>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-crown" style={{ fontSize: '150px', opacity: 0.3 }}></i>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="fas fa-tshirt fa-3x text-primary mb-3"></i>
              <h5 className="card-title">Trajes Tradicionales</h5>
              <p className="card-text">
                Encuentra trajes falleros auténticos de diferentes épocas y estilos.
              </p>
              <div className="text-primary fw-bold fs-4">{stats.totalProducts}</div>
              <small className="text-muted">productos disponibles</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="fas fa-users fa-3x text-success mb-3"></i>
              <h5 className="card-title">Comunidad Fallera</h5>
              <p className="card-text">
                Conecta con falleros de toda Valencia para comprar y vender.
              </p>
              <div className="text-success fw-bold fs-4">{stats.totalUsers}</div>
              <small className="text-muted">usuarios registrados</small>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <i className="fas fa-gem fa-3x text-warning mb-3"></i>
              <h5 className="card-title">Accesorios Únicos</h5>
              <p className="card-text">
                Complementos artesanales y piezas especiales para tu traje.
              </p>
              <div className="text-warning fw-bold fs-4">{stats.accessoriesCount}</div>
              <small className="text-muted">accesorios únicos</small>
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <h2 className="mb-4">Categorías Principales</h2>
      <div className="row mb-5">
        {categories.map((category) => (
          <div key={category.key} className="col-md-6 col-lg-3 mb-3">
            <Link 
              to={`/products?category=${category.key}`}
              className="text-decoration-none"
            >
              <div className="card category-card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <i 
                    className={`${category.icon} fa-3x mb-3 text-${category.color}`}
                  ></i>
                  <h5 className="card-title">{category.label}</h5>
                  <div className={`fw-bold text-${category.color}`}>
                    {getCategoryCount(category.key)}
                  </div>
                  <small className="text-muted">productos</small>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Productos Destacados */}
      <h2 className="mb-4">Productos Destacados</h2>
      {featuredProducts.length > 0 ? (
        <div className="row">
          {featuredProducts.map((product) => (
            <div key={product._id} className="col-md-6 col-lg-3 mb-4">
              <div className="card product-card h-100">
                <div className="position-relative">
                  <img 
                    src={product.images && product.images[0] ? product.images[0] : '/assets/images/no-image.jpg'}
                    className="card-img-top product-image"
                    alt={product.name}
                  />
                  <span className={`badge position-absolute top-0 end-0 m-2 ${getConditionClass(product.condition)}`}>
                    {product.condition}
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text text-muted small">
                    {product.description.length > 80 
                      ? `${product.description.slice(0, 80)}...` 
                      : product.description}
                  </p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price-tag">{formatPrice(product.price)}</span>
                      <span className={`badge bg-${getCategoryColor(product.category)}`}>
                        {product.category}
                      </span>
                    </div>
                    <Link 
                      to={`/products/${product._id}`}
                      className="btn btn-primary btn-sm mt-2 w-100"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          {productsLoading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            <>
              <i className="fas fa-info-circle me-2"></i>
              No hay productos destacados disponibles en este momento.
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;