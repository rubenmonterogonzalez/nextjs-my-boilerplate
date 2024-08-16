export type User = {
  name?: string | null;
  id?: string
  email?: string | null;
};

export interface AuthResult {
  success: boolean;
  redirectUrl?: string;
  messageKey?: string;
  error?: string;
}