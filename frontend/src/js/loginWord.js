export const loginWord = (name)  =>{
  const nameParts = name.split(" ");
  return nameParts[0] ? nameParts[0][0] : "";
}