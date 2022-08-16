export function repoURLToName(repoURL) {
  const splits = repoURL.split('/');
  return  splits[splits.length - 2] + "/" + splits[splits.length - 1];
}
