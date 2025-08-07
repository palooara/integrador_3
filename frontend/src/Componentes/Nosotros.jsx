import React from 'react';
import uno from './images/uñas1.jpg';
import dos from './images/uñas2.jpg';  
import tres from './images/uñas3.jpg';  
import cuatro from './images/uñas4.jpg';  
import cinco from './images/uñas5.jpg';  
import seis from './images/uñas6.jpg';  
import siete from './images/uñas7.jpg';  
import ocho from './images/uñas8.jpg';  
import nueve from './images/uñas9.jpg';  
import diez from './images/uñas10.jpg';  
import once from './images/uñas11.jpg';  
import doce from './images/uñas12.jpg';  

const imagenes = [
  uno, dos, tres, cuatro, cinco, seis,
  siete, ocho, nueve, diez, once, doce
];

const Nosotros = () => {
  return (
    <main className="container my-5">
      <h1 className="text-center mb-4">Trabajos realizados</h1>

      <div className="row g-3">
        {imagenes.map((imagen, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100">
              <img
                src={imagen}
                className="card-img-top img-fluid"
                alt={`Trabajo realizado ${index + 1}`}
                style={{
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Nosotros;
