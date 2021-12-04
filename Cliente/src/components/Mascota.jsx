import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Form, Button } from 'react-bootstrap';
import especies from "../especies.json"
import razas from "../razas.json"
import Axios from "axios"
const Mascota = () => {

    const { userState } = useContext(UserContext)
    const [datos, setDatos] = useState({
        _id:userState._id,
        email: "",
        nombre_mascota: "",
        especie: "",
        raza: "",
        peso: 0,
        edad: 0
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/add/mascota", {
            _id:datos._id,
            nombre_mascota: datos.nombre_mascota,
            especie: datos.especie,
            raza: datos.raza,
            edad: datos.edad,
            peso: datos.peso
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        }).then((response) => {
            if (response.data.error) {
                alert(response.data.error)
            }
            else {
                alert("mascota ingresada correctamente")
            }

        })
    }
    const handleChange = async (e) => {
        await setDatos({
            ...datos,
            [e.target.name]: e.target.value

        })
        console.log(datos.nombre_mascota, datos.especie, datos.raza, datos.rut, datos.email, datos.edad, datos.peso)
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className="row">
                    <Form.Group className="mb-3 col col-md-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" readOnly defaultValue={userState.correo} name="email" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3 col col-md-3" controlId="formBasicPassword">
                        <Form.Label>Rut</Form.Label>
                        <Form.Control type="number" readOnly defaultValue={userState.rut} name="rut" onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className="row">
                    <Form.Group className="mb-3 col col-md-3" >
                        <Form.Label>Nombre Mascota</Form.Label>
                        <Form.Control type="text" placeholder="ingrese el nombre de su mascota" name="nombre_mascota" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3 col col-md-3 mt-auto" controlId="formBasicPassword">
                        <Form.Label>Especie</Form.Label>
                        <Form.Select aria-label="Default select example" name="especie" onChange={handleChange}>
                            <option>Otro</option>
                            {especies.map((key) => {
                                return <option value={key}> {key}</option>
                            })
                            }
                        </Form.Select>
                    </Form.Group>
                </div>
                <div className="row">
                    <Form.Group className="mb-3 col col-md-3" >
                        <Form.Label>Raza</Form.Label>
                        <Form.Select aria-label="Default select example" name="raza" onChange={handleChange}>
                            <option>Otro/No aplica</option>
                            <option disabled >--------Razas de Perros--------</option>
                            {razas.Perros.map((key, val) => {
                                return <option value={key}>{key}</option>
                            })
                            }
                            <option disabled >--------Razas de Gatos--------</option>
                            {razas.Gatos.map((key) => {
                                return <option value={key}>{key}</option>
                            })
                            }
                            <option disabled >--------Razas de aves--------</option>
                            {razas.Aves.map((key) => {
                                return <option value={key}>{key}</option>
                            })
                            }
                            <option disabled >--------Razas de Caballos--------</option>
                            {razas.caballos.map((key) => {
                                return <option value={key}>{key}</option>
                            })
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 col col-md-3 mt-auto" controlId="formBasicPassword">
                        <Form.Label>Peso</Form.Label>
                        <Form.Control type="number" placeholder="El peso aproximado de su mascota" name="peso" onChange={handleChange} />
                    </Form.Group>
                </div>
                <div className="row">
                    <Form.Group className="mb-3 col col-md-3 mt-auto" controlId="formBasicPassword" >
                        <Form.Label>Edad</Form.Label>
                        <Form.Control type="number" placeholder="ingrese la edad de su mascota" name="edad" onChange={handleChange} />
                    </Form.Group>

                </div>

                <Button variant="primary" type="submit" className="col-md-3">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Mascota;