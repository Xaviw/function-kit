export function isOnlineUrl(url: string): boolean {
  return /(?:(?:ht|f)tps?|cloud):\/\/[^ \\/]*\.[^ \\/]*\/?/.test(url)
}

export function isDataUrl(url: string): boolean {
  return /data:image\/\w+;base64,.*/.test(url)
}

export function isValidUrl(url: string): boolean {
  return isOnlineUrl(url) || isDataUrl(url)
}
