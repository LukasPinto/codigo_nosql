import Axios from 'axios'
export default function mascotasService(id){
    return  (Axios.get(`http://localhost:3001/mascota/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    }))
 }