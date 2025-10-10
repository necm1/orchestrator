import type { Metadata } from 'next';
import { SignInForm } from '@orchestrator/ui';

export const metadata: Metadata = {
  title: 'Orchestrator - Sign In',
  description: '',
};

export default function AuthSignIn() {
  return <SignInForm />;
}
