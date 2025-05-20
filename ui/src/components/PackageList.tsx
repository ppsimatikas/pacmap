import {Avatar, Card, Group, Loader, Stack, Text, TextInput, Title} from "@mantine/core";
import {IconSearch} from "@tabler/icons-react";
import {lightYellowColor} from "../theme";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints";
import {useModules} from "../data_access/modules";
import {useNavigate} from "react-router-dom";
import {toResults} from "../routes";
import {useState} from "react";
import {shortAddress} from "../components/Address";
import {PACKAGE_COLORS} from "../utils/colors";
import {getPackageIcon} from "../domains/Package.ts";


function PackageList() {
    const {isMd} = useUiBreakpoints()
    const {packages, loading} = useModules()
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()

    return (
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
                <Stack gap={30}>
                    <Title order={3} ta="center" ff="Sixtyfour" fw="normal">Popular Packages</Title>
                    {
                        loading && <Loader/>
                    }
                    <Stack>
                        {
                            packages.map((p, i) => (
                                <Group key={i} onClick={() => navigate(toResults(p.name))}>
                                    <Avatar src={getPackageIcon(p)} alt="sui"
                                            bg={PACKAGE_COLORS[p.name.toLowerCase()] || "blue"}
                                            p={5} size="md"
                                    />
                                    <Text size="20px" style={{ textTransform: 'capitalize' }}>{shortAddress(p.name)}</Text>
                                </Group>
                            ))
                        }
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}

export default PackageList;