const Home = ({ productos = [] }) => {
  return (
    <div className="row">
      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        productos.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">{p.nombre}</h5>
                <p className="card-text">{p.descripcion}</p>
                <p className="fw-bold">${p.precio}</p>
                <small className="text-muted">{p.categoria}</small>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
