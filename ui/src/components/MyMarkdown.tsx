import {Text, Title, TypographyStylesProvider} from "@mantine/core";
import Markdown from "react-markdown";

export default function MyMarkdown({ size, children }: { size?: string, children: string }) {
    const h1Order = size === "sm" ? 4 : 3
    const h2Order = h1Order + 1 as 5 | 4

    return (
        <TypographyStylesProvider>
            <Markdown
                components={{
                    p: ({ node, ref, ...props }) => <Text size={size || "lg"} {...props}/>,
                    h1: ({ node, ref, ...props }) => <Title order={h1Order} {...props}/>,
                    h2: ({ node, ref, ...props }) => <Title order={h2Order} {...props}/>,
                }}
            >
                {children.trim()}
            </Markdown>
        </TypographyStylesProvider>
    )
}