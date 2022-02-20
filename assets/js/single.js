const issueContainerEl = document.querySelector("#issues-container");

const getRepoIssues = function(repo){
    const apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
    .then((res) => {
        if(res.ok){
            res.json().then((data) => {
                // pass response data to dom function
                displayIssues(data);
            })
        }
        else{
            alert("An issue occured");
        }
    })
    .catch((e) => {
        console.log(e, "An error occured")
    })
}

const displayIssues = function(issues) {
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        const issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        const titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        const typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        }

        else{
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
      }
};

getRepoIssues("ApolloSolo/frac-tank-db");