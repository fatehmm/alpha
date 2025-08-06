import { createFileRoute, useNavigate } from '@tanstack/react-router';
import SignUpForm from '../components/sign-up-form';

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
	const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <SignUpForm onSwitchToSignIn={() => {
        navigate({
          to: "/login",
        });
      }} />
    </div>
  );
} 