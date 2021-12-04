import React, { useState ,useContext} from 'react';
import { Form, Row, Col } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { UserContext } from '../context/userContext';
import loginService from '../services/login.service'
const InicioSesion = () => {
const history=useHistory()
const [body,setBody] = 
useState( { 
  correo:'',
  clave:''
} );
const {userState,setUserState}=useContext(UserContext)
const handleSubmit = (e)=>{
  e.preventDefault();
  console.log(body.correo,body.clave)
  const correo= body.correo
  const clave =body.clave
  loginService({correo,clave}).then((response)=>{
    if(response.data.error){
      alert(response.data.error)
    }else{

      localStorage.setItem("token",response.data.token)
      
      setUserState({
        correo:response.data.correo,
        rut:response.data.rut,
        _id:response.data._id,
        estado:true
      })
      
      history.push('/')
    }
    //history.push("/Inicio")
  }).catch=(error)=>{
    console.log(error)
  }
}
const handleChange =async (e)=>{
     await setBody({
      ...body,
      [e.target.name]: e.target.value
    })
    console.log(body.correo,body.clave)
  }
return ( 
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control  type="email" name="correo" placeholder="ejemplo@homtail.com" value={body.correo} onChange={handleChange}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3"  controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" name="clave" value={body.clave} onChange={handleChange}/>
          </Col>
        </Form.Group>
        <button className="btn btn-primary btn-lg" type="submit" >iniciar Sesion</button>
      </Form>
     
    </React.Fragment>
  );
};


export default InicioSesion;