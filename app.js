const input = document.querySelector('.txtInput');
const search = document.querySelector('.search-btn');

let username;

//Event listener when user clicks the search button
search.addEventListener('click', function(){
    let output = document.querySelector('.output-container');
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
                //Displaying User information to the output
                output.innerHTML = `
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
                            <span id="followers"> Followers : ${data.followers}</span>
                            <span id="following"> Following : ${data.following}</span>
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
});

