import { GenerateText } from '../constants/cons';

export function getRandomPrompt(Prompt) {
  const randomIndex = Math.floor(Math.random() * GenerateText.length);
  const randomPrompt =  GenerateText[randomIndex];
  if (Prompt === randomPrompt) {
    return getRandomPrompt(Prompt);
  }
  return randomPrompt;
}