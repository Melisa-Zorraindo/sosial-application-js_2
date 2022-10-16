import {
  getSocialPosts,
  postCreateSocialpost,
  isLoggedIn,
  deleteSocialPost,
} from "../noroff-api-helper.mjs";
import { makePost } from "../post-helper.mjs";

// Home:

const millisecondsInHour = 1000 * 60 * 60;
const millisecondsInDay = 1000 * 60 * 60 * 24;
let currentFilter = null;
let currentSearch = null;

const container = document.getElementById("postsContainer");

async function getAllPosts(filter, search) {
  const result = await getSocialPosts();
  if (result.statusCode === 200) {
    insertPosts(result.json, filter, search);
    return;
  }
}

function insertPosts(posts, filter, search) {
  var filteredPosts = posts
    .filter((element) => {
      if (search) {
        const targets = (
          element.title +
          element.body +
          element.owner
        ).toLowerCase();
        if (targets.includes(search.toLowerCase())) {
          return true;
        }
        return false;
      }
      return true;
    })
    .filter((element) => {
      if (filter) {
        const createdDate = new Date(element.created);
        return new Date() - createdDate < filter;
      }
      return true;
    })
    .map((element) => {
      return makePost(element);
    });
  container.innerHTML += filteredPosts;
}

// Filters
const lastHourFilter = document.getElementById("filterLastHour");
const todayFilter = document.getElementById("filterToday");
const allPostsFilter = document.getElementById("filterAllPosts");

function refreshPosts() {
  container.innerHTML = "";
  getAllPosts(currentFilter, currentSearch);
}

lastHourFilter.addEventListener("click", function () {
  currentFilter = millisecondsInHour;
  currentSearch = null;
  refreshPosts();
});

todayFilter.addEventListener("click", function () {
  currentFilter = millisecondsInDay;
  currentSearch = null;
  refreshPosts();
});

allPostsFilter.addEventListener("click", function () {
  currentFilter = null;
  currentSearch = null;
  refreshPosts();
});

// Search
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
  currentSearch = searchInput.value;
  currentFilter = null;
  refreshPosts();
});

getAllPosts(currentFilter, currentSearch);

// Navigate to single post
function openPost(id) {
  window.location.href = "/post.html?id=" + id;
}
window.openPost = openPost;

// Publish post:
const publishPost = document.getElementById("publishPost");
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");

publishPost.addEventListener("click", async function () {
  const title = postTitle.value;
  const body = postBody.value;

  if (title.length > 0 && body.length > 0) {
    const result = await postCreateSocialpost(title, body);
    if (result.statusCode === 200) {
      // Success

      currentFilter = null;
      currentSearch = null;
      refreshPosts();

      postTitle.value = "";
      postBody.value = "";
    }
  }
});

// Delete post:
async function deletePost(id) {
  if (id) {
    const result = await deleteSocialPost(id);
    if (result.statusCode === 200) {
      refreshPosts();
    }
  }
}
window.deletePost = deletePost;

// Edit post:
async function editPost(id) {
  if (id) {
    window.location.href = "/edit.html?id=" + id;
  }
}
window.editPost = editPost;
