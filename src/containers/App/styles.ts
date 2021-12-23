import { createStyles, Theme, makeStyles } from '@material-ui/core';

const styles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            background: theme.palette.gradient.background,
            backgroundColor: theme.palette.background.default,
        },
        appBar: {
            background: 'transparent',
            boxShadow: 'none',
        },
        main: {
            position: 'relative',
            height: '100%',
        },
        stakeView: {
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '70%',
            width: '70%',
            maxWidth: '69rem',
            padding: '1.6rem 2.5rem 2.5rem 2.5rem',
        },
        header: {
            color: theme.palette.primary.light,
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
            '& .MuiFormControl-root': {
                marginRight: '1rem',
                flexGrow: 3,
            },
            '& .MuiButton-root': {
                flexGrow: 1,
            },
        },
        walletAddressLabel: {
            color: theme.palette.primary.light,
            marginBottom: '.5rem',
        },
    }),
);

export default styles;
