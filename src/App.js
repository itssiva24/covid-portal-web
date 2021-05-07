import { grey } from "@material-ui/core/colors";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Main from "./modules/Main";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#145DA0",
        },
        grey: {
            700: "#2e2e2e",
            800: "#1e1e1e",
        },
        background: {
            default: "#121212",
            paper: "#121212",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Main />
        </ThemeProvider>
    );
}

export default App;
