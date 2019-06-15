/* eslint-disable camelcase */
$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log(event);
  var lastName = $("#lastName")
    .val()
    .trim();
  var firstName = $("#firstName")
    .val()
    .trim();
  var phone = $("#phone")
    .val()
    .trim();
  var termType = $("#termType")
    .val()
    .trim();
  var endDate = $("#endDate")
    .val()
    .trim();
  var cipCode = $("#cipCode")
    .val()
    .trim();
  var schoolName = $("#schoolName")
    .val()
    .trim();
  var startDate = $("#startDate")
    .val()
    .trim();
  var edLvl = $("#edLvl")
    .val()
    .trim();
  var email = $("#email")
    .val()
    .trim();

  var newStudent = {
    firstname: firstName,
    lastname: lastName,
    phone: phone,
    school_name: schoolName,
    qt_sem: termType,
    program_start: startDate,
    program_end: endDate,
    ed_level: edLvl,
    cip_code_one: cipCode,
    email: email
  };

  console.log(newStudent);

  // use a post call to save all student info to our mysql db
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    url: "/api/students",
    type: "POST",
    data: JSON.stringify(newStudent)
  }).then(function(res) {
    console.log(res);
    console.log("info saved to database");
  });
});
