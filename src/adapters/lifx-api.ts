import axios, { AxiosInstance } from 'axios';
import {
    Light,
    SetStateBody,
    AffectedLightsResult,
    StateDeltaBody,
    SendPulseBody
} from './lifx-api-typings';
import {Selector} from "../constants/selectors";

const BASE_URL_LIFX_API = 'https://api.lifx.com/v1';

export class LifxApi {
    private axiosInstance: AxiosInstance;

    constructor(apiKey: string) {
        this.axiosInstance = axios.create({ baseURL: BASE_URL_LIFX_API, headers: { 'Authorization': `Bearer ${apiKey}` }})
    }

    /*** GET INFORMATIONS ***/

    public async listLights(selector: Selector): Promise<Array<Light>> {
        const res = await this.axiosInstance.get(`/lights/${selector.formatSelector()}`);
        return res.data;
    }

    /*** STATE MODIFICATIONS ***/

    public async setState(selector: Selector, setStateBody: SetStateBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.put(`/lights/${selector.formatSelector()}/state`, { ...setStateBody, color: setStateBody.color?.formatColor() });
        return res.data;
    }

    public async stateDelta(selector: Selector, stateDeltaBody: StateDeltaBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.formatSelector()}/state/delta`, stateDeltaBody);
        return res.data;
    }

    /*** USE EFFECTS ***/

    public async sendPulse(selector: Selector, sendPulseBody: SendPulseBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.formatSelector()}/effects/pulse`, { ...sendPulseBody, color: sendPulseBody.color?.formatColor(), from_color: sendPulseBody.from_color?.formatColor() });
        return res.data;
    }
}
