import { createTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

const colors = {
    LIGHT_GRAY: '#A3A3A3',
    DARK_GRAY: '#363840',
    YELLOW: '#F8CC82',
    WHITE: '#FCFCFC',
};

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        colors: any;
        gradient: {
            background: string;
        };
    }
    interface PaletteOptions {
        colors: any;
        gradient: {
            background: string;
        };
    }
}

export const theme = createTheme({
    palette: createPalette({
        primary: {
            main: colors.DARK_GRAY,
            light: colors.WHITE,
        },
        background: {
            default: 'rgba(8, 15, 53, 1)',
            paper: colors.DARK_GRAY,
        },
        gradient: {
            background:
                'linear-gradient(180deg, rgba(8, 15, 53, 0), rgba(0, 0, 10, 0.9)), linear-gradient(333deg, rgba(153, 207, 255, 0.2), rgba(180, 255, 217, 0.08)), radial-gradient(circle at 77% 89%, rgba(125, 163, 169, 0.8), rgba(125, 163, 169, 0) 50%),radial-gradient(circle at 15% 95%, rgba(125, 163, 169, 0.8), rgba(125, 163, 169, 0) 43%), radial-gradient(circle at 65% 23%, rgba(137, 151, 119, 0.4), rgba(137, 151, 119, 0) 70%), radial-gradient(circle at 10% 0%, rgba(187, 211, 204, 0.33), rgba(187,211,204,0) 35%), radial-gradient(circle at 11% 100%, rgba(131, 165, 203, 0.3), rgba(131, 165, 203, 0) 30%)',
        },
        colors: {
            lightGray: colors.LIGHT_GRAY,
            yellow: colors.YELLOW,
        },
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
    overrides: {
        MuiButton: {
            root: {
                backgroundColor: colors.YELLOW,
                fontSize: '1.2857rem',
                fontWeight: 500,
                borderRadius: '.5rem',
                textTransform: 'capitalize',
            },
            text: {
                padding: '.5rem 5rem',
            },
        },
        MuiOutlinedInput: {
            notchedOutline: {
                borderRadius: '.3rem',

                color: colors.WHITE,
            },
            root: {
                border: `2px solid ${colors.LIGHT_GRAY}`,
                '&:hover': {
                    border: `2px solid ${colors.WHITE}`,
                },
                '&$focused': {
                    border: `2px solid ${colors.WHITE}`,
                },
            },
        },
        MuiInputBase: {
            root: {
                border: 0,
                color: colors.WHITE,
                fontSize: '1rem',
                padding: '0 .4rem',
            },
        },
    },
});
