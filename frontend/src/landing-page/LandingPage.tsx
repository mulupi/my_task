import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TopAppBar from './components/AppMenu'
import LogoCollection from './components/LogoCollection';
import Books from './components/Books';

declare module '@mui/material/styles' {
  interface Palette {
    ello: Palette['primary'];
  }

  interface PaletteOptions {
    ello?: PaletteOptions['primary'];
  }

  interface Palette {
    ello2: Palette['primary'];
  }

  interface PaletteOptions {
    ello2?: PaletteOptions['primary'];
  }
}

export default function LandingPage() {
  const defaultTheme = createTheme(
    {
      palette: {
        success: {
          main: "#FABD33"
        },
        ello: {
          main: '#5ACCCC',
          light: '#335C6E',
          dark: '#A28B8B8',
          contrastText: '#FFE6DC',
        },
        ello2: {
          main: '#FABD33',
          light: '#4AA088',
          dark: '#FAAD00',
          contrastText: '#F76434',
        },
      }
    });
  const [listItems, setListItems] = React.useState<number>(0);
  const [showReadList, setShowReadList] = React.useState<boolean>(false);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <TopAppBar
        listItems={listItems}
        setShowReadList={setShowReadList}
        showReadList={showReadList}
      />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Books
          setListItems={setListItems}
          showReadList={showReadList}
          setShowReadList={setShowReadList}
        />
        <Divider />
      </Box>
    </ThemeProvider>
  );
}
