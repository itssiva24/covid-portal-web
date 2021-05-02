import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Main from './modules/Main';

const theme = createMuiTheme({
  palette: {
    primary: {
     main:"#04009a"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
