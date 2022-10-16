import { postAuthRegister, isLoggedIn } from "../noroff-api-helper.mjs";

// Registration:
const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const email = profile["email"];
    const name = profile["name"];
    const password = profile["password"];

    if (email && name && password) {
      const result = await postAuthRegister(name, email, password);
      if (result.statusCode === 201) {
        window.location.href = "/index.html";
        return;
      }
      if (result.statusCode === 401) {
        return;
      }
    }
  });
}
