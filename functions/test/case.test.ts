import { expect, it } from 'vitest'
import { camelCase, kebabCase, pascalCase, snakeCase, splitCase, upperFirst, upperSnakeCase } from '../src/case'

it('upperFirst', () => {
  expect(upperFirst('hello')).toBe('Hello')
  expect(upperFirst('')).toBe('')
  expect(upperFirst('a')).toBe('A')
})

it('splitCase', () => {
  expect(splitCase('helloWorld')).toEqual(['hello', 'world'])
  expect(splitCase('hello-world')).toEqual(['hello', 'world'])
  expect(splitCase('hello_world')).toEqual(['hello', 'world'])
  expect(splitCase('hello.world')).toEqual(['hello', 'world'])
  expect(splitCase('hello world')).toEqual(['hello', 'world'])
  expect(splitCase('')).toEqual([])
})

it('camelCase', () => {
  expect(camelCase('hello-world')).toBe('helloWorld')
  expect(camelCase('HelloWorld')).toBe('helloWorld')
  expect(camelCase('HELLO_WORLD')).toBe('helloWorld')
  expect(camelCase('')).toBe('')
})

it('pascalCase', () => {
  expect(pascalCase('hello-world')).toBe('HelloWorld')
  expect(pascalCase('helloWorld')).toBe('HelloWorld')
  expect(pascalCase('hello_world')).toBe('HelloWorld')
  expect(pascalCase('')).toBe('')
})

it('kebabCase', () => {
  expect(kebabCase('helloWorld')).toBe('hello-world')
  expect(kebabCase('HelloWorld')).toBe('hello-world')
  expect(kebabCase('hello_world')).toBe('hello-world')
  expect(kebabCase('')).toBe('')
})

it('snakeCase', () => {
  expect(snakeCase('helloWorld')).toBe('hello_world')
  expect(snakeCase('HelloWorld')).toBe('hello_world')
  expect(snakeCase('hello-world')).toBe('hello_world')
  expect(snakeCase('')).toBe('')
})

it('upperSnakeCase', () => {
  expect(upperSnakeCase('helloWorld')).toBe('HELLO_WORLD')
  expect(upperSnakeCase('HelloWorld')).toBe('HELLO_WORLD')
  expect(upperSnakeCase('hello-world')).toBe('HELLO_WORLD')
  expect(upperSnakeCase('')).toBe('')
})
