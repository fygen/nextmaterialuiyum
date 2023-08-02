"use client"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Children, ReactElement, ReactNode } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function ThemeProvide(Children: ReactElement) {
      return (
            <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  {Children}
            </ThemeProvider>
      );
}