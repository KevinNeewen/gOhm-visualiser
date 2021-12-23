import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const styles: any = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
        },
        title: {
            color: theme.palette.colors.lightGray,
        },
        metric: {
            color: theme.palette.primary.light,
        },
    }),
);

export default styles;
