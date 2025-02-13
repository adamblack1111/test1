import { describe, expect, it } from 'vitest';

import { getBasicAuthHeader } from '../get-header';

describe('getBasicAuthHeader()', () => {
  it('succeed with username and password', () => {
    const header = getBasicAuthHeader('user', 'password');
    expect(header).toEqual({
      name: 'Authorization',
      value: 'Basic dXNlcjpwYXNzd29yZA==',
    });
  });

  it('succeed with username and password using iso-8859-1 encoding', () => {
    const header = getBasicAuthHeader('user', 'password-é', 'latin1');
    expect(header).toEqual({
      name: 'Authorization',
      value: 'Basic dXNlcjpwYXNzd29yZC3p',
    });
  });

  it('succeed with no username', () => {
    const header = getBasicAuthHeader(null, 'password');
    expect(header).toEqual({
      name: 'Authorization',
      value: 'Basic OnBhc3N3b3Jk',
    });
  });

  it('succeed with username and empty password', () => {
    const header = getBasicAuthHeader('user', '');
    expect(header).toEqual({
      name: 'Authorization',
      value: 'Basic dXNlcjo=',
    });
  });

  it('succeed with username and null password', () => {
    const header = getBasicAuthHeader('user', null);
    expect(header).toEqual({
      name: 'Authorization',
      value: 'Basic dXNlcjo=',
    });
  });
});
