import { isString } from './is'

/**
 * [MDN：常见 MIME 类型列表](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types/Common_types)
 */
const exts: Record<string, string[]> = {
  // image
  'image/jpeg': ['jpeg', 'jpg'],
  'image/png': ['png'],
  'image/apng': ['apng'],
  'image/gif': ['gif'],
  'image/avif': ['avif'],
  'image/webp': ['webp'],
  'image/tiff': ['tif', 'tiff'],
  'image/bmp': ['bmp'],
  'image/vnd.adobe.photoshop': ['psd'],
  'image/svg+xml': ['svg'],
  'image/vnd.microsoft.icon': ['ico'],
  // audio
  'audio/aac': ['aac'],
  'audio/mp4': ['m4a', 'mp4a'],
  'audio/midi': ['mid', 'midi'],
  'audio/mpeg': ['mp3'],
  'audio/ogg': ['oga'],
  'audio/wav': ['wav'],
  'audio/opus': ['opus'],
  'audio/webm': ['weba'],
  'audio/3gpp': ['3gp'],
  'audio/3gpp2': ['3g2'],
  // video
  'video/mp4': ['mp4'],
  'video/x-matroska': ['mkv'],
  'video/webm': ['webm'],
  'video/x-msvideo': ['avi'],
  'video/quicktime': ['qt', 'mov'],
  'video/mpeg': ['mpeg', 'mpg'],
  'video/3gpp': ['3gp'],
  'video/3gpp2': ['3g2'],
  'video/mp2t': ['ts'],
  'video/ogg': ['ogv'],
  // text
  'text/css': ['css'],
  'text/html': ['html', 'htm'],
  'text/yaml': ['yaml', 'yml'],
  'text/csv': ['csv'],
  'text/markdown': ['markdown', 'md'],
  'text/plain': ['txt'],
  'text/calendar': ['ics'],
  'text/javascript': ['js', 'mjs'],
  // font
  'font/ttf': ['ttf'],
  'font/woff': ['woff'],
  'font/woff2': ['woff2'],
  'font/otf': ['otf'],
  'application/vnd.ms-fontobject': ['eot'],
  // application
  'application/zip': ['zip'],
  'application/x-tar': ['tar'],
  'application/x-rar-compressed': ['rar'],
  'application/gzip': ['gz'],
  'application/x-7z-compressed': ['7z'],
  'application/octet-stream': ['bin'],
  'application/epub+zip': ['epub'],
  'application/javascript': ['js'],
  'application/json': ['json'],
  'application/msword': ['doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
  'application/vnd.ms-excel': ['xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
  'application/vnd.ms-powerpoint': ['ppt'],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['pptx'],
  'application/pdf': ['pdf'],
  'application/wasm': ['wasm'],
  'application/xml': ['xml'],
  'application/xml-dtd': ['dtd'],
  'application/x-bzip': ['bz'],
  'application/x-bzip2': ['bz2'],
  'application/x-abiword': ['abw'],
  'application/x-freearc': ['arc'],
  'application/vnd.amazon.ebook': ['azw'],
  'application/x-cdf': ['cda'],
  'application/x-csh': ['csh'],
  'application/java-archive': ['jar'],
  'application/ld+json': ['jsonld'],
  'application/vnd.apple.installer+xml': ['mpkg'],
  'application/vnd.oasis.opendocument.presentation': ['odp'],
  'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
  'application/vnd.oasis.opendocument.text': ['odt'],
  'application/ogg': ['ogx'],
  'application/x-httpd-php': ['php'],
  'application/rtf': ['rtf'],
  'application/x-sh': ['sh'],
  'application/xhtml+xml': ['xhtml'],
  'application/vnd.visio': ['vsd'],
  'application/vnd.mozilla.xul+xml': ['xul'],
}

/**
 * 根据扩展名查询 mime
 */
/**
 * 根据文件扩展名获取对应的 MIME 类型
 * @param ext - 文件扩展名（不含点号）
 * @returns 返回对应的 MIME 类型，如果未找到则返回 undefined
 * @example
 * ```ts
 * getMimeFromExtension('jpg') // 'image/jpeg'
 * getMimeFromExtension('mp4') // 'video/mp4'
 * getMimeFromExtension('unknown') // undefined
 * ```
 */
export function getMimeFromExtension(ext: string): string | undefined {
  if (!isString(ext))
    return

  return Object.keys(exts).find(item => exts[item]?.includes(ext))
}

/**
 * 根据 mime 查询对应的扩展名
 */
/**
 * 根据 MIME 类型获取对应的文件扩展名列表
 * @param mime - MIME 类型字符串
 * @returns 返回扩展名数组，如果未找到则返回 undefined
 * @example
 * ```ts
 * getExtensionsFromMime('image/jpeg') // ['jpeg', 'jpg']
 * getExtensionsFromMime('audio/mp3') // ['mp3']
 * getExtensionsFromMime('unknown/type') // undefined
 * ```
 */
export function getExtensionsFromMime(mime: string): string[] | undefined {
  if (!isString(mime))
    return

  return exts[mime]
}
