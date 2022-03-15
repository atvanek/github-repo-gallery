const overview = document.querySelector(".overview");
const username = "atvanek";

const getGitInfo = async function(){
      const gitInfo = await fetch(`https://api.github.com/users/${username}`);
      const data = await gitInfo.json();
      console.log(data);
      displayGitInfo(data);
};

getGitInfo();

const displayGitInfo = function(data){
      const div = document.createElement("div");
      div.classList.add("user-info");
      const userAvatar = data.avatar_url;
      const userName = data.name;
      const userBio = data.bio;
      const userLocation = data.location;
      const userPublicRepos = data.public_repos;

      div.innerHTML = `

      <figure>
      <img alt="user avatar" src=${userAvatar} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userName}</p>
      <p><strong>Bio:</strong> ${userBio}</p>
      <p><strong>Location:</strong> ${userLocation}</p>
      <p><strong>Number of public repos:</strong> ${userPublicRepos}</p>
    </div> `;

    overview.append(div);



};
