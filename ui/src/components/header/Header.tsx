import {
    Group,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    Image,
    Container,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Link, useLocation} from "react-router-dom";
import styles from './Header.module.css';
import classNames from 'classnames'
import {WebRoutes} from "../../routes";
import {brandColor} from "../../theme.ts";

function Logo() {
    return (
        <Group gap="sm">
            <Image src="/logo.png" alt="PacMap" h={35}/>
        </Group>
    )
}

function NavItem({
    title,
    to,
    onClick
}: {
    title: string,
    to: string,
    onClick?: () => void
}) {
    const location = useLocation()

    const cls = classNames(
        styles.link,
        location.pathname === to && styles.active
    )

    return <Link to={to} className={cls} onClick={onClick}>{title}</Link>
}

export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

    return (
        <Box className={styles.header} mb="md" bg={brandColor}>
            <Container size="xl">
                <Group justify="space-between" h={50} pos="relative">
                    <Link to={WebRoutes.Home} className={styles.unstyledLink}>
                        <Logo/>
                    </Link>
                    <Group h="100%" gap={0} visibleFrom="md">
                        <NavItem to={WebRoutes.Home} title="Home"/>
                        <NavItem to={WebRoutes.Search} title="Search"/>
                        <NavItem to={WebRoutes.Mappy} title="Mappy"/>
                    </Group>

                    <Burger
                        className={styles.burger}
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="md"
                        pos="absolute"
                        top={0}
                        bottom={0}
                        m="auto"
                        right={0}
                    />
                </Group>
            </Container>

            <Drawer
                className={styles.drawer}
                opened={drawerOpened}
                onClose={closeDrawer}
                padding="md"
                title={<Logo/>}
                hiddenFrom="md"
                zIndex={100}
            >
                <ScrollArea h={`calc(100vh - ${rem(90)})`} mx="-md">
                    <NavItem to={WebRoutes.Home} title="Home" onClick={closeDrawer}/>
                    <NavItem to={WebRoutes.Search} title="Search" onClick={closeDrawer}/>
                    <NavItem to={WebRoutes.Mappy} title="Mappy" onClick={closeDrawer}/>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}