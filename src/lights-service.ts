import {LifxApi} from './lifx-api/lifx-api';
import {SelectorAll} from "./lifx-api/selectors";
import {PowerState} from "./lifx-api/lifx-api-typings";

export class LightsService {
    constructor(private lifxApi: LifxApi) {}

    public async turnAllLightsOff(): Promise<string[]> {
        const lightsTurnedOff = await this.lifxApi.setState(new SelectorAll(), { power: PowerState.OFF });
        return lightsTurnedOff.results.map((light) => light.label);
    }

    public async turnAllLightsOn(): Promise<string[]> {
        const lightsTurnedOn = await this.lifxApi.setState(new SelectorAll(), { power: PowerState.ON });
        return lightsTurnedOn.results.map((light) => light.label);
    }
}