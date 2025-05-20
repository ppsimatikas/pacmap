import {Metrics} from "./Metrics.ts";

export interface Package {
    id: string
    name: string
    metrics: Metrics
    linkedPackages: string[]
    icon?: string
}

export function getPackageIcon(p: Package) {
    if (p.icon) {
        return p.icon;
    }

    return p.name === p.id ? `/module.svg` : `/${p.name.toLowerCase()}.png`;
}
