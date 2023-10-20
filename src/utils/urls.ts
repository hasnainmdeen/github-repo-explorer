export const getGitHubReposUrl = (owner: string, repo: string, path: string): string => 
  `${process.env.GITHUB_API_URL}/repos/${owner}/${repo}/contents/${path}`;

export const getGitHubSearchUrl = (): string => 
  `${process.env.GITHUB_API_URL}/search/repositories`;

export const getGitHubOAuthUrl = (): string => 
`${process.env.GITHUB_LOGIN_URL}/oauth/authorize?client_id=${process.env.CLIENT_ID}`;

export const getGitHubOAuthAccessTokenUrl = (code: string): string => 
`${process.env.GITHUB_LOGIN_URL}/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`;