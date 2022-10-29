export interface Selector {
    getValue: () => string;
}

export class SelectorAll implements Selector {
    getValue(): string {
        return 'all';
    }
}

export class SelectorLightId implements Selector {
    constructor(private lightId: string) {}

    getValue(): string {
        return `id:${this.lightId}`;
    }
}

export class SelectorGroupLabel implements Selector {
    constructor(private groupLabel: string) {}

    getValue(): string {
        return `group:${this.groupLabel}`;
    }
}