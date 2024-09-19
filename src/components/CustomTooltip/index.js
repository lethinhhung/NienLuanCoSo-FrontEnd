import { forwardRef } from 'react';
import { Tooltip as AntTooltip } from 'antd';

const Tooltip = forwardRef((props, ref) => (
    <AntTooltip ref={ref} {...props}>
        {props.children}
    </AntTooltip>
));

export default Tooltip;
