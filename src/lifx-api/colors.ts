export interface Color {
    getValue: () => string;
}

export class CurrentBulbColor implements Color {
    getValue(): string {
        return 'current bulb color';
    }
}