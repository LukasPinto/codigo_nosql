import Axios from 'axios'
export default function mascotasService(rut){
    return  (Axios.get(`http://localhost:3001/mascota/${rut}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }))
 }