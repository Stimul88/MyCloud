export function reduceText(text) {
  if(text.length >= 20){
    return text.split('', 20).join('') + '...'
  }
  return text
}