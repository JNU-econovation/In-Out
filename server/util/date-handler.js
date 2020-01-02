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

var dtB = new Date(2009, 7, 24, 14, 52, 10);

const setStartTime = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    return new Date(year, month, day, 8, 0, 0);
}

const setEndTime = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();

    return new Date(year, month, day, 17, 0, 0);
}

module.exports = {
    isWeekend,
    isInTime
}