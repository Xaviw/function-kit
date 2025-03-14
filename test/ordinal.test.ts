import { expect, it } from 'vitest'
import { ordinal } from '../src/ordinal'

it('ordinal', () => {
  expect(() => (ordinal as any)()).toThrow(TypeError)

  expect(ordinal(1)).toBe('1st')

  expect(ordinal(2)).toBe('2nd')

  expect(ordinal(3)).toBe('3rd')

  expect(ordinal(4)).toBe('4th')

  expect(ordinal(11)).toBe('11th')

  expect(ordinal(12)).toBe('12th')

  expect(ordinal(13)).toBe('13th')

  expect(ordinal(21)).toBe('21st')

  expect(ordinal(22)).toBe('22nd')

  expect(ordinal(23)).toBe('23rd')

  expect(ordinal(24)).toBe('24th')
})
