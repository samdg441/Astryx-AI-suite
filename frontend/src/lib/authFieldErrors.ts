export type AuthFieldIssue = { path: (string | number)[]; message: string };

export type SignInFieldErrors = Partial<Record<'email' | 'password', string>>;
export type SignUpFieldErrors = Partial<
  Record<'name' | 'email' | 'password' | 'companyName', string>
>;

function translateIssue(field: string, message: string, mode: 'signIn' | 'signUp'): string {
  const lower = message.toLowerCase();
  if (lower.includes('invalid email') || (field === 'email' && lower.includes('email'))) {
    return 'Correo electrónico no válido.';
  }
  if (field === 'password' && (lower.includes('at least') || lower.includes('min'))) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }
  if (field === 'password' && mode === 'signIn' && lower.includes('required')) {
    return 'Indica tu contraseña.';
  }
  if (field === 'name' && lower.includes('min')) {
    return 'El nombre debe tener al menos 2 caracteres.';
  }
  if (field === 'companyName') {
    return 'Indica el nombre de la empresa (mínimo 2 caracteres).';
  }
  if (message === 'Invalid email or password') {
    return 'Correo o contraseña incorrectos.';
  }
  if (message === 'Email already registered') {
    return 'Este correo ya está registrado.';
  }
  return message;
}

export function mapSignInIssues(issues: AuthFieldIssue[]): SignInFieldErrors {
  const out: SignInFieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? '');
    if (key === 'email' || key === 'password') {
      out[key] = translateIssue(key, issue.message, 'signIn');
    }
  }
  return out;
}

export function mapSignUpIssues(issues: AuthFieldIssue[]): SignUpFieldErrors {
  const out: SignUpFieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? '');
    if (key === 'name' || key === 'email' || key === 'password' || key === 'companyName') {
      out[key] = translateIssue(key, issue.message, 'signUp');
    }
  }
  return out;
}

export function validateSignInClient(email: string, password: string): SignInFieldErrors {
  const errors: SignInFieldErrors = {};
  if (!email.trim()) errors.email = 'Indica tu correo electrónico.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Correo electrónico no válido.';
  }
  if (!password) errors.password = 'Indica tu contraseña.';
  return errors;
}

export function validateSignUpClient(
  name: string,
  email: string,
  password: string,
  accountKind: 'PERSONA' | 'EMPRESA',
  companyName: string
): SignUpFieldErrors {
  const errors: SignUpFieldErrors = {};
  if (name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.';
  if (!email.trim()) errors.email = 'Indica tu correo electrónico.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Correo electrónico no válido.';
  }
  if (password.length < 8) errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  if (accountKind === 'EMPRESA' && companyName.trim().length < 2) {
    errors.companyName = 'Indica el nombre de la empresa (mínimo 2 caracteres).';
  }
  return errors;
}
