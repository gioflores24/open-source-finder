const cors = require('cors');
const morgan = require('morgan');
const Octokit = require("@octokit/rest");
const express = require('express');
const bodyParser = require('body-parser');

const DEFAULT_PORT = 5000;
const DEFAULT_PER_PAGE = 30;

// Initialize application
const app = express();
const port = process.env.PORT || DEFAULT_PORT;
const octokit = new Octokit();

// Add middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

// Add application routes
app.post('/finder', (req, res) => {
  const topic = req.body['topic'] || '';
  const language = req.body['language'] || '';

  // Retrieve projects
  octokit.search
        .repos({
            q: buildSearchQuery(topic, language),
            per_page: DEFAULT_PER_PAGE, 
        })
        .then(response => {
            const projects = [];
            for (let project of response['data']['items']) {
              projects.push(filterProject(project));
            }
            res.json(projects);
        })
        .catch((error) => {
          res.status(500);
          res.json(error);
        });
});

function buildSearchQuery(topic, language) {
  let query = 'good-first-issues:>0+archived:false';
  query += (topic != '') ? `+topic:${topic}` : '';
  query += (language != '') ? `+language:${language}` : '';
  return query;
}

function filterProject(project) {
    return {
      name: project["name"],
      html_url: project['html_url'],
      homepage: project['homepage'],
      language: project['language'],
      clone_url: project['clone_url'],
      description: project['description'],
      stargazers_count: project['stargazers_count'],
      open_issues_count: project['open_issues_count']
  };
}

// Start listening for clients
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
