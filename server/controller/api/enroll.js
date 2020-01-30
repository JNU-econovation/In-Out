const dateHandler = require("../../util/date-handler");
const enrollmentRepository = require("../../database/transfer/enrollment");

const showEnrollmentsByDate = async (req, res) => {
  try {
    const date = req.query.date;
    const enrollments = await enrollmentRepository.getEnrollmentsByDate(date);

    return res.status(200).json({
      enrollments
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      errCode: "14"
    });
  }
};

const showEnrollment = async (req, res) => {
  const userMemberId = req.params.memberId;
  const today = dateHandler.getFormatDate(new Date());
  try {
    const enrollment = await enrollmentRepository.findTodayById(
      userMemberId,
      today
    );
    return res.status(200).json({
      result: enrollment
    });
  } catch (error) {
    console.log("에러 ", error.message);
    return res.status(500).json({
      message: error.message,
      errCode: "14"
    });
  }
};

const createEnrollment = async (req, res) => {
  //평일 08:00 ~ 17:00가 아니거나 공휴일인 경우 출입 신청 불가 기능
  const memberId = req.body.memberId;
  const reason = req.body.reason;
  const now = new Date();
  let result;

  if (
    dateHandler.isWeekend(now) ||
    dateHandler.isHoliday(dateHandler.getFormatDate(now))
  ) {
    return res.status(403).json({
      message: "주말에는 출입 신청을 할 수 없습니다.",
      errCode: "30"
    });
  }

  if (!dateHandler.isInTime(now)) {
    return res.status(403).json({
      message: "출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다.",
      errCode: "31"
    });
  }

  try {
    const enrollment = {
      memberId: memberId,
      today: dateHandler.getFormatDate(now),
      reason: reason
    };

    result = await enrollmentRepository.createEnrollment(enrollment);
  } catch (error) {
    console.log("에러 ", error.message);
    return res.status(500).json({
      message: error.message,
      errCode: "11"
    });
  }
  return res.status(200).json({
    result,
    message: "등록 완료!"
  });
};

const updateEnrollment = async (req, res) => {
  const now = new Date();
  if (
    dateHandler.isWeekend(now) ||
    dateHandler.isHoliday(dateHandler.getFormatDate(now))
  ) {
    return res.status(403).json({
      message: "주말에는 출입 신청을 할 수 없습니다.",
      errCode: "30"
    });
  }

  if (!dateHandler.isInTime(now)) {
    return res.status(403).json({
      message: "출입 신청은 당일 08:00 ~ 17:00 사이에만 신청 가능합니다.",
      errCode: "31"
    });
  }

  try {
    await enrollmentRepository.changeReason(
      req.body.memberId,
      req.body.reason,
      dateHandler.getFormatDate(now)
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      errCode: "13"
    });
  }
  return res.status(200).json({
    message: "update 됨."
  });
};

module.exports = {
  showEnrollmentsByDate,
  showEnrollment,
  createEnrollment,
  updateEnrollment
};
