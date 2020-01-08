export function format(value, params) {
    return (value || 0).toLocaleString({
        minimumFractionDigits: 2,
        ...params,
    });
}
