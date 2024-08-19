import {
  calculateComplexity,
  toUpperCaseWithCallBack,
} from "../../app/doubles/OtherUtils"
import {
  OtherStringUtils,
  PickedStringInfo,
} from "../../app/doubles/OtherUtils"

describe.skip("OtherUtils test suite", () => {
  describe("OtherStringUtils test with spies", () => {
    let sut: OtherStringUtils

    beforeEach(() => {
      sut = new OtherStringUtils()
    })

    test("Use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase")
      sut.toUpperCase("asa")

      expect(toUpperCaseSpy).toBeCalledWith("asa")
    })

    test("Use a spy to track calls to other module", () => {
      const consoleLogSpy = jest.spyOn(console, "log")
      sut.logString("abc")
      expect(consoleLogSpy).toBeCalledWith("abc")
    })

    test("Use a spy to replace the implementation of a method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("calling mocked implementation!!!")
      })
      ;(sut as any).callExternalService()
    })
  })

  describe("Tracking callsbacks with Jest mocks", () => {
    const callBackMock = jest.fn()

    afterEach(() => {
      jest.clearAllMocks()
    })

    it("ToUpperCase - calls callback for invalid argument - track calls", () => {
      // using a mock here
      const actual = toUpperCaseWithCallBack("", callBackMock)
      expect(actual).toBeUndefined()
      expect(callBackMock).toBeCalledWith("Invalid argument")
      expect(callBackMock).toBeCalledTimes(1)
    })

    it("ToUpperCase - calls callback for valid argument - track calls", () => {
      // using a mock here
      const actual = toUpperCaseWithCallBack("abc", callBackMock)
      expect(actual).toBe("ABC")
      expect(callBackMock).toBeCalledWith("called function with abc")
      expect(callBackMock).toBeCalledTimes(1)
    })
  })

  describe("Tracking callbacks", () => {
    let cbArgs = []
    let timesCalled = 0

    function callBackMock(arg: string) {
      cbArgs.push(arg)
      timesCalled++
    }

    afterEach(() => {
      cbArgs = []
      timesCalled = 0
    })

    it("ToUpperCase - calls callback for invalid argument - track calls", () => {
      // using a mock here
      const actual = toUpperCaseWithCallBack("", callBackMock)
      expect(actual).toBeUndefined()
      expect(cbArgs).toEqual(["Invalid argument"])
      expect(timesCalled).toBe(1)
    })

    it("ToUpperCase - calls callback for valid argument - track calls", () => {
      // using a mock here
      const actual = toUpperCaseWithCallBack("abc", callBackMock)
      expect(actual).toBe("ABC")
      expect(cbArgs).toEqual(["called function with abc"])
      expect(timesCalled).toBe(1)
    })
  })

  it("ToUpperCase - calls callback for invalid argument", () => {
    // fake is used as an example here for the function
    const actual = toUpperCaseWithCallBack("", () => {})
    expect(actual).toBeUndefined()
  })

  it("ToUpperCase - calls callback for valid argument", () => {
    // fake is used as an example here for the function
    const actual = toUpperCaseWithCallBack("abc", () => {})
    expect(actual).toBe("ABC")
  })

  it("Calculates complexcity", () => {
    // someInfo is an example of a stub because it is incomplete
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: "someInfo",
        field2: "someOtherInfo",
      },
    }

    // this should be the correct way to type it
    // const someInfo: PickedStringInfo = {
    //   length: 5,
    //   extraInfo: {
    //     field1: "someInfo",
    //     field2: "someOtherInfo",
    //   },
    // }

    const actual = calculateComplexity(someInfo as any)
    expect(actual).toBe(10)
  })
})
