// Inline icons for doc.njk's ai-actions dropdown. Stays inline (not
// <img src>) so fill/stroke="currentColor" can inherit .ai-actions__icon's
// CSS color. Sources live in icons-src/; loading/optimizing/caching is
// shared with the sidebar-toggle icon via svg-icons.js.
import { loadIcon } from "./svg-icons.js";

const [chatgpt, perplexity, grok, claude, gemini, copyIcon, viewMarkdownIcon] = await Promise.all([
  loadIcon("chatgpt.svg"),
  loadIcon("perplexity.svg"),
  loadIcon("grok.svg"),
  loadIcon("claude.svg"),
  loadIcon("gemini.svg"),
  loadIcon("copy.svg"),
  loadIcon("view-markdown.svg"),
]);

export const AI_PROVIDER_ICONS = {
  ChatGPT: chatgpt,
  Perplexity: perplexity,
  Grok: grok,
  Claude: claude,
  Gemini: gemini,
};

export const COPY_ICON = copyIcon;
export const VIEW_MARKDOWN_ICON = viewMarkdownIcon;
