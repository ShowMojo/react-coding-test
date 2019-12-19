import { LOAD_STOCK } from './ActionType';

export const loadStock = (stock) => ({
    type: LOAD_STOCK,
    payload: stock
});
