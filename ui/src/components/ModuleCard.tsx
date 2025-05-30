import {Module} from "../domains/Module";
import {Avatar, Badge, Box, Card, Group, Stack, Text} from "@mantine/core";
import {Address} from "./Address.tsx";
import {ShortNumber} from "./ShortNumber";
import {TimeAgo} from "./TimeAgo";
import MyMarkdown from "./MyMarkdown";
import {Link, useNavigate} from "react-router-dom";
import {getPath, WebRoutes} from "../routes";
import {PACKAGE_COLORS} from "../utils/colors.ts";
import {getPackages} from "../data_access/modules.tsx";
import {getPackageIcon} from "../domains/Package.ts";

export default function ModuleCard({
    module,
    withClick = true,
    withDescription = true,
    maw,
}: {
    module: Module
    withClick?: boolean
    withDescription?: boolean
    maw?: number
}) {
    const navigate = useNavigate();
    const p = getPackages([module]).pop()
    const hasPackageName = module.package !== module.packageId
    return (
        <Card
            miw={350}
            maw={maw}
            onClick={() => withClick ? navigate(getPath(WebRoutes.Module, module.id)) : null}
            padding="lg"
            radius="lg"
            withBorder
            style={{
                borderColor: 'rgb(74,201,255)',
                borderWidth: 2,
                borderStyle: 'solid',
                boxShadow: '0 4px 10px rgb(74,201,255)',
            }}
        >
            <Stack gap="lg">
                <Group>
                    <Avatar
                        src={p ? getPackageIcon(p) : "/module.svg"}
                        size="sm"
                        bg={PACKAGE_COLORS[module.package.toLowerCase()] || 'rgb(74,201,255)'}
                        p={hasPackageName ? 5 : 2}
                    />
                    { hasPackageName && <Text style={{ textTransform: 'capitalize' }}>{module.package}</Text>}
                    <Address address={module.packageId} />
                </Group>
                <Group>
                    <Text fw="bold">Module:</Text>
                    <Text>{module.module}</Text>
                </Group>
                {
                    withDescription && <Box p={10} h={100} style={{
                        overflow: 'scroll',
                        borderRadius: '10px',
                        border: '1px solid rgb(74,201,255)',
                    }}>
                        <MyMarkdown size="sm">{module.description}</MyMarkdown>
                    </Box>
                }
                <Group gap="xl">
                    <Group gap={5}>
                        <Text fw="bold">Transactions:</Text>
                        <ShortNumber value={module.metrics.transactions}/>
                    </Group>
                    <Link to={module.github} onClick={(e) => e.stopPropagation()} target="_blank">
                        <Group gap={8}>
                            <Avatar src="/github.png" size="20px"/>
                            <ShortNumber value={module.metrics.github}/>
                        </Group>
                    </Link>
                </Group>
                <Group>
                    <Text fw="bold">Deployed:</Text>
                    <TimeAgo date={module.deployedAt}/>
                </Group>
                <Group gap="xs" wrap="nowrap">
                    <Text fw="bold">Keywords:</Text>
                    {
                        module.keywords.map((keyword: string) => (
                            <Badge
                                key={keyword}
                                c="#555"
                                variant="gradient"
                                size="xs"
                                gradient={{ from: 'rgb(74,201,255)', to: 'rgba(130,209,239,0.58)', deg: 90 }}
                            >
                                {keyword}
                            </Badge>
                        ))
                    }
                </Group>
            </Stack>
        </Card>
    )
}
