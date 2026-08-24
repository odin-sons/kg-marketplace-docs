// Inline icons for doc.njk's ai-actions dropdown. Stays inline (not
// <img src>) so fill/stroke="currentColor" can inherit .ai-actions__icon's
// CSS color. Sources live in icons-src/; loading/optimizing/caching is
// shared with the sidebar-toggle icon via svg-icons.js.
import { loadIcon } from "./svg-icons.js";

const [chatgpt, perplexity, grok, claude, geminiSpark, deepseek, copyIcon, viewMarkdownIcon] = await Promise.all([
  loadIcon("chatgpt.svg"),
  loadIcon("perplexity.svg"),
  loadIcon("grok.svg"),
  loadIcon("claude.svg"),
  // No simple-icons entry for Google AI Studio exists (a submission was
  // closed unmerged) — reused for the AI Studio menu entry since it's the
  // same Google-AI sparkle mark AI Studio's own UI uses.
  loadIcon("gemini.svg"),
  loadIcon("deepseek.svg"),
  loadIcon("copy.svg"),
  loadIcon("view-markdown.svg"),
]);

export const AI_PROVIDER_ICONS = {
  ChatGPT: chatgpt,
  Perplexity: perplexity,
  Grok: grok,
  Claude: claude,
  "Google AI Studio": geminiSpark,
  DeepSeek: deepseek,
};

export const COPY_ICON = copyIcon;
export const VIEW_MARKDOWN_ICON = viewMarkdownIcon;
