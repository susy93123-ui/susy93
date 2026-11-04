import test from 'node:test';
import assert from 'node:assert/strict';

// Pure authentication logic test
function authenticateAdmin(email: string, pass: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (cleanEmail === 'susy93123@gmail.com' && cleanPass === 'Susi851692K') {
    return true;
  }
  if (cleanEmail === 'admin@sdnmendongan.sch.id' && cleanPass === 'sipid2026') {
    return true;
  }
  return false;
}

test('Administrator credentials: susy93123@gmail.com and Susi851692K authenticate successfully', () => {
  const result = authenticateAdmin('susy93123@gmail.com', 'Susi851692K');
  assert.equal(result, true);
});

test('Administrator credentials: case-insensitive email and trimmed whitespace still authenticate', () => {
  const result = authenticateAdmin('  Susy93123@gmail.com  ', 'Susi851692K');
  assert.equal(result, true);
});

test('Administrator credentials: wrong password fails', () => {
  const result = authenticateAdmin('susy93123@gmail.com', 'wrongpassword');
  assert.equal(result, false);
});
