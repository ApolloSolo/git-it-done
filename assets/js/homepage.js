const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

//fetch repo data through username search
const getUsersRepo = function (user) {
  fetch("https://api.github.com/users/" + user + "/repos").then((res) => {
    //req was successful
    if (res.ok) {
      res.json().then((data) => {
        displayRepos(data, user);
      });
    } else {
      alert("An Error Occured");
    }
  })
  .catch((e) => {
    alert("Unable to connect to GitHub");
  })
};

//Handles form submition data for user search
const formSubmitHandler = function (e) {
  e.preventDefault();
  const username = nameInputEl.value.trim();

  if (username) {
    getUsersRepo(username);
    userFormEl.reset();
  } else {
    alert("Plaese enter a GitHub username.");
  }
};

//Pass in data as repos and username as searchTerm
const displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (let i = 0; i < repos.length; i++) {
    let repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    let repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // check if api returned any repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // create a span element to hold repository name
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    let statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issue(s)";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    // append to container
    repoEl.appendChild(statusEl);

    // append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

//Event listeners
userFormEl.addEventListener("submit", formSubmitHandler);
