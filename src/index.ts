// Load config
import * as dotenv from 'dotenv';
import {LifxApi} from "./adapters/lifx-api";
import {LightsService} from "./services/lights-service";
import {SelectorGroupLabel} from "./constants/selectors";
dotenv.config()

const launch = async (): Promise<void> => {
    const lifxApi = new LifxApi(process.env.LIFX_API_KEY);
    const lightsService = new LightsService(lifxApi);
    await lightsService.morning(new SelectorGroupLabel('Salon'));
    await new Promise((res) => setTimeout(res, 10 * 1000));
    await lightsService.night(new SelectorGroupLabel('Salon'));
    await new Promise((res) => setTimeout(res, 10 * 1000));
    await lightsService.love(new SelectorGroupLabel('Salon'));
    await new Promise((res) => setTimeout(res, 10 * 1000));
    //const turnedOn = await lightsService.turnAllLightsOn();
    //console.log(`Lights turned on : ${turnedOn.join(', ')}`);
    const turnedOff = await lightsService.turnAllLightsOff();
}

launch()