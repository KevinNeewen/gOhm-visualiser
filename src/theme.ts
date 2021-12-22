import { createTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const colors = {
    LIGHT_GRAY: '#A3A3A3',
    DARK_GRAY: '#363840',
    YELLOW: '#F8CC82',
    WHITE: '#FCFCFC',
};
// declare module '@material-ui/core/styles/createPalette' {
//     interface Palette {
//         colors: any;
//     }
//     interface PaletteOptions {
//         colors: any;
//     }
// }

export const theme = createTheme({
    palette: createPalette({
        primary: {
            main: colors.DARK_GRAY,
        },
        // colors: {},
    }),
    typography: {
        fontFamily: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'sans-serif'].join(','),
        fontSize: 12,
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 600,
        },
    },
    overrides: {},
});
