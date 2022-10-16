import { postAuthLogin, isLoggedIn } from "../noroff-api-helper.mjs";

// Test user:
// ("gonzalo01@stud.noroff.no", "Gonzalo123")

/**
 * Listen to Submit form
 */
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const email = profile["email"];
    const password = profile["password"];

    if (email && password) {
      const result = await postAuthLogin(email, password);
      if (result.statusCode === 200) {
        window.location.href = "/home.html";
        return;
      }
      if (result.statusCode === 401) {
        return;
      }
    }
  });
}

// if (isLoggedIn) {
//     window.location.href = "/home.html";
// }
