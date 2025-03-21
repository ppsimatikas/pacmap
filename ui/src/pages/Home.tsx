import {Button, Center, Group, Image, Stack, Text, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {WebRoutes} from "../routes.ts";
import {lightYellowColor} from "../theme.ts";
import {useUiBreakpoints} from "../utils/use-ui-breakpoints.ts";

function Home() {
    const { isSm } = useUiBreakpoints()
    return (
        <Stack mt={40}>
            <Stack gap={0} ta="center">
                <Title ff="Sixtyfour" c="blue" fw="normal">Accelerate Development</Title>
                <Title ff="Sixtyfour" c="blue" fw="normal">on Sui</Title>
            </Stack>
            <Center my={30}>
                <Text size="23px" ff="Space Grotesk" maw={633} ta="center">
                    Explore our powerful platform designed for Sui programmers, where you can easily map and manage code
                    packages for better and faster dapp development.
                </Text>
            </Center>
            <Stack bg={lightYellowColor} p={40} ta={isSm ? "center" : undefined}>
                <Stack gap={100} maw={900} m="auto">
                    <Group justify={isSm ? "center" : "space-between"}>
                        { isSm && <Image src="pc.png" alt="pc" w="60%" m="auto"/>}
                        <Stack maw={400} gap="lg">
                            <Stack gap={0}>
                                <Title order={2} ff="Sixtyfour" fw="normal">Package</Title>
                                <Title order={2} ff="Sixtyfour" fw="normal">Search</Title>
                            </Stack>
                            <Text size="20px" ff="Space Grotesk" c="gray">
                                Streamline your programming tasks with our repository showcase. Discover the ultimate
                                solution for code management and collaboration.
                            </Text>
                            <Button component={Link} to={WebRoutes.Search} w={150} m={isSm ? "auto" : undefined}>
                                Search
                            </Button>
                        </Stack>
                        { !isSm && <Image src="pc.png" alt="pc" w="30%"/> }
                    </Group>
                    <Group justify={isSm ? "center" : "space-between"}>
                        <Image src="mappy.png" alt="mappy" w={isSm ? "40%" : "20%"} m={isSm ? "auto" : undefined}/>
                        <Stack maw={400} gap="lg">
                            <Stack gap={0}>
                                <Title order={2} ff="Sixtyfour" fw="normal">Ask</Title>
                                <Title order={2} ff="Sixtyfour" fw="normal">Mappy</Title>
                            </Stack>
                            <Text size="20px" ff="Space Grotesk" c="gray">
                                Elevate your programming experience with our Pacmap Agent, Mappy. Unlock new levels of
                                efficiency and productivity as you navigate the dynamic world of code packages.
                            </Text>
                            <Button component={Link} to={WebRoutes.Mappy} w={150} m={isSm ? "auto" : undefined}>
                                Chat with Mappy
                            </Button>
                        </Stack>
                    </Group>
                </Stack>
            </Stack>
            <Stack gap={0} ta="center" my={50}>
                <Title ff="Sixtyfour" fw="normal">Transformative</Title>
                <Title ff="Sixtyfour" fw="normal">Package Management Experience</Title>
            </Stack>
            <Image src="bg3.png" alt="Coming soon" w="100%"/>
        </Stack>
    );
}

export default Home;