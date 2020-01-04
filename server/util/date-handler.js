const SUNDAY_CODE = 0;
const SATURDAY_CODE = 6;
const START_TIME = 8;
const END_TIME = 20; // 임시 설정

const isWeekend = date => {
  const today = date.getDay();

  if (today == SATURDAY_CODE || today == SUNDAY_CODE) {
    return true;
  } else {
    return false;
  }
};

const isInTime = now => {
  const startTime = getStartTime();
  const endTime = getEndTime();
  const time = now.getTime();

  if (time > startTime.getTime() && time < endTime.getTime()) {
    return true;
  } else {
    return false;
  }
};

const getStartTime = () => {
  const date = new Date();
  date.setHours(START_TIME);
  date.setMinutes(0);
  date.setSeconds(0);
};

const getEndTime = () => {
  let date = new Date();
  date.setHours(END_TIME);
  date.setMinutes(0);
  date.setSeconds(0);
};

const getFormatDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].join("-");
};

const getDayToStr = date => {
  switch (date.getDay()) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
};

module.exports = {
  isWeekend,
  isInTime,
  getFormatDate,
  getDayToStr
};
