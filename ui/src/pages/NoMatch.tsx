import {Center, Stack, Text, Title} from "@mantine/core";

function NoMatch() {
    return (
        <Center>
            <Stack ta="center" mt={50}>
                <Title>Page Not Found</Title>
                <Text>
                    The specified page was not found on this website.
                    <br/>
                    Please check the URL for mistakes and try again.
                </Text>
            </Stack>
        </Center>
    );
}

export default NoMatch;
