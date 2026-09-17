import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as security from '../src/security.js'

test('imports p12 file', async () => {
  const keychain: string = 'signing_temp'
  const keychainPassword: string = Math.random().toString(36)
  const p12FilePath: string = 'Certificates.p12'
  const p12Password: string = 'password'

  await security.installCertIntoTemporaryKeychain(
    keychain,
    true,
    keychainPassword,
    p12FilePath,
    p12Password
  )

  await security.deleteKeychain(keychain)

  expect(exec.exec).toHaveBeenNthCalledWith(
    1,
    'security',
    ['create-keychain', '-p', keychainPassword, 'signing_temp.keychain'],
    expect.any(Object)
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    2,
    'security',
    ['set-keychain-settings', '-lut', '21600', 'signing_temp.keychain'],
    expect.any(Object)
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    3,
    'security',
    ['unlock-keychain', '-p', keychainPassword, 'signing_temp.keychain'],
    expect.any(Object)
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    4,
    'security',
    [
      'import',
      p12FilePath,
      '-k',
      'signing_temp.keychain',
      '-f',
      'pkcs12',
      '-A',
      '-T',
      '/usr/bin/codesign',
      '-T',
      '/usr/bin/security',
      '-P',
      p12Password
    ],
    expect.any(Object)
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    5,
    'security',
    [
      'set-key-partition-list',
      '-S',
      'apple-tool:,apple:',
      '-k',
      keychainPassword,
      'signing_temp.keychain'
    ],
    undefined
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    6,
    'security',
    [
      'list-keychains',
      '-d',
      'user',
      '-s',
      'signing_temp.keychain',
      'login.keychain'
    ],
    expect.any(Object)
  )
  expect(exec.exec).toHaveBeenNthCalledWith(
    7,
    'security',
    ['delete-keychain', 'signing_temp.keychain'],
    undefined
  )
  expect(core.setOutput).toHaveBeenCalledWith(
    'security-response',
    expect.stringContaining('security')
  )
})
