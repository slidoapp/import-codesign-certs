import {jest} from '@jest/globals'

export const exec = jest.fn(
  async (
    commandLine: string,
    args?: string[],
    options?: {
      listeners?: {
        stdout?: (data: Buffer) => void
      }
    }
  ) => {
    const renderedArgs = args?.join(' ') ?? ''
    options?.listeners?.stdout?.(Buffer.from(`${commandLine} ${renderedArgs}\n`))
    return 0
  }
)
