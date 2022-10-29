import axios, { AxiosInstance} from 'axios';
import {Light, PowerState, SetStateResult} from './lifx-api-typings';
import {Selector, SelectorAll} from "./selectors";
import {Color} from "./colors";

const BASE_URL_LIFX_API = 'https://api.lifx.com/v1';

export class LifxApi {
    private axiosInstance: AxiosInstance;

    constructor(apiKey: string) {
        this.axiosInstance = axios.create({ baseURL: BASE_URL_LIFX_API, headers: { 'Authorization': `Bearer ${apiKey}` }})
    }

    public async listLights(selector: Selector): Promise<Array<Light>> {
        const res = await this.axiosInstance.get(`/lights/${selector.getValue()}`);
        return res.data;
    }

    public async setState(selector: Selector, body: { power?: PowerState; color?: Color; brightness?: number; duration?: number; infrared?: number; fast?: boolean }): Promise<{ results: SetStateResult[] }> {
        const rawBody = { ...body, ...body.color ? { color: body.color.getValue() } : {} };
        const res = await this.axiosInstance.put(`/lights/${selector.getValue()}/state`, rawBody);
        return res.data;
    }
}
