export function repoURLToName(repoURL) {
  const splits = repoURL.split('/');
  return  {
    user: splits[splits.length - 2], 
    repo: splits[splits.length - 1],
  }
}

export function repoNameToDisplay({user, repo}) {
  return `${user}/${repo}`;
}