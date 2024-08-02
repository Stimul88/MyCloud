// export function bytesToMegaBytes(bytes) {
//   return bytes / (1024*1024);
// }

export function bytesToMegaBytes(bytes, precision = 2) {
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    throw new Error('Ввод должен быть числом');
  }
  const sign = bytes < 0 ? '-' : '';
  if (bytes === 0) return '0 Байт';

  bytes = Math.abs(bytes);
  const units = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return sign + (bytes / Math.pow(1024, index)).toFixed(precision) + ' ' + units[index];
}