'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, loginWithGoogle, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Departments', href: '/departments' },
    { name: 'Careers', href: '/careers' },
  ];

  if (isAdmin) {
    navLinks.push({ name: 'Admin', href: '/admin' });
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/5 bg-yellow-50/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center bg-black font-bold text-white">
                N
              </div>
              <span className="text-xl font-bold tracking-tighter text-black uppercase">Abhibhi</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 text-sm font-light text-black/60 transition-colors hover:text-black uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-xs font-medium text-black">
                      {user.name?.charAt(0) || <User className="h-4 w-4" />}
                    </div>
                    <span className="text-sm font-light text-black">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-light text-black/60 transition-colors hover:text-black uppercase tracking-widest"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="bg-black px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-black/80 uppercase tracking-widest"
                >
                  Login with Google
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-black/60 hover:text-black focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-yellow-50 border-b border-black/5">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-base font-light text-black/60 hover:text-black uppercase tracking-widest"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-black/5 pb-6 pt-4">
            {user ? (
              <div className="px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 text-sm font-medium text-black">
                    {user.name?.charAt(0) || <User className="h-5 w-5" />}
                  </div>
                  <div>
                    <div className="text-base font-medium leading-none text-black">
                      {user.name}
                    </div>
                    <div className="text-sm font-light leading-none text-black/60 mt-2">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-6 space-y-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-3 py-3 text-base font-light text-black/60 hover:text-black uppercase tracking-widest"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 mt-4">
                <button
                  onClick={() => {
                    loginWithGoogle();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center justify-center bg-black px-4 py-4 text-sm font-medium text-white hover:bg-black/80 uppercase tracking-widest"
                >
                  Login with Google
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
