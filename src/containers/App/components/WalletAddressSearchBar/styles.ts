import { createStyles, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { MyProps } from './index';

const styles: any = makeStyles<Theme, MyProps>((theme: Theme) =>
    createStyles({
        searchBar: {
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
        errorMessage: {
            color: theme.palette.colors.yellow,
            position: 'absolute',
            fontSize: '1rem',
            marginTop: '.5rem',
        },
        button: {
            position: 'static',
        },
        buttonText: {
            opacity: (props) => (props.isLoading ? 0 : 1),
        },
        spinner: {
            position: 'absolute',
        },
    }),
);

export default styles;
