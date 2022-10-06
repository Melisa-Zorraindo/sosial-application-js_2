import { postAuthLogin, postAuthRegister, getSocialPosts, isLoggedIn } from './noroff-api-helper.mjs'

// ("gonzalo01@stud.noroff.no", "Gonzalo123")


/**
 * Listen to sign in button
 */
/*
const button = document.getElementById('sign-in-button')
button.addEventListener('click', async () => {
    
});
*/

/**
 * Listen to Submit form
 */
const form = document.querySelector("#loginForm");
if (form) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries())
    
        const email = profile["email"];
        const password = profile["password"];
        
        if (email && password) {
            const result = await postAuthLogin(email, password)
            if (result.statusCode === 200) {
                console.log(result.json);
                console.log("Success! User has been logged in.");
            } else {
                console.error("Something went wrong");
            }
            // TODO: do proper navigation and set login state
        }
    });
}

/*
async function registerUser()  {
    const result = await postAuthRegister("Gonzalo01", "gonzalo01@stud.noroff.no", "Gonzalo123");
    // TODO: Sign in and then save the result.
    console.table(result)
    if (result.statusCode === 201) {
        console.log("Success! User has been created.")
    } else {
        console.error("Something went wrong")
    }
}

async function getPosts() {
    const result = getSocialPosts();
    console.table(result);
    if (result.statusCode === 200) {
        console.log("Success! User has been created.")
    } else {
        console.error("Something went wrong")
    }
}*/