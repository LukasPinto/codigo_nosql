import Axios from 'axios'

export default function crearFichaService(fecha,horario,id_historial,id_mascota){
    
    return (Axios.post(`http://localhost:3001/mascota/agendar`, {
    id_mascota:id_mascota,
    fecha: fecha,
    horario: horario,
    id_historial: id_historial
}
    , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    })
    )
}