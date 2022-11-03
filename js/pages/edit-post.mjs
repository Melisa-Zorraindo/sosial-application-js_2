import {
  putUpdateSocialPost,
  getSocialPost,
  isLoggedIn,
} from "../noroff-api-helper.mjs";

const publishPost = document.getElementById("publishPost");
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const result = await getSocialPost(id);

if (result.statusCode === 200) {
  postTitle.value = result.json.title;
  postBody.value = result.json.body;
}

publishPost.addEventListener("click", async function () {
  const title = postTitle.value;
  const body = postBody.value;
  if (title && body && id) {
    const result = await putUpdateSocialPost(id, title, body);
    if (result.statusCode === 200) {
      window.location.href = "/post.html?id=" + id;
    }
  }
});
