
import Axios from 'axios'

export default function crearHistorialService(id_mascota){

    return (Axios.post(`http://localhost:3001/mascota/historial`, {
            id_mascota:id_mascota
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
    )

}