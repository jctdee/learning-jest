import { RegisterHandler } from '../../../app/server_app/handlers/RegisterHandler'
import { IncomingMessage, ServerResponse } from 'http'
import { Authorizer } from '../../../app/server_app/auth/Authorizer'
import {
  HTTP_METHODS,
  HTTP_CODES,
} from '../../../app/server_app/model/ServerModel'
import type { Account } from '../../../app/server_app/model/AuthModel'

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/server_app/utils/Utils', () => ({
  getRequestBody: () => getRequestBodyMock(),
}))

describe('RegisterHandler test suite', () => {
  let sut: RegisterHandler

  const request = {
    method: undefined,
  }

  const responseMock = {
    statusCode: 0,
    writeHead: jest.fn(),
    write: jest.fn(),
  }

  const authorizerMock = {
    registerUser: jest.fn(),
  }

  const someAccount: Account = {
    id: '',
    password: 'somePassword',
    userName: 'someUserName',
  }

  const someId = 'someUserName'

  beforeEach(() => {
    sut = new RegisterHandler(
      request as IncomingMessage,
      responseMock as any as ServerResponse,
      authorizerMock as any as Authorizer
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register valid accounts in request', async () => {
    request.method = HTTP_METHODS.POST
    getRequestBodyMock.mockResolvedValueOnce(someAccount)

    authorizerMock.registerUser.mockResolvedValueOnce(someId)

    await sut.handleRequest()

    expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
    expect(responseMock.writeHead).toBeCalledWith(HTTP_CODES.CREATED, {
      'Content-Type': 'application/json',
    })

    expect(responseMock.write).toBeCalledWith(
      JSON.stringify({ userId: someId })
    )
  })
})
