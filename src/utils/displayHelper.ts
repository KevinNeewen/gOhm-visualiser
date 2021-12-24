import { Adornment } from '../constants';

const convertValueToDisplay = (value: number, adornment: Adornment, decimals = 1): string => {
    switch (adornment) {
        case Adornment.Ohm:
        case Adornment.SOhm:
        case Adornment.GOhm:
            return `${value.toFixed(4)} ${adornment}`;
        case Adornment.Percentage:
            return `${seperator((value * 100).toFixed(decimals))}${adornment}`;
        case Adornment.Dollar:
            return `$${seperator(value.toFixed(2))}`;
        default: {
            return value.toString();
        }
    }
};

const seperator = (numb: string) => {
    const str = numb.toString().split('.');
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return str.join('.');
};

export default { convertValueToDisplay };
