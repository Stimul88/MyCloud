import {bytesToMegaBytes} from "./convertMB";

export function calculateSum(array, property) {
  const total = array.reduce((accumulator, object) => {
    return accumulator + Number(object[property]);
  }, 0);

  return bytesToMegaBytes(Number(total));
}
