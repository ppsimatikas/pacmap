import ChatInput from "./chat/chatinput";
import LoadingDots from "./chat/loadingDots";
import {useState} from "react";
import {Avatar, Box, Button, Group, Image, Stack, Text} from "@mantine/core";
import {post} from "../data_access/api";
import MyMarkdown from "./MyMarkdown";
import {useModules} from "../data_access/modules.tsx";
import ModuleCard from "./ModuleCard.tsx";

export function Chat({
    title,
}: any) {
    const {modules} = useModules();
    const [messages, setMessages] = useState<any[]>([]);
    const [textLoaded] = useState(true);
    const [loading, setLoading] = useState(false);

    const postMessage = (message: any) => {
        setMessages((prevMessages: any) => [...prevMessages, {message, ai: false}]);
        setLoading(true);
        return post("https://chat-qxyz73gijq-ew.a.run.app", "", {}, {message})
            .then((res: any) => {
                setMessages((prevMessages: any) => [...prevMessages, {
                    ...res,
                    ai: true
                }]);
            })
            .catch(() => setMessages((prevMessages: any) => [...prevMessages, {
                message: "An error occurred. Please try again later.",
                ai: true
            }]))
            .finally(() => setLoading(false))
    };

    const defaultPrompt = "What is the best package to store order books?";
    const renderWelcome = () => (
        <Stack flex={1} justify="center" ta='center'>
            <Stack flex={1} justify="center">
                <Image src="/mappy.png" w={90} mx="auto"/>
                <Text>{title}</Text>
            </Stack>
            <Stack>
                <i>"{defaultPrompt}"</i>
                <Button
                    size="md"
                    maw={500}
                    m="auto"
                    radius="lg"
                    onClick={() => postMessage(defaultPrompt)}
                >
                    Let's chat !
                </Button>
            </Stack>
        </Stack>
    );

    const renderMessages = () => {
        return (
            <Stack
                h="100%"
                w="100%"
                style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    flexDirection: "column-reverse"
                }}
            >
                {
                    loading &&
                    <Group>
                        <Image src="/mappy.png" w={28}/>
                        <LoadingDots/>
                    </Group>
                }
                {
                    [...messages].reverse().map(renderMessage)
                }
            </Stack>
        );
    };

    const renderMessage = (m: any, i: number) => {
        return (
            <Group key={i}>
                <Group wrap="nowrap" align="flex-start">
                    {
                        m.ai ? <Image src="/mappy.png" w={28}/> : <Avatar/>
                    }
                    <Stack>
                        <Text pt={5}>
                            <MyMarkdown>{m.message?.trim()}</MyMarkdown>
                        </Text>
                        <Group wrap="nowrap">
                        {
                            modules?.filter((m1) => (m.modules || []).indexOf(m1.id) !== -1).map((mod, i) => (
                                <ModuleCard key={i} module={mod} maw={350}/>
                            ))
                        }
                        </Group>
                    </Stack>
                </Group>
                {
                    (textLoaded || i !== 0) &&
                    <Group>
                        <Box w={40}/>
                    </Group>
                }
            </Group>
        );
    };

    return (
        <Stack h="calc(100vh - 140px)">
            {!messages.length && renderWelcome()}
            {messages.length > 0 && renderMessages()}
            <ChatInput onAsk={postMessage} disabled={loading}/>
        </Stack>
    );
}
