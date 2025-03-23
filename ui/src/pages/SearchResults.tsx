import {Avatar, Badge, Card, Group, Loader, SimpleGrid, Stack, Text, TextInput} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {Address} from "../components/Address";
import {ShortNumber} from "../components/ShortNumber.tsx";
import {TimeAgo} from "../components/TimeAgo.tsx";
import {useModules} from "../data_access/modules.tsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {useState} from "react";
import {Module} from "../domains/Module.tsx";
import {getPath, WebRoutes} from "../routes.ts";


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
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [search, setSearch] = useState<string>(queryParams.get("query") || '')

    if (loading || !modules) {
        return <Loader/>
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
                        <Card
                            onClick={() => navigate(getPath(WebRoutes.Module, module.id))}
                            key={i}
                            padding="lg"
                            radius="lg"
                            withBorder
                            style={{
                                borderColor: 'rgb(74,201,255)', // Customize the border color here
                                borderWidth: 2,
                                borderStyle: 'solid',
                                boxShadow: '0 4px 10px rgb(74,201,255)',
                            }}
                        >
                            <Stack gap="lg">
                                <Group>
                                    <Avatar src={`/${module.package}.png`} size="sm"/>
                                    <Text style={{ textTransform: 'capitalize' }}>{module.package}</Text>
                                    <Address address={module.packageId} />
                                </Group>
                                <Group>
                                    <Text fw="bold">Module:</Text>
                                    <Text>{module.module}</Text>
                                </Group>
                                <Text lineClamp={2}>{module.description}</Text>
                                <Group gap="xl">
                                    <Group gap={5}>
                                        <Text fw="bold">Transactions:</Text>
                                        <ShortNumber value={module.metrics.transactions}/>
                                    </Group>
                                    <Group gap={8}>
                                        <Avatar src="/github.png" size="20px"/>
                                        <ShortNumber value={module.metrics.github}/>
                                    </Group>
                                </Group>
                                <Group>
                                    <Text fw="bold">Deployed:</Text>
                                    <TimeAgo date={module.deployedAt}/>
                                </Group>
                                <Group>
                                    <Text fw="bold">Keywords:</Text>
                                    {
                                        module.keywords.map((keyword) => (
                                            <Badge
                                                key={keyword}
                                                c="black"
                                                variant="gradient"
                                                gradient={{ from: 'rgb(74,201,255)', to: 'rgba(129,213,243,0.58)', deg: 90 }}
                                            >
                                                {keyword}
                                            </Badge>
                                        ))
                                    }
                                </Group>
                            </Stack>
                        </Card>
                    ))
                }
            </SimpleGrid>
        </Stack>
    );
}

export default SearchDetailsPage;