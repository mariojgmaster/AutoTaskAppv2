import axios from 'axios';
import Api from '../services/api'

let DoPut = async (id, route, payload) => {
    let res = await axios.put(`${Api.EndPoint.URL}/${route}/${id}`, payload);
    let data = res.data
    console.log('payload / data from doPut');
    console.log(payload);
    console.log(data);
}

export default DoPut;
