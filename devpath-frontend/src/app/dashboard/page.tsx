'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button, Card, CardBody } from '@nextui-org/react';
import { decodeToken } from '@/utils/decodeToken';

export default function DashboardPage() {
  const router = useRouter();
  const { token, logout } = useAuth();
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      const decoded = decodeToken(token);
      if (decoded?.firstName) setFirstName(decoded.firstName);
    }
  }, [token, router]);

  if (!token) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-4">
      <Card className="w-full max-w-xl border border-default-100 backdrop-blur shadow-2xl rounded-2xl">
        <CardBody className="p-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome{firstName ? `, ${firstName}` : ''} 🎉
          </h1>
          <p className="text-white text-opacity-80 mb-6">You’re successfully logged in to DevPath.</p>
          <Button color="danger" onClick={() => {
            logout();
            router.push('/login');
          }}>
            Logout
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
