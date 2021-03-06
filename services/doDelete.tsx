import axios from 'axios';
import Api from '../services/api'

let DoDelete = async (id, route) => {
    let res = await axios.delete(`${Api.EndPoint.URL}/${route}/${id}`);
    let data = res.data
    console.log('data from doDelete');
    console.log(data);
}

export default DoDelete;
