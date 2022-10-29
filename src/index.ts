// Load config
import * as dotenv from 'dotenv';
import {LifxApi} from "./lifx-api/lifx-api";
import {LightsService} from "./lights-service";
dotenv.config()

const launch = async (): Promise<void> => {
    const lifxApi = new LifxApi(process.env.LIFX_API_KEY);
    const lightsService = new LightsService(lifxApi);
    const turnedOn = await lightsService.turnAllLightsOn();
    console.log(`Lights turned on : ${turnedOn.join(', ')}`);
    await new Promise((res) => setTimeout(res, 15 * 1000));
    const turnedOff = await lightsService.turnAllLightsOff();
    console.log(`Lights turned off : ${turnedOff.join(', ')}`);
}

launch()