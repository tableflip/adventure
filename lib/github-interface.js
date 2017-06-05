const rc = require('rc')
const request = require('request-promise-native')

const config = rc('github', { username: '', token: '' })
const auth = {
  user: config.username,
  pass: config.token
}

const githubApiBase = 'https://api.github.com'
const githubHeaders = {
  'User-Agent': 'tableflip-adventure'
}

// Adds the given version number as a tag to all of the supplied repos and a prerelease
// with the supplied message to the first repo in the array.
// Returns a promise that resolves to the Github API release-creation response
// For example:
// prerelease({
//   repos: ['tableflip/project-frontend', 'tableflip/project-api'],
//   version: 'v2.0.0',
//   message: 'Adds notifications and basic admin console'
// })
async function prerelease ({ repos, version, message }) {
  const tags = repos.map((repo) => tagRepo({ repo, version }))
  await Promise.all(tags)
  return prereleaseRepo({ repo: repos[0], version, message })
}

async function tagRepo ({ repo, version }) {
  const lastCommit = await request({
    method: 'GET',
    url: `${githubApiBase}/repos/${repo}/commits/master`,
    auth,
    json: true,
    headers: githubHeaders
  })

  if (!lastCommit || !lastCommit.sha) throw new Error(`Cannot get latest sha for the repo ${repo}`)

  return request({
    method: 'POST',
    url: `${githubApiBase}/repos/${repo}/git/refs`,
    auth,
    json: {
      ref: `refs/tags/${version}`,
      sha: lastCommit.sha
    },
    headers: githubHeaders
  })
}

function prereleaseRepo ({ repo, version, message }) {
  return request({
    method: 'POST',
    url: `${githubApiBase}/repos/${repo}/releases`,
    auth,
    json: {
      tag_name: version,
      target_commitish: 'master',
      name: version,
      body: message,
      prerelease: true
    },
    headers: githubHeaders
  })
}

module.exports = {
  prerelease
}
