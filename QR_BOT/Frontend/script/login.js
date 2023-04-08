const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("pass").value;

  if (email == "" || password == "") {
    swal("", "Fill all Credentials", "warning").then(function () {
      window.location.href = "./login.html";
    });
  } else {
    let obj = {
      email,
      password,
    };
    fetch_login(obj);
  }
});

async function fetch_login(obj) {
  try {
    let response = await fetch("http://localhost:5500/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(obj),
    });
    if (response.ok) {
      let result = await response.json();
      localStorage.setItem("name", JSON.stringify(result.name));
      localStorage.setItem("token", JSON.stringify(result.token));
      localStorage.setItem("Refresh", JSON.stringify(result.Refreshtoken));

      swal("", "Login Successful", "success").then(function () {
        if (result.name == "Admin") {
          window.location.href = "../HTML/admin.html";
        } else {
          window.location.href = "../index.html";
        }
      });
    }
  } catch (error) {
    swal("", "Error Login", "warning").then(function () {
      window.location.href = "./login.html";
    });
  }
}
