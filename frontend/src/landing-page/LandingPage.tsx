import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import TopAppBar from './components/AppMenu'
import LogoCollection from './components/LogoCollection';
import Books from './components/Books';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });
  const [listItems, setListItems] = React.useState<number>(0);
  const [showReadList, setShowReadList] = React.useState<boolean>(false);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <TopAppBar listItems={listItems} setShowReadList={setShowReadList} showReadList={showReadList}/>
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Books setListItems={setListItems} showReadList={showReadList} setShowReadList={setShowReadList}/>
        <Divider />
      </Box>
    </ThemeProvider>
  );
}
