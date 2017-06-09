const rc = require('rc')
const request = require('request-promise-native')
const semver = require('semver')

const config = rc('github', { username: '', token: '' })
const auth = {
  user: config.username,
  pass: config.token
}

const githubApiBase = 'https://api.github.com'
const githubHeaders = {
  'User-Agent': 'tableflip-adventure'
}

// Aggregates stats for the given release of the supplied repos.
// Returns a promise which resolves to an object of the form:
//
// {
//   commits: 100,
//   additions: 1234,
//   deletions: 123
// }
//
// For example:
//
// releaseStats({
//   repos: ['tableflip/project-frontend', 'tableflip/project-api'],
//   version: 'v2.0.0'
// })
function releaseStats ({ repos, version }) {
  const stats = repos.map((repo) => repoReleaseStats({ repo, version }))
  return Promise.all(stats)
    .then((reposData) => {
      return reposData.reduce((memo, repoData) => {
        return {
          commits: memo.commits + repoData.commits,
          additions: memo.additions + repoData.additions,
          deletions: memo.deletions + repoData.deletions
        }
      }, { commits: 0, additions: 0, deletions: 0 })
    })
}

// Gets the aggregate stats for the given repo and version, by comparing it to the previous tagged version if available,
// or summarising the whole history if not
async function repoReleaseStats ({ repo, version }) {
  const releaseTags = await getTags({ repo })
  const tagIndex = releaseTags.indexOf(version)

  if (tagIndex === -1) throw new Error(`There is no release tagged ${version}`)

  const previousVersion = releaseTags[tagIndex + 1]

  if (previousVersion) {
    return getCommitComparison({ repo, lastCommit: version, firstCommit: previousVersion })
  } else {
    return getRepoStats({ repo })
  }
}

// Gets aggregate comparison stats between the two supplied commits (which could be branches or tags)
async function getCommitComparison ({ repo, firstCommit, lastCommit }) {
  const stats = await request({
    method: 'GET',
    url: `${githubApiBase}/repos/${repo}/compare/${firstCommit}...${lastCommit}`,
    auth,
    json: true,
    headers: githubHeaders
  })

  const lineStats = stats.files.reduce((memo, file) => {
    return {
      additions: memo.additions + file.additions,
      deletions: memo.deletions + file.deletions
    }
  }, { additions: 0, deletions: 0 })

  return {
    commits: stats.commits.length,
    additions: lineStats.additions,
    deletions: lineStats.deletions
  }
}

// Gets aggregate stats for the full history of a repo - this is used if there was no previous tag to compare against
async function getRepoStats ({ repo }) {
  const stats = await request({
    method: 'GET',
    url: `${githubApiBase}/repos/${repo}/stats/contributors`,
    auth,
    json: true,
    headers: githubHeaders
  })

  if (!stats || !stats.length) throw new Error(`Cannot get stats for ${repo}`)

  return stats[0].weeks.reduce((memo, week) => {
    return {
      commits: memo.commits + week.c,
      additions: memo.additions + week.a,
      deletions: memo.deletions + week.d
    }
  }, { commits: 0, additions: 0, deletions: 0 })
}

// Returns a repo's tags in reverse chronological order
async function getTags ({ repo }) {
  const tags = await request({
    method: 'GET',
    url: `${githubApiBase}/repos/${repo}/tags`,
    auth,
    json: true,
    headers: githubHeaders
  })

  return tags.map((tag) => tag.name)
}

// Adds the given version number as a tag to all of the supplied repos and a prerelease
// with the supplied message to the first repo in the array.
// Returns a promise that resolves to the Github API release-creation response
//
// For example:
//
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

// Adds a the supplied version tag to the current master branch in the given repo
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

// Adds a release (with the prerelease flag) to the supplied version, with the supplied message, to the given repo
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

// Gets the package.json for a repo, assuming it's located in the root.  Throws if no such package.json is found
async function getPackageJson ({ repo }) {
  const res = await request({
    method: 'GET',
    url: `${githubApiBase}/repos/${repo}/contents/package.json`,
    auth,
    json: true,
    headers: githubHeaders
  })
  const buf = Buffer.from(res.content, 'base64')
  return {
    json: JSON.parse(buf.toString('utf8')),
    sha: res.sha
  }
}

// Returns the version number from the given repo's package.json, or throws if it can't be found
async function getVersion ({ repo }) {
  const { json } = await getPackageJson({ repo })
  return json.version
}

// Returns the supplied version number bumped for the next release.
// releaseType may be 'major', 'minor' or 'patch'.
function bumpVersion ({ version, releaseType }) {
  return semver.inc(version, releaseType)
}

// Sets the version number in the given repo to the supplied number, assuming it's in the repo root.
// Throws if the repo or package.json can't be found.
async function setVersion ({ repo, version }) {
  const { json, sha } = await getPackageJson({ repo })

  // Not passing loose=true to semver because this goes in package.json
  if (!semver.valid(version)) {
    throw new Error(`${version} is not a valid semver version number`)
  }

  if (semver.lte(version, json.version)) {
    throw new Error(`${version} is not greater than ${json.version}`)
  }

  json.version = version

  const content = Buffer.from(JSON.stringify(json, null, 2), 'utf8').toString('base64')
  return request({
    method: 'PUT',
    url: `${githubApiBase}/repos/${repo}/contents/package.json`,
    auth,
    json: {
      path: 'package.json',
      message: version,
      content,
      sha
    },
    headers: githubHeaders
  })
}

module.exports = {
  prerelease,
  releaseStats,
  getVersion,
  bumpVersion,
  setVersion
}
