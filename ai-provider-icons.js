import { loadIcon } from "./svg-icons.js";

const [chatgpt, perplexity, grok, claude, geminiSpark, deepseek, copyIcon, viewMarkdownIcon] = await Promise.all([
  loadIcon("chatgpt.svg"),
  loadIcon("perplexity.svg"),
  loadIcon("grok.svg"),
  loadIcon("claude.svg"),
  // gemini.svg is reused for Google AI Studio — no dedicated icon exists, same sparkle mark.
  loadIcon("gemini.svg"),
  loadIcon("deepseek.svg"),
  loadIcon("copy.svg"),
  loadIcon("view-markdown.svg"),
]);

export const AI_PROVIDER_ICONS = {
  ChatGPT: chatgpt,
  Perplexity: perplexity,
  Grok: grok,
  "Claude Desktop": claude,
  "Google AI Studio": geminiSpark,
  DeepSeek: deepseek,
};

export const COPY_ICON = copyIcon;
export const VIEW_MARKDOWN_ICON = viewMarkdownIcon;
