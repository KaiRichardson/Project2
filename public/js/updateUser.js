/* eslint-disable camelcase */
var x = document.cookie;

console.log(x);

//grab user info and post to our updateUser page
function getUser() {
  $.ajax({
    url: "api/students/5",
    type: "GET"
  }).then(function (res) {
    console.log(res);
    $("#lastName").val(res.lastname);
    $("#firstName").val(res.firstname);
    $("#email").val(res.email);
    $("#phone").val(res.phone);
    $("#schoolName").val(res.school_name);
    $("#startDate").val(res.program_start);
    $("#endDate").val(res.program_end);
    $("#edLvl").val(res.ed_level);
    $("#termType").val(res.qt_sem);
    $("#cipCode").val(res.cip_code_one);
  });
}

getUser();

var onlyLetters = function (keyStroke) {
  return /^[a-zA-Z ]+$/.test(keyStroke);
};

$("#lastName, #firstName, #schoolName").on("keypress", function (event) {
  if (!onlyLetters(event.key)) {
    event.preventDefault();
  }
});

//update user info event
$("#updateInfo").on("click", function (event) {
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

    var updateUser = {
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

    console.log(updateUser);

    $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      url: "/api/students/1",
      type: "PUT",
      data: JSON.stringify(updateUser)
    }).then(getUser);
    window.location.href="https://frozen-spire-30925.herokuapp.com/dashboard";
  }
});

//delete user from db
$("#userDelete").on("click", function (event) {
  event.preventDefault();
  console.log(event);
  $.ajax({
    url: "/api/students/8",
    type: "DELETE"
  }).then(function () {
    console.log("deleting user");
    window.location = "/";
  });
});

//update ajax call
/* function updateUser(id) {
  $.ajax({
    url: "api/students/" + id,
    type: "PUT"
  }).then(getUser);
}

updateUser(thing); */
