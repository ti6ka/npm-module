const needle = require("needle");
const Promise = require("bluebird");
Promise.promisifyAll(needle);

function topRep(user)
{
    return new Promise((resolve, reject) =>
    {
        needle.getAsync('https://api.github.com/users/' + user + '/repos')
        .then((response)=>
        {
            var repoArray = [];
            response.body.every((item, index)=>
            {
                var repo =
                {
                    id: item.id,
                    name: item.name,
                    url: item.html_url
                }
                repoArray.push(repo);
                return index !=9;
            });
            resolve(repoArray);
        })
    })
}

function findRep(name)
{
    return new Promise((resolve, reject) =>
    {
        needle.getAsync('https://api.github.com/search/repositories?q='+name)
        .then((response)=>
        {
            var repoArray = [];
            response.body.items.every((item, index)=>
            {
                var repo =
                {
                    id: item.id,
                    name: item.name,
                    owner: item.owner.login,
                    url: item.html_url
                }
                repoArray.push(repo);
                return index !=9;
            });
            resolve(repoArray);
        })
    })
}

function lastCommits(user,repository)
{
    return new Promise((resolve, reject) =>
    {
        needle.getAsync('https://api.github.com/repos/'+user+'/'+repository+'/commits')
        .then((response)=>
        {
            var repoArray = [];
            response.body.every((item, index)=>
            {
                var repo =
                {
                    sha: item.sha,
                    author: item.author.login,
                    message: item.commit.message,
                    date: item.commit.committer.date,
                }
                repoArray.push(repo);
                return index !=9;
            });
            resolve(repoArray);
        })
    })
}

exports.topRep = topRep;
exports.findRep = findRep;
exports.lastCommits = lastCommits;