import {SimpleGrid, Stack} from "@mantine/core";
import {MindMap} from "../components/MindMap";
import PackageList from "../components/PackageList";


function SearchPage() {
    return (
        <Stack>
            <SimpleGrid
                cols={{ base: 1, md: 2 }}
                spacing="0"
                style={{ alignItems: 'start' }}
            >
                <MindMap/>
                <PackageList/>
            </SimpleGrid>
        </Stack>
    );
}

export default SearchPage;