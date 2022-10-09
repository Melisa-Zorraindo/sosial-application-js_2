
// Improve the hr line (make class?)
function makePost(post) {
    const html = 
        `<div class="postContainer" onclick="openPost(${post.id})">
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
                                <h3 class="mb-1">${post.title}</h3>
                                <div class="d-flex align-items-center mb-3">
                                    <p class="mb-0">${post._count.reactions} likes</p>
                                </div>
                                <p>
                                ${post.body}
                                </p>
                                <textarea class="mt-4 form-control" placeholder="Add a comment..."></textarea>                  
                            <div>
                                <button type="button" class="btn btn-primary btn-sm mt-3">
                                Publish
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr style="width:100%;text-align:left;margin-left:0">
                </div>
            </div>
        </div>`;
    return html;
}

export {
    makePost
}