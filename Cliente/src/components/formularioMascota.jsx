import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker"
import horarios from "../horarios.json"


function FormularioMascota(props) {


    const [startDate] = useState(new Date())
    return (    
        <>
         <Form onSubmit={props.Submit}>
        <div className="row justify-content-center">
         
            <Form.Group className="mb-3 col col-md-3 mt-auto">
                <Form.Label>Nombre Mascota</Form.Label>
                <Form.Control type="number" placeholder={props.mascota.nombre_mascota} name="edad" readOnly />
            </Form.Group>
            <Form.Group className="mb-3 col col-md-3 mt-auto">
                <Form.Label>Especie</Form.Label>
                <Form.Control type="number" placeholder={props.mascota.especie} name="edad" readOnly />
            </Form.Group>
        </div>
            <div className="row justify-content-center">

                <Form.Group className="mb-3 col col-md-3 mt-auto">
                    <Form.Label>Raza</Form.Label>
                    <Form.Control type="number" placeholder={props.mascota.raza} name="edad" readOnly />
                </Form.Group>
                <Form.Group className="mb-3 col col-md-3 mt-auto">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="number" placeholder={props.mascota.peso} name="edad" readOnly />
                </Form.Group>
            </div>
            <div className="row justify-content-center">

                <Form.Group className="mb-3 col col-md-3 mt-auto">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control type="number" placeholder={props.mascota.edad} name="edad" readOnly />
                </Form.Group>
                <Form.Group className="mb-3 col col-md-2 mt-auto ">
                    <Form.Label>Fecha de la consulta</Form.Label>
                    <DatePicker className=" rounded pb-1 pt-1 text-center col " minDate={startDate} selected={props.fecha} onChange={props.ChangeFecha} name="fecha" dateFormat="dd-MM-yyyy" />
                </Form.Group>
                <Form.Group className="mb-3 col col-md-2 mt-auto " >
                    <Form.Label>Seleccione su mascota</Form.Label>
                    <Form.Select aria-label="Default select example" name="horario" onChange={props.ChangeHorario}  >
                        <option value="false">Hora de atencion</option>
                        {horarios.map((key,value) => {
                            return <option value={key} key={value}>{key}</option>
                        })
                        }
                    </Form.Select>
                </Form.Group>
                <div className="row justify-content-center">
                    <Button variant="primary" type="submit" className="col-md-3">
                        Submit
                    </Button>
                </div>
            </div>
            </Form>
        </>
    );
}

export default FormularioMascota;