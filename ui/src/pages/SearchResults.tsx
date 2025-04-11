import {Center, Group, Loader, SimpleGrid, Stack, Text, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {useModules} from "../data_access/modules";
import {useLocation} from 'react-router-dom';
import {useState} from "react";
import {Module} from "../domains/Module";
import ModuleCard from "../components/ModuleCard";


function matchScore(search: string, module: Module): number {
    let score = 0

    search.toLowerCase().split(" ").forEach((s) => {
        if (module.package.toLowerCase().indexOf(s) > -1) {
            score += 1;
        }
        if (module.packageId.toLowerCase().indexOf(s) > -1) {
            score += 1;
        }
        if (module.module.toLowerCase().indexOf(s) > -1) {
            score += 1;
        }
        if (module.description.toLowerCase().indexOf(s) > -1) {
            score += 1;
        }

        module.keywords.forEach((k) => {
            if (k.toLowerCase().indexOf(s) > -1) {
                score += 1;
            }
        })
    });

    return score;
}


function SearchDetailsPage() {
    const { modules, loading } = useModules();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [search, setSearch] = useState<string>(queryParams.get("query") || '')

    if (loading || !modules) {
        return (
            <Center m={100}>
                <Loader/>
            </Center>
        )
    }

    const filtered = modules
        .map((item) => ({
            item,
            relevance: matchScore(search, item),
        }))
        .filter(result => result.relevance > 0)
        .sort((a, b) => b.relevance - a.relevance)
        .map(result => result.item);

    const uniquePackages = [...new Set(filtered.map((m) => m.package))]

    return (
        <Stack mt={50}>
            <TextInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                m="auto"
                size="lg"
                radius="xl"
                rightSection={<IconSearch/>}
                placeholder="Search..."
                w="70%"
            />
            <Group m="auto">
                <Text>{uniquePackages.length} packages found</Text>
                <Text>{filtered.length} modules found</Text>
            </Group>

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="md"
                style={{ alignItems: 'start' }}
            >
                {
                    filtered.map((module, i) => (
                        <ModuleCard  key={i} module={module} />
                    ))
                }
            </SimpleGrid>
        </Stack>
    );
}

export default SearchDetailsPage;