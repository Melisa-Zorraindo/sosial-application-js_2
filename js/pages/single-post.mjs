import { getSocialPost, isLoggedIn } from '../noroff-api-helper.mjs'
import { makePost } from '../post-helper.mjs';

const container = document.getElementById('postsContainer');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

const result = await getSocialPost(id);

if (result.statusCode === 200) {
    const postHtml = makePost(result.json);
    container.innerHTML = postHtml;
}