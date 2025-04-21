'use client';

import Link from 'next/link';
import { Button, Card, CardBody } from '@nextui-org/react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] px-4">
      <Card className="w-full max-w-xl shadow-2xl backdrop-blur border border-default-100 rounded-2xl">
        <CardBody className="p-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to DevPath 🚀</h1>
          <p className="text-white text-opacity-80 mb-8">
            Learn to code at your own pace and become a Full-Stack Software Engineer.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button color="primary" variant="shadow">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">
                Login
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
