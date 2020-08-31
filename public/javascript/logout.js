async function logout() {
  const response = await fetch("/api/users/logout", {
    method: "post",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/"); // when logged out redirect to homepage
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout-link").addEventListener("click", logout);
