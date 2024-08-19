import { getStringInfo, toUpperCase, StringUtils } from '../app/Utils'

describe.skip('Utils test suite', () => {
  describe('StringUtils tests', () => {
    let sut: StringUtils

    beforeEach(() => {
      sut = new StringUtils()
    })

    it('should return correct upperCase', () => {
      const actual = sut.toUpperCase('abc')
      expect(actual).toBe('ABC')
    })

    it('should throw error on invalid argument - function', () => {
      function expectError() {
        const actual = sut.toUpperCase('')
      }
      expect(expectError).toThrowError('Invalid argument!')
    })

    it('should throw error on invalid argument - arrow function', () => {
      expect(() => {
        sut.toUpperCase('')
      }).toThrowError('Invalid argument!')
    })

    it('should throw error on invalid argument - try catch block', () => {
      try {
        sut.toUpperCase('')
      } catch (err) {
        expect(err).toBeInstanceOf(Error)
      }
    })
  })

  it('should return uppercase of valid string', () => {
    // arange:
    const sut = toUpperCase
    const expected = 'ABC'

    // act
    const actual = sut('abc')

    // assert:
    expect(actual).toBe(expected)
  })

  it('should return info for valid string', () => {
    const actual = getStringInfo('My-String')

    expect(actual.lowerCase).toBe('my-string')
    expect(actual.extraInfo).toEqual({})

    expect(actual.characters.length).toBe(9)
    expect(actual.characters).toHaveLength(9)

    expect(actual.characters).toEqual([
      'M',
      'y',
      '-',
      'S',
      't',
      'r',
      'i',
      'n',
      'g',
    ])
    expect(actual.characters).toContain<string>('M')

    expect(actual.extraInfo).not.toBe(undefined)
    expect(actual.extraInfo).not.toBeUndefined()
  })

  describe('ToUpperCase examples', () => {
    it.each([
      {
        input: 'abc',
        expected: 'ABC',
      },
      {
        input: 'My-String',
        expected: 'MY-STRING',
      },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input)

      expect(actual).toBe(expected)
    })
  })
})
