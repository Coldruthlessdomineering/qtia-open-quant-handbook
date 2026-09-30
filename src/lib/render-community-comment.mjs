import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import remarkLatexDelimiters from './remark-latex-delimiters.mjs';
import rehypeAccessibleKatex from './rehype-accessible-katex.mjs';

// GitHub comment bodies are untrusted. Raw HTML is deliberately not passed through.
function safeLinks() {
  return tree => {
    function visit(node) {
      if (!node.children) return;
      node.children = node.children.flatMap(child => {
        if ((child.type === 'link' || child.type === 'image') && !/^https?:\/\//i.test(child.url || '')) {
          if (child.type === 'image') return [{ type: 'text', value: child.alt || '' }];
          visit(child);
          return child.children;
        }
        visit(child);
        return [child];
      });
    }
    visit(tree);
  };
}
const processor = unified()
  .use(remarkParse)
  .use(remarkLatexDelimiters)
  .use(remarkMath)
  .use(safeLinks)
  .use(remarkRehype)
  .use(rehypeKatex, { strict: 'ignore', throwOnError: false, trust: false })
  .use(rehypeAccessibleKatex)
  .use(rehypeStringify);

export function renderCommunityComment(body) {
  return String(processor.processSync(body || ''));
}
