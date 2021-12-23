import React from 'react';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import DisplayHelper from '../../utils/displayHelper';
import { Adornment } from '../../model';

interface MyProps {
    title: string;
    metric: number;
    adornment?: Adornment;
}

const Metric = (props: MyProps): JSX.Element => {
    const classes = useStyles(props);
    const { title, metric, adornment } = props;
    return (
        <div className={classes.root}>
            <Typography variant="h4" classes={{ root: classes.title }}>
                {title}
            </Typography>
            <Typography variant="h4" classes={{ root: classes.metric }}>
                {DisplayHelper.convertValueToDisplay(metric, adornment)}
            </Typography>
        </div>
    );
};

export default Metric;
