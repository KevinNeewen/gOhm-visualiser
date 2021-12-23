import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const styles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            margin: '.7rem 0',

            color: theme.palette.primary.light,
            '& > p': {
                fontSize: '1.5rem',
            },
        },
        text: {},
        value: {},
    }),
);

export default styles;
