export function repoURLToName(repoURL) {
  const splits = repoURL.split('/');
  return  {
    user: splits[splits.length - 4], 
    repo: splits[splits.length - 3],
  }
}

export function repoNameToDisplay({user, repo}) {
  return `${user}/${repo}`;
}
