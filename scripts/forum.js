const loadAllPosts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    posts = data.posts;
    displayAllPosts(posts);
}

const allPostsContainer = document.getElementById('all-posts-container');

const displayAllPosts = (posts) => {
    posts.forEach(post => {
        console.log(post);
        const postCard = document.createElement('div');
        postCard.className = 'w-full bg-[#797DFC1A] p-4 lg:p-10 rounded-3xl flex flex-col lg:flex-row justify-start gap-6';
        postCard.innerHTML =`
                            <div class="w-[72px] relative">
                                <img src="${post.image}" alt="Profile Picture">
                                <img class="absolute -top-1 -right-1" src="images/online.svg" alt="online-offline">
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
                                        <div class=""><i class="fa-regular fa-message"></i> ${post.comment_count}</div>
                                        <div class=""><i class="fa-regular fa-eye"></i> ${post.view_count} </div>
                                        <div class=""><i class="fa-regular fa-clock"></i> ${post.posted_time} min</div>
                                    </div>
                                    <div class="">
                                        <button
                                            class="w-7 h-7 bg-[#10B981] border border-[#10B981] text-base text-white hover:bg-white hover:text-[#10B981] rounded-full"><i
                                                class="fa-solid fa-envelope-open"></i></button>
                                    </div>
                                </div>
                            </div>        
        `;
        allPostsContainer.appendChild(postCard);

});


}







loadAllPosts();