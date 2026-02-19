import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTrajes } from '../hooks/useTrajes';

const TrajeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTrajeById, deleteTraje } = useTrajes();
  
  const [traje, setTraje] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTraje = async () => {
      try {
        setLoading(true);
        const trajeData = await getTrajeById(id);
        setTraje(trajeData);
      } catch (err) {
        setError(`Error al cargar el traje: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTraje();
  }, [id, getTrajeById]);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el traje "${traje.nombre}"?`)) {
      try {
        await deleteTraje(id);
        navigate('/trajes');
      } catch (error) {
        alert(`Error al eliminar el traje: ${error.message}`);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMaterialIcon = (material) => {
    const materialIcons = {
      'Seda': 'fas fa-gem',
      'Terciopelo': 'fas fa-crown',
      'Raso': 'fas fa-star',
      'Brocado': 'fas fa-award',
      'Lentejuela': 'fas fa-sparkles',
      'Damasco': 'fas fa-leaf',
      'Faille': 'fas fa-wave-square',
      'Tul': 'fas fa-cloud',
      'Gasa': 'fas fa-feather'
    };
    return materialIcons[material] || 'fas fa-fabric';
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando detalles del traje...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <Link to="/trajes" className="btn btn-outline-danger">
          <i className="fas fa-arrow-left me-2"></i>Volver a la lista
        </Link>
      </div>
    );
  }

  if (!traje) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-exclamation-triangle text-warning" style={{ fontSize: '80px' }}></i>
        <h4 className="mt-3">Traje no encontrado</h4>
        <p>El traje que buscas no existe o ha sido eliminado.</p>
        <Link to="/trajes" className="btn btn-primary">
          <i className="fas fa-arrow-left me-2"></i>Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Navegación */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/trajes" className="text-decoration-none">
              <i className="fas fa-list me-1"></i>Trajes
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {traje.nombre}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Información principal del traje */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div className="card-header bg-gradient-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="card-title mb-0">
                  <i className="fas fa-tshirt me-2"></i>
                  {traje.nombre}
                </h2>
                <span className="badge bg-light text-dark fs-6">
                  ID: {traje._id}
                </span>
              </div>
            </div>
            <div className="card-body p-4">
              {/* Información principal */}
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <h5 className="text-muted mb-2">
                    <i className={`${getMaterialIcon(traje.material)} me-2 text-info`}></i>
                    Material
                  </h5>
                  <p className="h4 text-info">
                    <span className="badge bg-info text-dark p-3 rounded-3">
                      {traje.material}
                    </span>
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <h5 className="text-muted mb-2">
                    <i className="fas fa-user me-2 text-success"></i>
                    Propietario
                  </h5>
                  <p className="h4 text-success">
                    <span className="badge bg-success p-3 rounded-3">
                      {traje.propietario}
                    </span>
                  </p>
                </div>
              </div>

              {/* Metadatos */}
              <div className="border-top pt-4">
                <h5 className="text-muted mb-3">
                  <i className="fas fa-info-circle me-2"></i>
                  Información de registro
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center text-muted">
                      <i className="fas fa-calendar-plus me-2 text-primary"></i>
                      <div>
                        <strong>Fecha de creación:</strong><br />
                        <small>{formatDate(traje.createdAt)}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center text-muted">
                      <i className="fas fa-edit me-2 text-warning"></i>
                      <div>
                        <strong>Última actualización:</strong><br />
                        <small>
                          {traje.updatedAt !== traje.createdAt 
                            ? formatDate(traje.updatedAt)
                            : 'No modificado'
                          }
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de acciones */}
        <div className="col-lg-4">
          <div className="card border-0 shadow">
            <div className="card-header bg-light">
              <h5 className="card-title mb-0">
                <i className="fas fa-tools me-2"></i>
                Acciones
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <Link 
                  to={`/trajes/edit/${traje._id}`} 
                  className="btn btn-warning btn-lg"
                >
                  <i className="fas fa-edit me-2"></i>
                  Editar Traje
                </Link>
                
                <button 
                  className="btn btn-danger btn-lg" 
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash me-2"></i>
                  Eliminar Traje
                </button>
                
                <hr className="my-3" />
                
                <Link 
                  to="/trajes" 
                  className="btn btn-outline-secondary"
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Volver a la lista
                </Link>
                
                <Link 
                  to="/trajes/add" 
                  className="btn btn-outline-primary"
                >
                  <i className="fas fa-plus me-2"></i>
                  Añadir nuevo traje
                </Link>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="card border-0 shadow mt-4">
            <div className="card-header bg-light">
              <h6 className="card-title mb-0">
                <i className="fas fa-lightbulb me-2 text-warning"></i>
                Información
              </h6>
            </div>
            <div className="card-body">
              <p className="small text-muted mb-2">
                <strong>Los trajes falleros</strong> son parte del patrimonio cultural valenciano. 
                Cada uno tiene sus propias características según el material y la tradición.
              </p>
              <p className="small text-muted mb-0">
                Recuerda mantener actualizada la información del propietario y el estado del traje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrajeDetail;