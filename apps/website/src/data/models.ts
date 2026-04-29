import type { Model } from "../types/models.ts";

export const MOCK_LLM_MODELS: Model[] = [
  { id: "llama-3.1-8b", name: "Llama 3.1 8B Instruct", desc: "バランス型・推奨", size: "4.7 GB" },
  { id: "qwen-2.5-14b", name: "Qwen 2.5 14B", desc: "高精度・要GPU 12GB+", size: "8.2 GB" },
  { id: "gemma-2-9b", name: "Gemma 2 9B", desc: "軽量・速い", size: "5.4 GB" },
  { id: "phi-3-mini", name: "Phi-3 Mini 3.8B", desc: "超軽量", size: "2.3 GB" },
];

export const MOCK_WHISPER_MODELS: Model[] = [
  { id: "whisper-base", name: "Whisper Base", desc: "高速・標準精度", size: "142 MB" },
  { id: "whisper-small", name: "Whisper Small", desc: "推奨", size: "466 MB" },
  { id: "whisper-medium", name: "Whisper Medium", desc: "高精度", size: "1.5 GB" },
];

export const DEFAULT_LLM_MODEL_ID = "llama-3.1-8b";
export const DEFAULT_WHISPER_MODEL_ID = "whisper-small";
