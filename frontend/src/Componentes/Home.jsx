const Home = ({ productos = [] }) => {
  return (
    <div className="row justify-content-center">
      <h1 className="text-center mb-4">Servicios</h1>
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map((p) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex" key={p._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header text-center">
                <h5 className="mb-0">{p.nombre}</h5>
              </div>
              <div className="card-body text-center">
                <p className="card-text">{p.descripcion}</p>
                <p className="fw-bold">${p.precio}</p>
            <button className="btn btn-primary" >
              Agregar Servicio
            </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
