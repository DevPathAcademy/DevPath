'use client';

import { useState } from 'react';
import { Input, Button, Card, CardBody } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/apiService';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { confirmPassword, ...formData } = form;
    if (form.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await registerUser(formData);
      alert('Registration successful!');
      router.push('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl border border-white/10 backdrop-blur bg-white/5">
        <CardBody className="p-10">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Your DevPath Account
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              isRequired
            />
            <Input
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              isRequired
            />
            <Input
              name="phone"
              label="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="sm:col-span-2"
            />
            <Input
              name="dob"
              label="Date of Birth"
              placeholder="MM-DD-YYYY"
              value={form.dob}
              onChange={handleChange}
              className="sm:col-span-2"
              isRequired
            />
            <Input
              name="email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="sm:col-span-2"
              isRequired
            />
            <Input
              name="password"
              label="Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="sm:col-span-2"
              isRequired
            />
            <Input
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="sm:col-span-2"
              isRequired
            />
            <div className="sm:col-span-2 mt-4">
              <Button color="primary" type="submit" fullWidth>
                Register
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
