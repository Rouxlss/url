import axios from 'axios'

const urlApi = axios.create({
    baseURL: 'https://url-shortener-rouxls.herokuapp.com/api'
})

export default urlApi;
