import directory from '../data/contributors.json';
import weekCredits from '../data/week-credits.json';
import communitySnapshot from '../data/community-answers.json';

export type Contributor = {
  name: string;
  github: string | null;
  roles: string[];
  type: string[];
  contributions: { label: string; href: string; type: 'content' | 'technical' }[];
};

export type AuthoredContent = {
  github: string;
  label: string;
  href: string;
};

export function contributorRecords(authoredContent: AuthoredContent[] = []): Contributor[] {
  const people = new Map<string, Contributor>();
  for (const record of directory) {
    if (people.has(record.name)) throw new Error(`Duplicate contributor: ${record.name}`);
    const contributions = 'contributions' in record ? (record.contributions ?? []) : [];
    people.set(record.name, { name: record.name, github: record.github, roles: [...record.roles], type: [...record.type], contributions: [...contributions] as Contributor['contributions'] });
  }
  for (const credit of weekCredits) {
    for (const [names, role] of [[credit.organizers, 'Question Organization'], [credit.reviewers, 'Review']] as const) {
      for (const name of names) {
        const person = people.get(name);
        if (!person) throw new Error(`Missing contributor record for ${name}`);
        if (!person.roles.includes(role)) person.roles.push(role);
        person.contributions.push({ label: `第${credit.week}周 · ${role === 'Question Organization' ? '习题整理' : '习题审核'}`, href: `/week/${String(credit.week).padStart(2, '0')}/`, type: 'content' });
      }
    }
  }
  const publicContributions = [...communitySnapshot.issueContributions, ...communitySnapshot.discussionContributions];
  for (const contribution of publicContributions) {
    const person = [...people.values()].find(item => item.github?.toLowerCase() === contribution.github.toLowerCase());
    if (person) {
      const role = contribution.label.startsWith('Issue') ? 'Issue Contribution' : 'Question / Solution Contribution';
      if (!person.roles.includes(role)) person.roles.push(role);
      if (!person.contributions.some(item => item.href === contribution.href)) person.contributions.push({ label: contribution.label, href: contribution.href, type: 'content' });
    } else {
      people.set(`@${contribution.github}`, { name: `@${contribution.github}`, github: contribution.github, roles: [contribution.label.startsWith('Issue') ? 'Issue Contribution' : 'Question / Solution Contribution'], type: ['content'], contributions: [{ label: contribution.label, href: contribution.href, type: 'content' }] });
    }
  }
  for (const contribution of authoredContent) {
    const person = [...people.values()].find(item => item.github?.toLowerCase() === contribution.github.toLowerCase());
    if (person) {
      if (!person.roles.includes('Question / Solution Contribution')) person.roles.push('Question / Solution Contribution');
      if (!person.type.includes('content')) person.type.push('content');
      if (!person.contributions.some(item => item.href === contribution.href)) person.contributions.push({ label: contribution.label, href: contribution.href, type: 'content' });
    } else {
      people.set(`@${contribution.github.toLowerCase()}`, {
        name: `@${contribution.github}`,
        github: contribution.github,
        roles: ['Question / Solution Contribution'],
        type: ['content'],
        contributions: [{ label: contribution.label, href: contribution.href, type: 'content' }],
      });
    }
  }
  return [...people.values()];
}
