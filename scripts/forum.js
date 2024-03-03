// Load All Posts from API
const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    posts = data.posts;
    displayAllPosts(posts);
}

const allPostsContainer = document.getElementById('all-posts-container');
const postReadCountContainer = document.getElementById('post-read-count');
let postReadCount = parseInt(postReadCountContainer.innerText);
// const markAsReadButton = document.getElementById('mark-as-read');
const latestPostsContainer = document.getElementById('latest-posts-container');

const displayAllPosts = (posts) => {
    posts.forEach(post => {
        // Displaying all the posts from API
        const postCard = document.createElement('div');
        postCard.className = 'w-full bg-[#797DFC1A] p-4 lg:p-10 rounded-3xl flex flex-col lg:flex-row justify-start gap-6';
        postCard.innerHTML = `
                            <div class="w-[72px] relative">
                                <img src="${post.image}" alt="Profile Picture">
                                <img id="online-status-${post.id}" class="absolute -top-1 -right-1 hidden" src="images/online.svg" alt="online">
                                <img id="offline-status-${post.id}" class="absolute -top-1 -right-1 hidden" src="images/offline.svg" alt="offline">
                            </div>
                            <div class="w-full flex flex-col gap-3">
                                <div class="flex justify-start gap-5 text-[#12132DCC] text-sm font-medium">
                                    <h6># ${post.category}</h6>
                                    <h6>Author : ${post.author.name}</h6>
                                </div>
                                <h2 class="font-bold text-lg lg:text-xl mb-2">${post.title}</h2>
                                <p class="text-[#12132D99] text-sm lg:text-base">${post.description}</p>
                                <hr class="border border-dashed border-[#12132D40]">
                                <div class="flex justify-between items-center">
                                    <div class="flex justify-start items-center gap-3 lg:gap-7 text-[#12132D99]">
                                        <div><i class="fa-regular fa-message"></i> ${post.comment_count}</div>
                                        <div><i class="fa-regular fa-eye"></i> ${post.view_count} </div>
                                        <div><i class="fa-regular fa-clock"></i> ${post.posted_time} min</div>
                                    </div>
                                    <div>
                                        <button onclick="markAsRead('${post.title.replace(/'/g, '’')}', ${post.view_count})" id="mark-as-read" class="w-7 h-7 bg-[#10B981] border border-[#10B981] text-base text-white hover:bg-transparent hover:text-[#10B981] rounded-full"><i class="fa-solid fa-envelope-open"></i></button>
                                    </div>
                                </div>
                            </div>`;
        allPostsContainer.appendChild(postCard);

        const onlineStatus = document.getElementById(`online-status-${post.id}`);
        const offlineStatus = document.getElementById(`offline-status-${post.id}`);
        if (post.isActive) {
            onlineStatus.classList.remove('hidden');
        }
        if (!post.isActive) {
            offlineStatus.classList.remove('hidden');
        }
    });
}


// Enable Mark as Read Button
const markAsRead = (title, viewCount) => {
    console.log(title, viewCount);
    const markedAsReadContainer = document.getElementById('marked-as-read-container');
    const readPostCard = document.createElement('div');
    readPostCard.className = 'bg-white rounded-2xl p-2 lg:p-4 flex justify-between items-center flex-1 gap-2';
    readPostCard.innerHTML = `
                <h4 class="text-sm lg:text-xl font-semibold w-2/3">${title}</h4>
                <h5 class="text-[#12132D99] text-sm lg:text-base"><i class="fa-regular fa-eye"></i> ${viewCount}</h5>
            `;
    markedAsReadContainer.appendChild(readPostCard);

    // Mark as Read Counter on the Right Side
    if (markAsRead) {
        postReadCount++;
        postReadCountContainer.innerText = postReadCount;
    }
};

// Load Latest Posts from API
const loadLatestPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const latestPosts = await res.json();
    displayLatestPosts(latestPosts);
}

// Display Latest Posts Dynamically
const displayLatestPosts = (latestPosts) => {
    latestPosts.forEach(post => {
        const latestPostCard = document.createElement('div');
        latestPostCard.className = 'flex flex-col gap-6 p-6 rounded-3xl border border-[#12132D26] bg-white';
        latestPostCard.innerHTML = `
                    <div class="w-full h-auto rounded-[20px]"><img class="w-full h-auto rounded-[20px]"
                                src="${post.cover_image}" alt="Cover Photo">
                    </div>
                    <h4 class="text-[#12132D99]">
                    <i class="fa-regular fa-calendar-minus"></i> ${post?.author?.posted_date || 'No Publish Date'} </h4>
                    <h3 class="font-extrabold text-lg">${post.title}</h3>
                    <p class="text-[#12132D99]">${post.description}</p>
                    <div class="flex justify-start gap-4">
                        <img class="w-12 h-12 rounded-full" src="${post.profile_image}" alt="Profile Picture">
                        <div class="flex flex-col gap-1">
                            <h3 class="font-bold">${post?.author?.name || 'Name Not Available'}</h3>
                            <h4 class="text-[#12132D99] text-sm">${post?.author.designation || 'Unknown'}</h4>
                        </div>
                    </div>
        `;
        latestPostsContainer.appendChild(latestPostCard);
    });
}



loadAllPosts();
loadLatestPosts();