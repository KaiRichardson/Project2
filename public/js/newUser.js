// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick); */

$("#submit").on("click", function(event) {
  event.preventDefault();
  console.log(event);

  // Form validation
  function validateForm() {
    var isValid = true;
    $("#lastName").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter your last name.");
      }
    });
    $("#firstName").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter your first name.");
      }
    });
    // email address validation
    $("#email").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter a valid email address.");
      }
    });
    //phone number validation
    $("#phone").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter your phone number.");
      }
    });
    $("#schoolName").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter the name of your school.");
      }
    });
    $("#termType").each(function() {
      if ($(this).val() === "Select One") {
        isValid = false;
        alert("Please select your school's academic term type.");
      }
    });
    $("#startDate").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please select your start date as listed on your I-20.");
      }
    });
    $("#endDate").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please select your end date as listed on your I-20.");
      }
    });
    $("#edLvl").each(function() {
      if ($(this).val() === "Select One") {
        isValid = false;
        alert("Please select your education level.");
      }
    });
    //cip code validation
    $("#cipCode").each(function() {
      if ($(this).val() === "") {
        isValid = false;
        alert("Please enter your CIP Code.");
      }
    });
    return isValid;
  }

  if (validateForm()) {
    var lastName = $("#lastName")
      .val()
      .trim();
    var firstName = $("#firstName")
      .val()
      .trim();
    var email = $("#email")
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

    var newStudent = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      phone: phone,
      school_name: schoolName,
      qt_sem: termType,
      program_start: startDate,
      program_end: endDate,
      ed_level: edLvl,
      cip_code_one: cipCode,
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
  }
});
