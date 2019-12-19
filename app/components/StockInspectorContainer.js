import {connect} from 'react-redux';
import StockInspector from './StockInspector';

export default connect(state => ({...state}))(StockInspector);
