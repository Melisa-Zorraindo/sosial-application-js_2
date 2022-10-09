import { getSocialPosts, isLoggedIn } from '../noroff-api-helper.mjs'
import { makePost } from '../post-helper.mjs';

// Home:

const millisecondsInHour = 1000 * 60 * 60;
const millisecondsInDay = 1000 * 60 * 60 * 24;
let currentFilter = null;
let currentSearch = null;

const container = document.getElementById('postsContainer');

async function getAllPosts(filter, search) {
    const result = await getSocialPosts();
    if (result.statusCode === 200) {
        console.table(result.json);
        insertPosts(result.json, filter, search);
        return;
    }
    console.error("Something went wrong");
}

function insertPosts(posts, filter, search) {
    
    var filteredPosts = posts
        .filter(element => {
            if (search) {
                const targets = (element.title + element.body + element.owner).toLowerCase();
                if (targets.includes(search.toLowerCase())) {
                    return true;
                }
                return false;
            }
            return true
        })
        .filter(element => {
            if (filter) {
                const createdDate = new Date(element.created);
                return (new Date() - createdDate) < filter;
            }
            return true
        })
        .map(element => {
            return makePost(element);
        });
    console.log(filteredPosts.length)
    container.innerHTML += filteredPosts;
}

const lastHourFilter = document.getElementById('filterLastHour');
const todayFilter = document.getElementById('filterToday');
const allPostsFilter = document.getElementById('filterAllPosts');

function refreshPosts() { 
    container.innerHTML = "";
    getAllPosts(currentFilter, currentSearch);
}

lastHourFilter.addEventListener("click", function() {
    currentFilter = millisecondsInHour
    currentSearch = null;
    refreshPosts();
});

todayFilter.addEventListener("click", function() {
    currentFilter = millisecondsInDay
    currentSearch = null;
    refreshPosts();
});

allPostsFilter.addEventListener("click", function() {
    currentFilter = null;
    currentSearch = null;
    refreshPosts();
});

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener("click", function() {
    currentSearch = searchInput.value;
    currentFilter = null;
    refreshPosts();
});

getAllPosts(currentFilter, currentSearch);

function openPost(id) {
    window.location.href = "/post.html?id=" + id;
}

window.openPost = openPost