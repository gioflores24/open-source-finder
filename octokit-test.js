const Octokit = require("@octokit/rest");
const octokit = new Octokit();

/* Initialize search parameters */
const keyword = "keras";
const topic = "machine-learning";
const language = "python";
const per_page = 10;
const push_date = '2018-01-01';

/* Build search query */
let query = "good-first-issues:>0+archived:false";
if (topic != "") {
    query += `+topic:${topic}`;
}
if (language != "") {
    query += `+language:${language}`;
}
if (push_date != "") {
    query += `+pushed:>${push_date}`;
}
if (keyword != "") {
    query = `${keyword} ${query}`;
}

/* Search for the repositories. */
octokit.search
    .repos({
        q: query,
        // sort: 'stars',
        // order: 'desc',
        per_page: per_page,
    })
    .then(response => {
        console.log(response);

        /* Retrieve repositories */
        const repos = response["data"]["items"];
        for (let repo of repos) {
            console.log(filterRepo(repo));
        }
    });

function filterRepo(repo) {
    return {
        name: repo["name"],
        html_url: repo['html_url'],
    };
}
