import {ActionIcon, Box, CopyButton, Group, Text, Tooltip} from "@mantine/core";
import {IconCheck, IconCopy} from "@tabler/icons-react";

export function shortAddress(str: string): string {
    if (str.length <= 8) return str; // Nothing to shorten
    return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

export function Address({
    address
}: {
    address: string
}) {
    return (
        <Group>
            <Text>{shortAddress(address)}</Text>
            <Box onClick={(e) => e.stopPropagation()}>
                <CopyButton value={address} timeout={2000}>
                    {({ copied, copy }) => (
                        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                            <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
                                {copied ? <IconCheck size={20} /> : <IconCopy size={20} />}
                            </ActionIcon>
                        </Tooltip>
                    )}
                </CopyButton>
            </Box>
        </Group>
    )
}