const input = document.querySelector('.txtInput');
const search = document.querySelector('.search-btn');

let username;

search.addEventListener('click', function(){
    searchGitHub();
});

input.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        searchGitHub();
    }
});


//Event listener when user clicks the search button
function searchGitHub(){
    let output = document.querySelector('.output');
    username = input.value; //Username from the input field

    //Check if username is empty
    if(!username){
        alert('Please enter a GitHub username');
        return;
    }
    //GitHub's API
    const url = `https://api.github.com/users/${username}`;
    //Fetch GitHub's API
    fetch(url)
        .then(res => {
            if(!res.ok){
                alert('User Not Found');
                return; 
            }
            return res.json();
        })
        .then(data => {
            if(data){
                if(data.bio == null){
                    data.bio = '';
                }
                //Displaying User information to the output
                output.innerHTML = `
                <div class="output-container">
                    <div class="profile-container">
                        <div class="profile-picture-container">
                            <img src="${data.avatar_url}" class="profile-picture">
                            <button class="view-profile-btn"><a href="https://github.com/${username}"
                            target="_blank" class="view-profile">View Profile</a></button>
                        </div>
                        <div class="user-info-container">
                            <div class="username-container">
                                ${data.login}
                            </div>
                            <div class="job-title-container">
                                ${data.bio}
                            </div>
                            <div class="followers-container">
                                <span id="followers"> Followers : ${data.followers}</span><br>
                                <span id="following"> Following : ${data.following}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            }
        })
        .catch(error => {
            console.log(error);
            alert('An error occured while searching for the users data');
        });
};

