const request = require("request");

let profileName = process.argv.slice(2)[0];

function print(aardvark) {
  console.log(aardvark);
}

let languages = [];

const getRepos = {
  url: "https://api.github.com/users/" + profileName + "/repos",
  method: "GET",
  headers: {
    Accept: "application.json",
    "Accept-Charset": "utf-8",
    "User-Agent": "my-reddit-client"
  }
};

function mostRecurring(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();
}

request(getRepos, function(err, res, body) {
  let repos = JSON.parse(body);
  for (i in repos) {
    languages.push(repos[i].language);
  }
  filtered = languages.filter(function(el) {
    return el != null;
  });

  print(mostRecurring(filtered));
});
