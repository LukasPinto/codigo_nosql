import { UserContext } from '../context/userContext'
import { Form } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
import FormularioMascota from './formularioMascota';
import mascotasService from '../services/listadoMascota.service';
import crearHistorialService from '../services/crearHistorial.service';
import crearFichaService from '../services/crearFicha.service';
const Agendarhora = () => {
    const { userState } = useContext(UserContext)
    const [mascotas, setMascotas] = useState([])
    const [mostrar, setMostrar] = useState(false)
    const [mascotaSelect, setMascotaSelect] = useState([])
    const [fecha, setFecha] = useState()
    const [horario, setHorario] = useState()
    const [fechaSelect, setFechaSelect] = useState()
    const [actualizar, setActualizar] = useState(true)
    const [traerDatos, setTraerDatos] = useState(true)
    useEffect(() => {
        mascotasService(userState._id)
            .then((Response) => {
                console.log(Response)
                setMascotas(Response.data)
                setActualizar(!actualizar)
            }).
            catch(() => {
                alert("error")
            })
    }, [traerDatos])

    /*     useEffect(() => {
            for (const mascota of mascotas) {
                console.log(mascota.id_historial)
                if (mascota.id_historial === null) {
                    crearHistorialService(mascota.id_mascota).then((Response) => {
                        console.log(Response)
                        setTraerDatos(!traerDatos)
                    }).catch(()=>{
                        alert("error")
                    })
                }
            }
        }, [actualizar]) */
    const handleChangeHorario = async (e) => {
        await setHorario(e.target.value)

    }
    const handleChangeFecha = async (e) => {
        await setFechaSelect(e)
        await setFecha(JSON.stringify(e).substring(1, 11).replace(/\//g, "-"))
        console.log(e)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        crearFichaService(fecha,horario, mascotaSelect.id_historial,mascotaSelect._id)
            .then((Response) => {
                console.log(Response)
                if (Response.data.message) {
                    alert("error")
                }
                else {
                    alert("Hora reservada")
                }
            })

            .catch(() => {
                alert("error")
            })
    }
    const handleSelect = (e) => {
        e.preventDefault();
        if (e.target.value === "false") {
            setMostrar(false)
        }
        else {
            setMostrar(true)
            for (const mascota of mascotas) {
                if (mascota.nombre_mascota === e.target.value) {
                    setMascotaSelect(mascota)
                }
            }
        }
    }
    return (
        <div >
            <h1 className="row justify-content-center">Datos del dueño</h1>
            <Form  >
                <div className="row justify-content-center">
                    <Form.Group className="mb-3 col col-md-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" readOnly defaultValue={userState.correo} name="email" />
                    </Form.Group>
                    <Form.Group className="mb-3 col col-md-3" controlId="formBasicPassword">
                        <Form.Label>Rut</Form.Label>
                        <Form.Control type="number" readOnly defaultValue={userState.rut} name="rut" />
                    </Form.Group>
                </div>
                <h1 className="row justify-content-center">Mascota</h1>
                <div className="row justify-content-center" >
                    <Form.Group className="mb-3 col col-md-3 mt-auto" controlId="formBasicPassword">
                        <Form.Label>Seleccione su mascota</Form.Label>
                        <Form.Select aria-label="Default select example" name="especie" onClick={handleSelect} >
                            <option value="false">Debes seleccionar una mascota</option>
                            {mascotas.map((key, value) => {
                                return <option value={key.nombre_mascota} key={value}>{key.nombre_mascota}</option>
                            })
                            }
                        </Form.Select>
                    </Form.Group>
                </div>

            </Form>
            {mostrar ? (<><FormularioMascota Submit={handleSubmit} ChangeHorario={handleChangeHorario} ChangeFecha={handleChangeFecha} fecha={fechaSelect} setFecha={setFechaSelect} mascota={mascotaSelect} /></>
            ) : (<div hidden> </div>)}


        </div>
    );
};

export default Agendarhora;