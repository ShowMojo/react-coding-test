import React from 'react';
import {PropTypes} from 'prop-types';

const StockInspector = (props) => {
    return (
        props.current !== null && <div>
            Current: { props.current.price },
            Change: <span style={{color: props.change >= 0 ? 'green' : 'red'}}>{ props.change }</span>
        </div>
    );
};

StockInspector.defaultProps = {
    current: null,
    change: 0
};

StockInspector.propTypes = {
    current: PropTypes.object.required,
    change: PropTypes.number.required
};

export default StockInspector;
