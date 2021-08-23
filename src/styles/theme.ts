import { extendTheme, ChakraTheme } from '@chakra-ui/react';

export const customTheme: Partial<ChakraTheme> = {
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      '.notion-header': {
        display: 'none',
      },
      '::-webkit-scrollbar': {
        width: '6px',
        background: '#2f3437',
      },
      '::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '3px',
      },
    },
  },
};

export const theme = extendTheme(customTheme);
