import settings from '../data/site.json';
import questionDiscussions from '../data/question-discussions.json';
export const siteName = 'QTIA CUHK(SZ) Open Quant Interview Handbook';
export const repository = import.meta.env.PUBLIC_GITHUB_REPOSITORY || settings.repository;
export const branch = import.meta.env.PUBLIC_GITHUB_BRANCH || settings.branch;
if (repository && !/^[\w.-]+\/[\w.-]+$/.test(repository)) throw new Error('PUBLIC_GITHUB_REPOSITORY must be owner/repository');
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '/') => `${base}/${path.replace(/^\//, '')}`;
export const repoUrl = repository ? `https://github.com/${repository}` : url('/contributing/#repository-setup');
export const questionDiscussionUrl = (id: string) => {
  const number = (questionDiscussions as Record<string, number>)[id];
  return number ? `${repoUrl}/discussions/${number}` : `${repoUrl}/discussions`;
};
export function newSolutionUrl(id: string, title: string) {
  if (!repository) return repoUrl;
  const file = `content/solutions/${id}/solution.md`;
  const date = new Date().toISOString().slice(0, 10);
  const value = `---\nquestion: "${id}"\ntitle: ${JSON.stringify(`${title}的另一种解法`)}\nmethod: "请填写解法类型"\ncontributors: ["your-github-username"]\ndate: "${date}"\norder: 0\n---\n\n## 思路\n\n请在这里写出结论、假设和推导。提交前请把上方的 GitHub 用户名、解法名称和方法改成自己的。\n`;
  return `${repoUrl}/new/${encodeURIComponent(branch)}?${new URLSearchParams({ filename: file, value })}`;
}
const repoPath = (path: string) => path.split('/').map(encodeURIComponent).join('/');
export function githubAction(action: 'issue' | 'question-proposal' | 'edit' | 'history', file = '', id = '') {
  if (!repository) return repoUrl;
  if (action === 'issue') return `${repoUrl}/issues/new?template=question.yml&title=${encodeURIComponent(`[${id || 'Discussion'}] `)}`;
  if (action === 'question-proposal') return `${repoUrl}/issues/new?template=question-proposal.yml&title=${encodeURIComponent('社区题目投稿：')}`;
  if (action === 'edit') return `${repoUrl}/edit/${encodeURIComponent(branch)}/${repoPath(file)}`;
  return `${repoUrl}/commits/${encodeURIComponent(branch)}/${repoPath(file)}`;
}
