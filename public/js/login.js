function newUser() {
  $.ajax({
    url: "/auth/google/callback",
    method: "GET"
  }).then(function (res) {
    console.log(res[2]._json);
    $("#lastName").val(res.lastname);
  });
}

newUser();
