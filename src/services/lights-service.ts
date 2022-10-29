import {LifxApi} from '../adapters/lifx-api';
import {Selector, SelectorAll} from "../constants/selectors";
import {AffectedLightsResult, PowerState} from "../adapters/lifx-api-typings";
import {KelvinAndBrightnessColor} from "../constants/colors";

export class LightsService {
    constructor(private lifxApi: LifxApi) {}

    public async turnAllLightsOff(): Promise<void> {
        await this.lifxApi.setState(new SelectorAll(), { power: PowerState.OFF });
    }

    public async turnAllLightsOn(): Promise<void> {
        await this.lifxApi.setState(new SelectorAll(), { power: PowerState.ON });
    }

    public async turnOn(selector: Selector): Promise<void> {
        await this.lifxApi.setState(selector, { power: PowerState.ON });
    }

    public async turnOff(selector: Selector): Promise<void> {
        await this.lifxApi.setState(selector, { power: PowerState.OFF });
    }

    public async clap(selector: Selector): Promise<void> {
        await this.lifxApi.sendPulse(selector, { color: new KelvinAndBrightnessColor(2700, 1), from_color: new KelvinAndBrightnessColor(2700, 0.25), cycles: 5, period: 0.3 });
    }

    public async love(selector: Selector): Promise<void> {
        await this.lifxApi.sendPulse(selector, { color: new KelvinAndBrightnessColor(2500, 0.8), from_color: new KelvinAndBrightnessColor(2000, 0.5), cycles: 3, period: 2 });
    }

    public async signal(selector: Selector): Promise<void> {
        await this.lifxApi.sendPulse(selector, { color: new KelvinAndBrightnessColor(4000, 1), cycles: 5, period: 1 });
    }

    public async morning(selector: Selector): Promise<void> {
        await this.lifxApi.stateDelta(selector, { power: PowerState.OFF });
        await this.lifxApi.stateDelta(selector, { power: PowerState.ON, duration: 3, fast: true });
    }

    public async night(selector: Selector): Promise<void> {
        await this.lifxApi.stateDelta(selector, { power: PowerState.ON });
        await this.lifxApi.stateDelta(selector, { power: PowerState.OFF, duration: 3, fast: true });
    }
}