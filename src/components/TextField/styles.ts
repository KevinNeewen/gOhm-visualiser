import { createStyles, Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // borderRadius: '.3rem',
            // // padding: '0 .4rem',
            // color: theme.palette.primary.light,
            // '&:hover': {
            //     border: `1px solid ${theme.palette.colors.lightGray}`,
            // },
            border: `1px solid ${theme.palette.colors.lightGray}`,
            '&:hover': {
                borderColor: theme.palette.colors.lightGray,
                border: '1px solid white',
            },
        },
        notchedOutline: {
            borderRadius: '.3rem',
            padding: '0 .4rem',
            border: `2px solid ${theme.palette.colors.lightGray}`,
        },
        focused: {
            borderColor: 'white',
            borderRadius: '.3rem',
            // padding: '0 .4rem',
            color: theme.palette.primary.light,
        },
    }),
);

export default styles;
