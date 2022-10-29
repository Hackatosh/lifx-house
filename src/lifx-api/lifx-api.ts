import axios, { AxiosInstance} from 'axios';
import {Light, PowerState, SetStateBody, SetStateResult} from './lifx-api-typings';
import {Selector, SelectorAll} from "./selectors";
import {Color} from "./colors";

const BASE_URL_LIFX_API = 'https://api.lifx.com/v1';

export class LifxApi {
    private axiosInstance: AxiosInstance;

    constructor(apiKey: string) {
        this.axiosInstance = axios.create({ baseURL: BASE_URL_LIFX_API, headers: { 'Authorization': `Bearer ${apiKey}` }})
    }

    private formatSetStateBody(setStateBody: SetStateBody): Omit<SetStateBody, 'color'> & { color?: string } {
        return { ...setStateBody, color: setStateBody.color?.getValue() };
    }

    public async listLights(selector: Selector): Promise<Array<Light>> {
        const res = await this.axiosInstance.get(`/lights/${selector.getValue()}`);
        return res.data;
    }

    public async setState(selector: Selector, setStateBody: SetStateBody): Promise<{ results: SetStateResult[] }> {
        const res = await this.axiosInstance.put(`/lights/${selector.getValue()}/state`, this.formatSetStateBody(setStateBody));
        return res.data;
    }
}
