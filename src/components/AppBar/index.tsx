import React from 'react';
import { default as MuiAppBar } from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useStyles from './styles';
import { ClassNameMap } from '@material-ui/styles';

interface MyProps {
    children: React.ReactNode;
    classes?: ClassNameMap;
}

const AppBar = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { children } = props;
    return (
        <MuiAppBar className={classes.root}>
            <ToolBar>{children}</ToolBar>
        </MuiAppBar>
    );
};

export default AppBar;
