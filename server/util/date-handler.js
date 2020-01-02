const SUNDAY_CODE = 0;
const SATURDAY_CODE = 6;

const isWeekend = (date) => {
    let today = date.getDay();

    if (today == SATURDAY_CODE || today == SUNDAY_CODE) {
        return true;
    } else {
        return false;
    }
}

const isInTime = (now) => {
    let startTime = setTime(8);
    let endTime = setTime(20);
    let time = now.getTime();

    if (time > startTime.getTime() && time < endTime.getTime()) {
        return true;
    } else {
        return false;
    }
}

const setTime = (time) => {
    let date = new Date();
    date.setHours(time);
    date.setMinutes(0);
    date.setSeconds(0);

    return date;
}

const getFormatDate = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return [year, month, day].join('-');
};

module.exports = {
    isWeekend,
    isInTime,
    getFormatDate
}