import { Axios } from 'axios';
import {Light} from './lifx-api-typings';

const BASE_URL_LIFX_API = 'https://api.lifx.com/v1';

export class LifxApi {
    private axiosInstance: Axios;

    constructor(apiKey: string) {
        this.axiosInstance = new Axios({ baseURL: BASE_URL_LIFX_API, headers: { 'Authorization': `Bearer ${apiKey}` }})
    }

    public async listLights(): Promise<Array<Light>> {
        const res = await this.axiosInstance.get('/lights/all');
        return JSON.parse(res.data);
    }
}
