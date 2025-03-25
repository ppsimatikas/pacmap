import {Metrics} from "./Metrics.ts";

export interface Module {
    id?: string
    package: string
    packageId: string
    module: string
    description: string
    metrics: Metrics
    deployedAt: Date
    keywords: string[]
    code: string
    github: string
}
