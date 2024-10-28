import FileSaver from 'file-saver';

export function getRandomPrompt(Prompt, GenerateText) {
  const randomIndex = Math.floor(Math.random() * GenerateText.length);
  const randomPrompt =  GenerateText[randomIndex];
  if (Prompt === randomPrompt) {
    return getRandomPrompt(Prompt);
  }
  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpeg`);
} 

export function isImage(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}