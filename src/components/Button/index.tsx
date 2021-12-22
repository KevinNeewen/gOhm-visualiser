import React from 'react';
import MuiButton from '@material-ui/core/Button';
import useStyles from './styles';

interface MyProps {
    children: string;
}

const Button = (props: MyProps) => {
    const classes = useStyles(props);
    const { children } = props;

    return (
        <MuiButton //
            classes={{ root: classes.root, text: classes.text }}
        >
            {children}
        </MuiButton>
    );
};

export default Button;
