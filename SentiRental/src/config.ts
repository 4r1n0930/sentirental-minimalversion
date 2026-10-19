import {
  SUPABASE_URL as _SUPABASE_URL,
  SUPABASE_ANON_KEY as _SUPABASE_ANON_KEY,
} from '@env';

const PLACEHOLDERS = ['your-project-id', 'your-anon-key'];

const isBlank = (value: string | undefined): boolean =>
  !value ||
  value.trim() === '' ||
  PLACEHOLDERS.some(placeholder => value.toLowerCase().includes(placeholder));

const problems: string[] = [];

if (isBlank(_SUPABASE_URL)) {
  problems.push('SUPABASE_URL is missing or still set to a placeholder value');
}

if (isBlank(_SUPABASE_ANON_KEY)) {
  problems.push('SUPABASE_ANON_KEY is missing or still set to a placeholder value');
}

if (!isBlank(_SUPABASE_URL) && !/^https?:\/\/.+\..+/.test(_SUPABASE_URL!.trim())) {
  problems.push(`SUPABASE_URL is not a valid URL: "${_SUPABASE_URL}"`);
}

if (problems.length > 0) {
  throw new Error(
    [
      'Supabase is not configured correctly, so authentication cannot work:',
      '',
      ...problems.map(problem => `  • ${problem}`),
      '',
      'How to fix:',
      '  1. Copy .env.example to .env (if you have not already)',
      '  2. Fill in the real values from Supabase Dashboard > Project Settings > API',
      '  3. Restart Metro with "npx react-native start --reset-cache"',
      '',
      'Note: these values are inlined into the bundle at build time, so a release',
      'build needs its own .env and must be rebuilt after any change.',
    ].join('\n'),
  );
}

export const SUPABASE_URL = _SUPABASE_URL!.trim();
export const SUPABASE_ANON_KEY = _SUPABASE_ANON_KEY!.trim();
