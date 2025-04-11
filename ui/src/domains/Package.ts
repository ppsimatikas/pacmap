import {Metrics} from "./Metrics.ts";

export interface Package {
    id: string
    name: string
    metrics: Metrics
    linkedPackages: string[]
}
