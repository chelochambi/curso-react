import React, { useEffect, useState } from "react";
import Image from "next/image";

interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phone: string;
  image: string;
}

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UserType[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((datos) => {
        console.log(datos);
        setUsuarios(datos.users);
      });
  }, []);

  return (
    <div>
      <h1>ListaUsuarios</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {usuarios.map((usuario) => {
          return (
            <div key={usuario.id} className="card-usuario">
              <Image
                src={usuario.image}
                alt={usuario.lastName}
                width={150}
                height={150}
                className="card-usuario__image"
              />
              <div className="card-usuario__info">
                <p className="card-usuario__titulo">
                  {usuario.firstName} {usuario.lastName}
                </p>
                <p className="card-usuario__descripcion">{usuario.phone}</p>
                <p className="card-usuario__descripcion">{usuario.gender}</p>
                <p className="card-usuario__descripcion">{usuario.age}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaUsuarios;
