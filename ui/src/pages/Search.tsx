import {Avatar, Card, Group, Loader, SimpleGrid, Stack, Text, TextInput, Title} from "@mantine/core";
import {MindMap} from "../components/MindMap";
import {IconSearch} from "@tabler/icons-react";
import {lightYellowColor} from "../theme";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import {useModules} from "../data_access/modules.tsx";
import {useNavigate} from "react-router-dom";
import {toResults} from "../routes";
import {useState} from "react";


function SearchPage() {
    const {isMd} = useUiBreakpoints()
    const {packages, loading} = useModules()
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()

    return (
        <Stack>
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="md"
                style={{ alignItems: 'start' }}
            >
                <MindMap/>
                <Stack justify="center" m={isMd ? 0 : 80} gap={50}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        navigate(toResults(search));
                    }}>
                    <TextInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="lg"
                        radius="xl"
                        rightSection={<IconSearch onClick={() => navigate(toResults(search))} />}
                        placeholder="Search..."
                    />
                    </form>
                    <Card
                        bg={lightYellowColor}
                        p="xl"
                        radius="xl"
                    >
                        <Stack gap={50}>
                            <Title order={3} ta="center" ff="Sixtyfour" fw="normal">Popular Packages</Title>
                            {
                                loading && <Loader/>
                            }
                            <Stack>
                                {
                                    packages.map((p) => (
                                        <Group onClick={() => navigate(toResults(p.name))}>
                                            <Avatar src={`${p.name.toLowerCase()}.png`} alt="sui" w={40} bg="Blue" p={10} size="lg"/>
                                            <Text size="30px" style={{ textTransform: 'capitalize' }}>{p.name}</Text>
                                        </Group>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Card>
                </Stack>
            </SimpleGrid>
        </Stack>
    );
}

export default SearchPage;