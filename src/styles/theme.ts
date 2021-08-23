import { extendTheme, ChakraTheme } from '@chakra-ui/react';

export const customTheme: Partial<ChakraTheme> = {
  config: {
    initialColorMode: 'dark',
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
};

export const theme = extendTheme(customTheme);
