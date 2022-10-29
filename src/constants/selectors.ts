export interface Selector {
    formatSelector: () => string;
}

export class SelectorAll implements Selector {
    formatSelector(): string {
        return 'all';
    }
}

export class SelectorLightId implements Selector {
    constructor(private lightId: string) {}

    formatSelector(): string {
        return `id:${this.lightId}`;
    }
}

export class SelectorGroupLabel implements Selector {
    constructor(private groupLabel: string) {}

    formatSelector(): string {
        return `group:${this.groupLabel}`;
    }
}