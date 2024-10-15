import axios from "axios";

export const $migaikApi = axios.create({
    baseURL: 'https://study.miigaik.ru/api/'
})

