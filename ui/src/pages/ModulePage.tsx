import {Loader, Stack, Title, Box, Center, Group} from "@mantine/core";
import {useModules} from "../data_access/modules";
import {useParams} from 'react-router-dom';
import NoMatch from "./NoMatch";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {materialDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import MyMarkdown from "../components/MyMarkdown";
import ModuleCard from "../components/ModuleCard";
import {shortAddress} from "../components/Address";


function ModulePage() {
    const {modules, loading} = useModules();
    const {id} = useParams();
    const {isSm, isMd} = useUiBreakpoints();

    if (loading || !modules) {
        return (
            <Center m={100}>
                <Loader/>
            </Center>
        )
    }

    const module = modules.find((module) => module.id === id);

    if (!module) {
        return <NoMatch/>
    }

    return (
        <Stack mt={50} gap={50}>
            <Title ta="center" style={{textTransform: 'capitalize'}}>{module.module} by {shortAddress(module.package)}</Title>
            <Group wrap={isMd ? undefined: "nowrap"} gap="xl">
                <Box
                    m="auto"
                    w={isSm ? "100%" : "auto"}
                >
                    <ModuleCard
                        module={module}
                        withDescription={false}
                        withClick={false}
                    />
                </Box>
                <MyMarkdown>{module.description}</MyMarkdown>
            </Group>
            <Stack>
                <Title order={2}>More Details:</Title>
                <MyMarkdown>{module.longDescription}</MyMarkdown>
            </Stack>
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