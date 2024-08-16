import CryptoJS from 'crypto-js';

// Function to hash a password using PBKDF2
export async function hashPassword(password: string) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
  const hashedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();

  return { hashedPassword, salt };
}

// Function to verify the password
export async function verifyPassword(password: string, salt: string, hashedPassword: string) {
  const derivedPassword = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  }).toString();

  return derivedPassword === hashedPassword;
}
