// Load config
import * as dotenv from 'dotenv';
import {LifxApi} from "./lifx-api/lifx-api";
dotenv.config()

new LifxApi(process.env.LIFX_API_KEY).listLights().then((res) => console.log(res[0]))