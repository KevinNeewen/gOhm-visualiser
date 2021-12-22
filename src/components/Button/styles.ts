import { createStyles, Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.colors.yellow,
            fontSize: '1.2857rem',
            fontWeight: 500,
            borderRadius: '.5rem',
            textTransform: 'capitalize',
        },
        text: {
            padding: '.5rem 3rem',
        },
    }),
);

export default styles;
