'use client'

import { useState } from 'react';
import { Input, Button, Spacer } from '@nextui-org/react';

type FormProps = {
  isLogin: boolean;
  onSubmit: (data: Record<string, string>) => void;
};

const AuthForm = ({ isLogin, onSubmit }: FormProps) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const { confirmPassword, ...formData } = form;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {!isLogin && (
        <>
          <div className="flex gap-4">
            <Input
              type="text"
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              radius="lg"
              isRequired
              className="w-full"
            />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              radius="lg"
              isRequired
              className="w-full"
            />
          </div>
          <Input
            type="tel"
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange}
            radius="lg"
          />
          <Input
            type="date"
            name="dob"
            label="Date of Birth"
            value={form.dob}
            onChange={handleChange}
            radius="lg"
            isRequired
          />
        </>
      )}

      <Input
        type="email"
        name="email"
        label="Email Address"
        value={form.email}
        onChange={handleChange}
        radius="lg"
        isRequired
      />

      <Input
        type="password"
        name="password"
        label="Password"
        value={form.password}
        onChange={handleChange}
        radius="lg"
        isRequired
      />

      {!isLogin && (
        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          radius="lg"
          isRequired
          isInvalid={!!error}
          errorMessage={error}
        />
      )}

      <Spacer y={2} />
      <Button color="primary" type="submit" fullWidth radius="lg">
        {isLogin ? 'Login' : 'Register'}
      </Button>
    </form>
  );
};

export default AuthForm;
