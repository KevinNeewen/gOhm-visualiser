import React from 'react';
import { Button, TextField, Typography, Grid, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

export interface MyProps {
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClickHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
    hasError: boolean;
    isLoading: boolean;
}

const DataRows = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { onChangeHandler, onClickHandler, hasError, isLoading } = props;

    return (
        <Grid item xs={12} style={{ marginBottom: '4rem' }}>
            <Typography classes={{ root: classes.walletAddressLabel }} variant="h6">
                Wallet Address
            </Typography>
            <div className={classes.searchBar}>
                <TextField //
                    id="address"
                    variant="outlined"
                    placeholder=""
                    onChange={onChangeHandler}
                />
                <Button
                    classes={{ root: classes.button }} //
                    onClick={onClickHandler}
                >
                    {isLoading && <CircularProgress classes={{ root: classes.spinner }} />}
                    <span className={classes.buttonText}>Enter Address</span>
                </Button>
            </div>
            {hasError && (
                <div style={{ position: 'relative' }}>
                    <Typography variant="body1" classes={{ root: classes.errorMessage }}>
                        Failed to retrieve wallet address. Please try again.
                    </Typography>
                </div>
            )}
        </Grid>
    );
};

export default DataRows;
