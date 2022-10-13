function makePost(post) {
  const html = `<div class="postContainer">
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-10">
                    <div class="p-3 mt-4">
                        <div class="d-flex mt-5">
                            <img
                                class="shadow-lg rounded me-3 responsive-img"
                                src="${post.media || "/images/mock-image.png"}"
                                alt="No image found"
                                width="150" 
                                height="150"/>
                            <div>
                            <h2 class="mb-1">${post.author.name}</h2>
                            <h3 class="mb-1">${post.title}</h3>
                                <div class="d-flex align-items-center mb-3">
                                <p class="mb-0">${
                                  post._count.reactions
                                } Likes</p>
                                </div>
                                <div>
                                <p class="mb-0">${post.updated} Date</p>
                                </div>
                                ${post.body}
                                </p>
                                <textarea class="mt-4 form-control" placeholder="Add a comment..."></textarea>                  
                            <div>
                                <button type="button" class="btn btn-primary btn-sm mt-3">
                                Comment
                                </button>
                                <button type="button" class="btn btn-primary btn-sm mt-3" onclick="editPost(${
                                  post.id
                                })">
                                Edit
                                </button>
                                <button type="button" class="btn btn-primary btn-sm mt-3" onclick="deletePost(${
                                  post.id
                                })">
                                Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="seperator-line"></div>
                </div>
            </div>
        </div>`;
  return html;
}

export { makePost };
