import { jest } from '@jest/globals';
export const exec = jest.fn(async (commandLine, args, options) => {
    const renderedArgs = args?.join(' ') ?? '';
    options?.listeners?.stdout?.(Buffer.from(`${commandLine} ${renderedArgs}\n`));
    return 0;
});
