import { expect, it } from 'vitest'
import { className } from '../src/className'

it('className', () => {
  expect(className('a', { b: true, c: false }, ['d', { e: true, f: false }, ['g']], false, 1)).toBe('a b d e g')
})
