'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Card, CardBody } from '@nextui-org/react';
import AuthForm from '@/app/components/AuthForm';
import { AuthContext } from '@/context/AuthContext';
import API from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = async (formData: Record<string, string>) => {
    try {
      const response = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      login(token); // save to context
      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-4">
      <Card className="w-full max-w-lg shadow-2xl border border-default-100 rounded-2xl backdrop-blur">
        <CardBody className="py-10 px-8 md:px-12">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Welcome Back</h2>
          <AuthForm isLogin onSubmit={handleLogin} />
        </CardBody>
      </Card>
    </div>
  );
}
