import { getProfileName } from "../noroff-api-helper.mjs";

const registerForm = document.querySelector("#profileName");
registerForm.innerHTML = getProfileName();
