// Load config
import * as dotenv from 'dotenv';
import {LifxApi} from "./lifx-api/lifx-api";
import {SelectorAll, SelectorLightId} from "./lifx-api/selectors";
dotenv.config()

const launch = async (): Promise<void> => {
    const lifxApi = new LifxApi(process.env.LIFX_API_KEY);
    const lights = await lifxApi.listLights(new SelectorAll());
    const lightSalon = lights.find((light) => light.group.name === 'Salon');
    console.log(lightSalon);
    await lifxApi.setState(new SelectorAll(), { power: 'off', duration: 1 });
}

launch()