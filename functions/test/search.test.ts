import { expect, it } from 'vitest'
import { search } from '../src/search'

it('search', () => {
  expect(search('', '' as any)).toEqual([])

  const source = [
    { a: { aa: ['ABCDEFG'] } },
    { a: { aa: ['BCDEFGH'] } },
    { a: { aa: ['CDEFGHI'] } },
  ]

  expect(search({ a: { aa: ['BCDEFGH'] } }, source)).toEqual([{ a: { aa: ['BCDEFGH'] } }])

  expect(search('abcdefg', source, { key: 'a.aa[0]' })).toEqual([])

  expect(search('abcdefg', source, { key: 'a.aa[0]', caseSensitive: false })).toEqual([{ a: { aa: ['ABCDEFG'] } }])

  expect(search('B', source, { key: 'a.aa[0]' })).toEqual([])

  expect(search('B', source, { key: 'a.aa[0]', fuzzy: true })).toEqual([{ a: { aa: ['ABCDEFG'] } }, { a: { aa: ['BCDEFGH'] } }])

  expect(search('b', source, { key: 'a.aa[0]', fuzzy: true, caseSensitive: false })).toEqual([{ a: { aa: ['ABCDEFG'] } }, { a: { aa: ['BCDEFGH'] } }])

  expect(search('ab', ['ac', 'abc', 'bc'], { fuzzy: true })).toEqual(['abc'])
})
