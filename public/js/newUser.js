// Add event listeners to the submit and delete buttons
/* var studentGoogObj = require("../../routes/googleRoutes/auth-routes.js");
console.log(studentGoogObj); */
var x = document.cookie.googleId;

console.log(x);

var onlyLetters = function (keyStroke) {
  return /^[a-zA-Z ]+$/.test(keyStroke);
};

$("#lastName, #firstName, #schoolName").on("keypress", function (event) {
  if (!onlyLetters(event.key)) {
    event.preventDefault();
  }
});

$("#submit").on("click", function (event) {
  event.preventDefault();
  console.log(event);

  // Form validation
  function validateForm() {
    var isValid = true;
    var errorMessage = "";
    $("#lastName").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Last Name \n";
        // alert("Please enter your last name.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#firstName").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "First Name \n";
        // alert("Please enter your first name.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    // email address validation
    $("#email").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Email Address \n";
        // alert("Please enter a valid email address.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    //phone number validation
    $("#phone").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Phone Number \n";
        // alert("Please enter your phone number.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#schoolName").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "School Name \n";
        // alert("Please enter the name of your school.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#termType").each(function () {
      if ($(this).val() === "Select One") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Academic Term Type \n";
        // alert("Please select your school's academic term type.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#startDate").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Start Date \n";
        // alert("Please select your start date as listed on your I-20.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#endDate").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "End Date \n";
        // alert("Please select your end date as listed on your I-20.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    $("#edLvl").each(function () {
      if ($(this).val() === "Select One") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "Education Level \n";
        // alert("Please select your education level.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    //cip code validation
    $("#cipCode").each(function () {
      if ($(this).val() === "") {
        $(this).addClass("invalid");
        isValid = false;
        errorMessage += "CIP Code";
        // alert("Please enter your CIP Code.");
      } else {
        $(this).removeClass("invalid");
        $(this).addClass("valid");
      }
    });
    if (errorMessage !== "") {
      alert("Please complete the following fields:" + errorMessage);
    } else {
      return isValid;
    }

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
    }).then(function (res) {
      console.log(res);
      console.log("info saved to database");
      window.location.href="https://frozen-spire-30925.herokuapp.com/dashboard";
    });
  }
});
