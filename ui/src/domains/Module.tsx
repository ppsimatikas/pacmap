import {Metrics} from "./Metrics";

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
}
