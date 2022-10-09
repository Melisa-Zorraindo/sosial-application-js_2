/**
 * Noroff API Helper
 */

 import { load, save } from './storage-helper.mjs'

const API_BASE_URL = "https://nf-api.onrender.com";
const API_AUTH_REGISTER = "/api/v1/social/auth/register";
const API_AUTH_LOGIN = "/api/v1/social/auth/login";
const API_SOCIAL_POSTS = "/api/v1/social/posts?sort=created&sortOrder=desc";
const API_SOCIAL_POST = "/api/v1/social/posts/"

const userKey = "noroff-user-key"

const defaultHeaders = {
    "Content-Type": "application/json",
};

/**
 * Safely stringify object
 * @param {obj} data – whatever data you want to stringify 
 * @returns {string} – stringified data or null
 */
function stringify(data) {
    try {
        return JSON.stringify(data)
    } catch {
        console.error(error);
    }
    return null
}

function isLoggedIn() {
    const res = load(userKey);
    console.log("load:");
    console.table(res);
    const token = res["accessToken"];
    return token !== null 
}

/**
 * Reusable Noroff POST
 * @param {string} url - url to sign in 
 * @param {*} body – body to send with the request
 * @returns response object
 */
async function noroffPOST(url, body) {

    const data = stringify(body);
    if (!data) { return; }

    try {
        const request = {
            method: "POST",
            headers: defaultHeaders,
            body: data,
        };
        const apiResponse = await fetch(API_BASE_URL + url, request);
        return apiResponse
    } catch (error) {
        console.error(error);
    }
    return null;
}

async function noroffGET(url) {
    const headers = defaultHeaders
    const token = load(userKey);
    console.log(token.accessToken);
    if (token) {
        headers["Authorization"] = `Bearer ${token.accessToken}`
    }
    try {
        const request = {
            method: "GET",
            headers: headers
        };
        console.table(request);
        const apiResponse = await fetch(API_BASE_URL + url, request);
        return apiResponse
    } catch (error) {
        console.error(error);
    }
    return null;
}

/**
 * 
 * @param {string} username - username
 * @param {string} email - email
 * @param {string} password - password for signing in
 * @returns {obj} object with email, name, and email, or null if validation fails or successful http response
 */
async function postAuthRegister(username, email, password) {

    if (!email || !username || !password) {
        return null;
    }
    if (typeof(email) === "string" ||
        typeof(username) === "string" ||
        typeof(password) === "string") {
        const body = {
            "name": username,
            "email": email,
            "password": password,
            };
        let apiResponse = await noroffPOST(API_AUTH_REGISTER, body);
        const json = await apiResponse.json();

        if (apiResponse.status === 201) {
            save(userKey, json);
        }

        return {
            json: json,
            statusCode: apiResponse.status
        };
    }
    return null;
};

/**
 * Sign in to Noroff
 * @param {string} email 
 * @param {string} password 
 * @returns null if validation fails or successful http response
 */
async function postAuthLogin(email, password) { 

    if (!email || !password) {
        return null;
    }
    if (typeof(email) === "string" &&
        typeof(password) === "string") {

        const body = {
            email: email,
            password: password
        };
        let apiResponse = await noroffPOST(API_AUTH_LOGIN, body);
        console.table(apiResponse)
        const json = await apiResponse.json();
        
        if (apiResponse.status === 200) {
            save(userKey, json);
        }

        const response = {
            json: json,
            statusCode: apiResponse.status
        };
        return response;
    }
    return null;
};

/**
 * Get all your social posts
 * @returns http response and json data
 */
async function getSocialPosts() {
    const apiResponse = await noroffGET(API_SOCIAL_POSTS);
    const json = await apiResponse.json();
    return {
        json: json,
        statusCode: apiResponse.status
    };
}

async function getSocialPost(id) {
    const apiResponse = await noroffGET(API_SOCIAL_POST + id);
    const json = await apiResponse.json();
    return {
        json: json,
        statusCode: apiResponse.status
    };
}

export {
    postAuthLogin,
    postAuthRegister,
    getSocialPosts,
    getSocialPost,
    isLoggedIn
};