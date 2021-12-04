import Axios from 'axios'

export default function crearFichaService(fecha,id_mascota,horario,id_historial){
    
    return (Axios.post(`http://localhost:3001/mascota/agendar`, {
    fecha: fecha,
    id_mascota: id_mascota,
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