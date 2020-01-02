exports.getFormatDate = (Date) => {
    let year = Date.getFullYear();
    let month = Date.getMonth() + 1;
    let date = Date.getDate();

    return [year, month, date].join('-');
};