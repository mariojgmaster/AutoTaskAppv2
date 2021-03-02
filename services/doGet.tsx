import axios from 'axios';
import Api from '../services/api'

let DoGet = async (route) => {
    let data;

    await axios.get(`${Api.EndPoint.URL}/${route}`)
    .then(res => data = res.data)
    .catch(err => (data=undefined, console.error(`Erro ao trazer dados (Get Method): ${err}`)))
    console.log('data from doGet');
    console.log(data);
    return (data)
}

export default DoGet;
