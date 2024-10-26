import type { ModelInfo } from './types';
export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'claude-3-5-sonnet-20240620';
export const DEFAULT_PROVIDER = 'Anthropic';

const staticModels: ModelInfo[] = [
  { name: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet', provider: 'Anthropic' },
  { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI' },
  { name: 'anthropic/claude-3.5-sonnet', label: 'Anthropic: Claude 3.5 Sonnet (OpenRouter)', provider: 'OpenRouter' },
  { name: 'anthropic/claude-3-haiku', label: 'Anthropic: Claude 3 Haiku (OpenRouter)', provider: 'OpenRouter' },
  { name: 'deepseek/deepseek-coder', label: 'Deepseek-Coder V2 236B (OpenRouter)', provider: 'OpenRouter' },
  { name: 'google/gemini-flash-1.5', label: 'Google Gemini Flash 1.5 (OpenRouter)', provider: 'OpenRouter' },
  { name: 'google/gemini-pro-1.5', label: 'Google Gemini Pro 1.5 (OpenRouter)', provider: 'OpenRouter' },
  { name: 'mistralai/mistral-nemo', label: 'OpenRouter Mistral Nemo (OpenRouter)', provider: 'OpenRouter' },
  { name: 'qwen/qwen-110b-chat', label: 'OpenRouter Qwen 110b Chat (OpenRouter)', provider: 'OpenRouter' },
  { name: 'cohere/command', label: 'Cohere Command (OpenRouter)', provider: 'OpenRouter' },
  { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', provider: 'Google' },
  { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', provider: 'Google'},
  { name: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70b (Groq)', provider: 'Groq' },
  { name: 'llama-3.1-8b-instant', label: 'Llama 3.1 8b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-11b-vision-preview', label: 'Llama 3.2 11b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-3b-preview', label: 'Llama 3.2 3b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-1b-preview', label: 'Llama 3.2 1b (Groq)', provider: 'Groq' },
  { name: 'claude-3-opus-20240229', label: 'Claude 3 Opus', provider: 'Anthropic' },
  { name: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { name: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'Anthropic' },
  { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },
  { name: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
  { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { name: 'deepseek-coder', label: 'Deepseek-Coder', provider: 'Deepseek'},
  { name: 'deepseek-chat', label: 'Deepseek-Chat', provider: 'Deepseek'},
  { name: 'open-mistral-7b', label: 'Mistral 7B', provider: 'Mistral' },
  { name: 'open-mixtral-8x7b', label: 'Mistral 8x7B', provider: 'Mistral' },
  { name: 'open-mixtral-8x22b', label: 'Mistral 8x22B', provider: 'Mistral' },
  { name: 'open-codestral-mamba', label: 'Codestral Mamba', provider: 'Mistral' },
  { name: 'open-mistral-nemo', label: 'Mistral Nemo', provider: 'Mistral' },
  { name: 'ministral-8b-latest', label: 'Mistral 8B', provider: 'Mistral' },
  { name: 'mistral-small-latest', label: 'Mistral Small', provider: 'Mistral' },
  { name: 'codestral-latest', label: 'Codestral', provider: 'Mistral' },
  { name: 'mistral-large-latest', label: 'Mistral Large Latest', provider: 'Mistral' },
];

export let MODEL_LIST: ModelInfo[] = [...staticModels];
export function hasModel(modelName:string,provider:string): boolean {
  for (const model of MODEL_LIST) {
    if ( model.provider === provider && model.name === modelName) {
      return true;
    }
  }
  return false
}
export const IS_SERVER = typeof window === 'undefined';

export function setModelList(models: ModelInfo[]): void {
  MODEL_LIST = models;
}

export function getStaticModels(): ModelInfo[] {
  return [...staticModels];
}
export let isInitialized = false;

export async function initializeModelList(): Promise<ModelInfo[]> {
  if (isInitialized) {
    return MODEL_LIST;
  }
  if (IS_SERVER){
    isInitialized = true;
    return MODEL_LIST;
  }
  isInitialized = true;
  const response = await fetch('/api/models');
  MODEL_LIST = (await response.json()) as ModelInfo[];
  return MODEL_LIST;
}
