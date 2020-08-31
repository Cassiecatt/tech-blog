// async function loginFormHandler(event) {
//   event.preventDefault();

//   const username = document.querySelector("#username-input-login").value.trim();
//   const password = document.querySelector("#password-input-login").value.trim();

//   if (username && password) {
//     const response = await fetch("/api/users/login", {
//       method: "post",
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard"); // when logged in redirect to users dashboard
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector("#login-form")
//   .addEventListener("submit", loginFormHandler);

const loginFormHandler = async function(event) {
  event.preventDefault();

  const usernameEl = document.querySelector("#username-input-login");
  const passwordEl = document.querySelector("#password-input-login");
  fetch("/api/user/login", {
    method: "post",
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    }),
    headers: { "Content-Type": "application/json" }
  })
    .then(function() {
      document.location.replace("/dashboard");
    })
    .catch(err => console.log(err));
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

