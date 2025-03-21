import {Outlet, Route, Routes} from "react-router-dom";
import NoMatch from "./pages/NoMatch";
import {Container, Stack} from "@mantine/core";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";

function Layout() {
    return (
        <Stack
            gap={0}
            style={{
                minWidth: "100%",
                minHeight: "100vh"
            }}
        >
            <Header/>
            <Container size="xl" w="100%" flex={1}>
                <Outlet/>
            </Container>
            <Footer/>
        </Stack>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
