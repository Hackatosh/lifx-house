export type PowerState = 'on' | 'off';

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

export interface SetStateResult {
    id: string;
    status: 'ok' | string;
    label: string;
}