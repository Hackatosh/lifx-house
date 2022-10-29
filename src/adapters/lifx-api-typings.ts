import {Color} from "../constants/colors";

export enum PowerState {
    ON = 'on',
    OFF = 'off',
}

export interface Light {
    id: string;
    uuid: string;
    label: string;
    connected: boolean;
    power: PowerState;
    color: {
        hue: number;
        saturation: number;
        kelvin: number;
    };
    brightness: number;
    group: {
        id: string;
        name: string;
    };
    location: {
        id: string;
        name: string;
    };
    product: {
        name: string;
        identifier: string;
        company: string;
        vendor_id: number;
        product_id: number;
        capabilities: {
            has_color: boolean;
            has_variable_color_temp: boolean;
            has_ir: boolean;
            has_hev: boolean;
            has_chain: boolean;
            has_matrix: boolean;
            has_multizone: boolean;
            min_kelvin: number;
            max_kelvin: number;
        }
    };
    last_seen: string; // ISO String
    seconds_since_seen: number;
}

export interface SetStateBody {
    power?: PowerState;
    color?: Color;
    brightness?: number;
    duration?: number;
    infrared?: number; // Not supported by current lights
    fast?: boolean;
}

export interface AffectedLightsResult {
    results: Array<{
        id: string;
        status: 'ok' | string;
        label: string;
    }>
}

export interface StateDeltaBody {
    power?: PowerState;
    duration?: number;
    infrared?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    kelvin?: string;
    fast?: boolean
}

export interface SendPulseBody {
    color: Color;
    from_color?: Color;
    period?: number;
    cycles?: number;
    persist?: boolean;
    power_on?: boolean;
}
