import {Module} from "../domains/Module";
import {useQuery} from "@tanstack/react-query";
import {Package} from "../domains/Package";
import {getItems} from "../utils/firestore";

function getPackages(modules: Module[]): Package[] {
    const dict = modules.reduce((acc: any, curr: any) => {
        const pkg = curr.packageId;
        if (!acc[pkg]) {
            acc[pkg] = {
                name: curr.package,
                linkedPackages: curr.linkedPackages,
                transactions: 0,
                github: 0,
            };
        }
        acc[pkg].transactions += curr.metrics.transactions;
        acc[pkg].github += curr.metrics.github;
        return acc;
    }, {});

    return Object.keys(dict).map((id: string) => ({
        id,
        name: dict[id].name,
        linkedPackages: dict[id].linkedPackages,
        metrics: {
            transactions: dict[id].transactions,
            github: dict[id].github,
        }
    }));
}

export function useModules() {
    const {data: modules, isLoading} = useQuery({
        queryKey: ['modules'],
        queryFn: async () => getItems("modules"),
        staleTime: 60 * 1000,
    });

    const packages = modules ? getPackages(modules) : [];

    return {
        modules,
        packages,
        loading: isLoading
    }
}
