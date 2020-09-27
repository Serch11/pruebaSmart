import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link style={{ color: "white", textDecoration: "none" }} to="/">
        <div style={{ fontSize: "30px" }}>Serch Redondo</div>
      </Link>
      <ul className="nav-links">
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px",
          }}
          to="/App"
        >
          <li>Crear Usuario</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "50px",
          }}
          to="/Covid19"
        >
          <li>Mapa y Datos Globales</li>
        </Link>
        <Link
          style={{ color: "white", 
          textDecoration: "none", 
          marginTop: "10px" ,
          marginRight: "50px",
        }}
          to="/Map2"
        >
          <li>Colombia</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "50px",
          }}
          to="/Map3"
        >
          <li>Mapa Dinamico</li>
        </Link>
      </ul>
    </nav>
  );
}

export default Nav;