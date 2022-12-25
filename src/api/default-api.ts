import axios, {AxiosResponse} from 'axios';

const url = process.env.REACT_APP_BASE_URL

export let instance = axios.create({

    baseURL:'https://nest12.onrender.com/',
    // baseURL: url,
    headers: {
        // 'Authorization': 'Basic YWRtaW46cXdlcnR5'
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
    }
})

// api
export const defaultAPI = {

    getDevices() {
        return instance.get<{}, AxiosResponse<DefaultResponseType>>('/security/devices',{withCredentials: true})
    },
    removeDevices() {
        return instance.delete('/security/devices')
    },
    removeSomeDevice(deviceId:string) {
        return instance.delete( `security/devices/${deviceId}`)
    },

}
// types


export type DefaultResponseType = {
    ip: string,
    title:string,
    lastActiveDate:string,
    deviceId:string,
}