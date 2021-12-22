import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import useStyles from './styles';

interface MyProps {
    id: string;
}

const TextField = (props: MyProps) => {
    const classes = useStyles(props);
    const { id } = props;

    return (
        <MuiTextField //
            id={id}
            classes={{ root: classes.root }}
            variant="outlined"
            InputProps={{
                classes: {
                    notchedOutline: classes.notchedOutline,
                    focused: classes.focused,
                },
            }}
        ></MuiTextField>
    );
};

export default TextField;
