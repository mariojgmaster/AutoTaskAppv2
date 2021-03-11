import axios from 'axios';
import Api from '../services/api'

let DoPost = async (route, payload) => {
    let res = await axios.post(`${Api.EndPoint.URL}/${route}`, payload);
    let data = res.data
    console.log('payload / data from doPost');
    console.log(payload);
    console.log(data);
    return (data)
}

export default DoPost;
