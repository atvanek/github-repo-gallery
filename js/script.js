const overview = document.querySelector(".overview");
const username = "atvanek";
const repoList = document.querySelector(".repo-list");
const repoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");


const getGitInfo = async function(){
      const gitInfo = await fetch(`https://api.github.com/users/${username}`);
      const data = await gitInfo.json();
      //console.log(data);
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
    getRepoInfo();



};



const getRepoInfo = async function(){
      const repoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      const repoData = await repoInfo.json();
      //console.log(repoData);
      displayRepos(repoData);
};


const displayRepos = function(repoData){

      for(const repo of repoData){
            const li = document.createElement("li");

            li.classList.add("repo");
            li.innerHTML = ` <h3> ${repo.name} </h3>`;
            repoList.append(li);
      }
};


repoList.addEventListener("click", function repoList(e){
      if (e.target.matches("h3")){
            const repoName = e.target.innerText;
            getRepoSpecs(repoName);
      }
});

getRepoSpecs = async function(repoName){
      const specData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
      const repoInfo = await specData.json();
      const fetchLanguages = await fetch(repoInfo.languages_url);
      const languageData = await fetchLanguages.json();
      const languages = [];
      for (const language in languageData){
            languages.push(language);
      }

      displayRepoInfo(repoInfo, languages);

};

const displayRepoInfo = function(repoInfo, languages){
      repoDataSection.innerHTML = "";
      const div = document.createElement("div");
      div.innerHTML = `
      <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDataSection.append(div);
    repoDataSection.classList.remove("hide");
    repoSection.classList.add("hide");
};
