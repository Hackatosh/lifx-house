import axios, { AxiosInstance } from 'axios';
import {
    Light,
    SetStateBody,
    AffectedLightsResult,
    StateDeltaBody,
    PowerToggleBody,
    EffectsOffBody, SendPulseBody
} from './lifx-api-typings';
import {Selector} from "./selectors";

const BASE_URL_LIFX_API = 'https://api.lifx.com/v1';

export class LifxApi {
    private axiosInstance: AxiosInstance;

    constructor(apiKey: string) {
        this.axiosInstance = axios.create({ baseURL: BASE_URL_LIFX_API, headers: { 'Authorization': `Bearer ${apiKey}` }})
    }

    /*** GET INFORMATIONS ***/

    public async listLights(selector: Selector): Promise<Array<Light>> {
        const res = await this.axiosInstance.get(`/lights/${selector.getValue()}`);
        return res.data;
    }

    /*** STATE MODIFICATIONS ***/

    public async setState(selector: Selector, setStateBody: SetStateBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.put(`/lights/${selector.getValue()}/state`, { ...setStateBody, color: setStateBody.color?.getValue() });
        return res.data;
    }

    public async stateDelta(selector: Selector, stateDeltaBody: StateDeltaBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.getValue()}/state/delta`, stateDeltaBody);
        return res.data;
    }

    public async powerToggle(selector: Selector, powerToggleBody: PowerToggleBody = {}): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.getValue()}/toggle`, powerToggleBody);
        return res.data;
    }

    /*** USE EFFECTS ***/

    public async effectsOff(selector: Selector, effectsOffBody: EffectsOffBody = {}): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.getValue()}/effects/off`, effectsOffBody);
        return res.data;
    }

    public async sendPulse(selector: Selector, sendPulseBody: SendPulseBody): Promise<AffectedLightsResult> {
        const res = await this.axiosInstance.post(`/lights/${selector.getValue()}/effects/pulse`, { ...sendPulseBody, color: sendPulseBody.color?.getValue(), from_color: sendPulseBody.from_color?.getValue() });
        return res.data;
    }
}
