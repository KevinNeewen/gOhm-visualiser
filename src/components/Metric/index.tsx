import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';

interface MyProps {
    title: string;
    metric: string;
}

const Metric = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { title, metric } = props;
    return (
        <div className={classes.root}>
            <Typography variant="h4" classes={{ root: classes.title }}>
                {title}
            </Typography>
            <Typography variant="h4" classes={{ root: classes.metric }}>
                {metric}
            </Typography>
        </div>
    );
};

export default Metric;
