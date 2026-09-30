import test from 'node:test';
import assert from 'node:assert/strict';
import { renderCommunityComment } from '../src/lib/render-community-comment.mjs';

test('plain answers and TeX render while unsafe links and HTML stay inert', () => {
  const html = renderCommunityComment('答案是 $x^2$，因为 $x>0$。\n\n$$E[X]=2$$\n\n<script>alert(1)</script> [click](javascript:alert(1))');
  assert.match(html, /答案是/);
  assert.match(html, /katex/);
  assert.match(html, /E \[ X \] 等于 2/);
  assert.doesNotMatch(html, /<script|href="javascript:/i);
});
