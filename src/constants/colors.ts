export interface Color {
    formatColor: () => string;
}

export class KelvinAndBrightnessColor implements Color {
    constructor(private kelvin: number, private brightness: number) {}

    formatColor(): string {
        return `kelvin:${this.kelvin} brightness:${this.brightness}`;
    }
}