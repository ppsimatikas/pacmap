import {Avatar, Badge, Card, Group, Loader, Stack, Text, Title} from "@mantine/core";
import {Address} from "../components/Address";
import {ShortNumber} from "../components/ShortNumber";
import {TimeAgo} from "../components/TimeAgo";
import {useModules} from "../data_access/modules";
import { useParams } from 'react-router-dom';
import NoMatch from "./NoMatch";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


function ModulePage() {
    const { modules, loading } = useModules();
    const { id } = useParams();
    const { isSm } = useUiBreakpoints();

    if (loading || !modules) {
        return <Loader/>
    }

    const module = modules.find((module) => module.id === id);

    if (!module) {
        return <NoMatch/>
    }

    return (
        <Stack mt={50} gap={50}>
            <Title ta="center" style={{ textTransform: 'capitalize' }}>{module.module} by {module.package}</Title>
            <Group gap={70}>
                <Card
                    m="auto"
                    w={isSm ? "100%" : "auto"}
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
                <Text flex={1}>{module.description}</Text>
            </Group>
            <Stack mt={30}>
                <Title order={2} ff="Sixtyfour" fw="normal">Module Code</Title>
                <SyntaxHighlighter language="rust" style={materialDark}>
                    {module.code.trim()}
                </SyntaxHighlighter>
            </Stack>
        </Stack>
    );
}

export default ModulePage;