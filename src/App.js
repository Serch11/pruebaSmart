import React, { Component } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import firebase from './firebase'
import { modal, ModalBody, ModalFooter } from 'reactstrap'
import Map from './Map'
import credentials from './credential'
import Mpa2 from './components/Map2'
import Covid from './components/covid19'
import About from './About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, BrowserRouter
} from "react-router-dom";

 //const mapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAbatDd69Mms_f72t_ZMOsq0dJC0r-pTNw';

class App extends React.Component {
  state = {
    data: [],
    modalInsertar: false,
    ModalEditar: false,
    modalMapa:false,
    form: {
      cedula: '',
      nombre: '',
      apellido: '',
      direccion: '',
      email: ''

    },
    id: 0
  };
  // obtenemos los datos ingresados en los formularios
  peticionGet = () => {
    firebase.child("usuarios").on("value", (usuario) => {
      if (usuario.val() !== null) {
        this.setState({ ...this.state.data, data: usuario.val() })
      } else {
        this.setState({ data: [] });
      }
    })
  }
  //enviamos  los datos  en a firebase
  peticionPost = () => {
    firebase.child("usuarios").push(this.state.form,
      error => {
        if (error) console.log(error)
      });
    this.setState({ modalInsertar: false });
  }

  peticionPut = () => {
    firebase.child(`usuarios/${this.state.id}`).set(
      this.state.form,
      error=>{
        if(error)console.log(error)
      });
    this.setState({ModalEditar:false})
  }

  peticionDelete = () => {
    if(window.confirm(`Estas seguro que deseas elimianr el usuarios ${this.state.form.usuario}?`))
    {
    firebase.child(`usuarios/${this.state.id}`).remove(error =>{
        if(error)console.log(error)
      });
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form);
  }

  seleccionarUsuario = async(usuario, id, caso) => {
    
     await this.setState({ form: usuario, id: id });

    (caso === "Editar") ? this.setState({ModalEditar: true }):
    this.peticionDelete()
  }

  componentDidMount() {
    this.peticionGet();
  }
  render() {

    return (

      <div className="App">
        <br />
        <button className="btn btn-success" onClick={() => this.setState({ modalInsertar: true })}>Insertar</button>
        <button className="btn btn-success" onClick={() => this.setState({ modalMapa: true })}>Ver Mapa</button>
        <br />
        <br />

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Direccion</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.data).map(i => {
              //console.log(i);
              return <tr key={i}>
                <td>{this.state.data[i].cedula}</td>
                <td>{this.state.data[i].nombre}</td>
                <td>{this.state.data[i].apellido}</td>
                <td>{this.state.data[i].direccion}</td>
                <td>{this.state.data[i].email}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>this.seleccionarUsuario(this.state.data[i],i,'Editar')}>Editar</button> {"  "}
                  <button className="btn btn-danger" onClick={()=>this.seleccionarUsuario(this.state.data[i],i,'Eliminar')}>Eliminar</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
            

           {/* <div> 
              <Map 
                googleMapURL = {mapURL}
                containerElement = {<div style ={{height:'400px'}} />}
                mapElement = {<div style={{height:'100%'}}/>}
                loadingElement = {<p>Cargando</p>}
              />
           </div> */}



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>Fomulario de Usuario</ModalHeader>
          <ModalBody>
            <div className="container">

              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cedula"
                    name="cedula"
                    onChange={this.handleChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="nombre"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="apellido"
                    name="apellido"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="direccion"
                    name="direccion"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>

              </form>

            </div>
          </ModalBody>
          <ModalFooter>
            <button className="form-control btn-success" onClick={() => this.peticionPost()}>Insertar</button>
            <button className="form-control btn-danger" onClick={() => this.setState({ modalInsertar: false })}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.ModalEditar}>
          <ModalHeader>Editar Registro</ModalHeader>
          <ModalBody>
            <div className="form-group">

              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Cedula" name="cedula" 
                  onChange={this.handleChange} value={this.state.form && this.state.form.cedula} />
                </div>

                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Nombre" name="nombre"
                   onChange={this.handleChange} value={this.state.form && this.state.form.nombre} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="apellido" name="apellido" 
                  onChange={this.handleChange} value={this.state.form && this.state.form.apellido} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="direccion" name="direccion" 
                  onChange={this.handleChange}  value={this.state.form && this.state.form.direccion} />
                </div>
                <div className="form-group">
                  <input type="email" className="form-control" placeholder="email" name="email" 
                  onChange={this.handleChange} value={this.state.form && this.state.form.email} />
                </div>

              </form>
            </div>
          </ModalBody>
          <ModalFooter>
           <button className="btn btn-success" onClick={()=>this.peticionPut()}>Editar</button>{"  "}
           <button className="btn btn-danger" onClick={()=>this.setState({ModalEditar:false})}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalMapa}>
          <ModalHeader>Mapa Paises</ModalHeader>
          <ModalBody>
          <div> 
            <Mpa2/>
           </div>
          </ModalBody>
        </Modal>

           <Router>
             
           </Router>
      </div>

    );
  }

}
export default App;
