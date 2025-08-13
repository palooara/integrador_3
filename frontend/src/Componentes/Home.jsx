const Home = ({ productos = [] }) => {
  return (
    <div className="container">
      <h1 className="text-center my-4">Servicios</h1>
      <div className="row g-4 justify-content-center">
        {productos.length === 0 ? (
          <p className="text-center">No hay productos disponibles.</p>
        ) : (
          productos.map((p) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              key={p._id}
            >
              <div className="card flex-fill shadow-sm">
                <div className="card-header text-center">
                  <h5 className="mb-0">{p.nombre}</h5>
                </div>
                <div className="card-body text-center">
                  <p className="card-text">{p.descripcion}</p>
                  <p className="fw-bold">${p.precio}</p>
                  <button className="btn btn-primary w-100">
                    Agregar Servicio
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
