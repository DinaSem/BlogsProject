import axios, {AxiosResponse} from 'axios';

const url = process.env.REACT_APP_BASE_URL

export let instance = axios.create({

    baseURL:'https://nest-test-blog4412.vercel.app/',
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
        return instance.delete('/security/devices',{withCredentials: true})
    },
    removeSomeDevice(deviceId:string) {
        return instance.delete( `security/devices/${deviceId}`,{withCredentials: true})
    },

}
// types


export type DefaultType = {
    ip: string,
    title:string,
    lastActiveDate:string,
    deviceId:string,
}
export type DefaultResponseType = DefaultType[]
