import {Divider, Stack, Text} from "@mantine/core";


function Footer() {
    return (
        <Stack my={15} ta="center">
            <Divider/>
            <Text fw="bold" size="sm" c="gray">&copy; 2025 PacMap All rights reserved.</Text>
        </Stack>
    );
}

export default Footer;

