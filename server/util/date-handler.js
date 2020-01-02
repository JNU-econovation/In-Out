const SUNDAY_CODE = 0;
const SATURDAY_CODE = 6;

const isWeekend = () => {
    let date = new Date();
    let today = date.getDay();

    if (today == SATURDAY_CODE || today == SUNDAY_CODE) {
        return true;
    } else {
        return false;
    }
}

const isInTime = () => {
    let now = new Date();
    let startTime = setStartTime(now);
    let endTime = setEndTime(now);
    let time = now.getTime();

    if (time > startTime && time < endTime) {
        return true;
    } else {
        return false;
    }

}

const setStartTime = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();;

    return new Date(year, month, day, 8, 0, 0);
}

const setEndTime = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    return new Date(year, month, day, 20, 0, 0);
}

const getFormatDate = (Date) => {
    let year = Date.getFullYear();
    let month = Date.getMonth() + 1;
    let date = Date.getDate();

    return [year, month, date].join('-');
};

module.exports = {
    isWeekend,
    isInTime,
    getFormatDate
}