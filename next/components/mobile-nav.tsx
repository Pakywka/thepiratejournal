import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { siteConfig } from '@/config/site';
import { useLockBody } from '@/hooks/use-lock-body';
import { cn } from '@/lib/utils';
import type { MainNavItem } from '@/types';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

export function MobileNav({ children, items }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        'animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden'
      )}
    >
      <div className='relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md'>
        <Link className='flex items-center space-x-2' href='/'>
          <Image
            alt={`${siteConfig.name}`}
            height={40}
            sizes='25vw'
            src={`${siteConfig.url}/android-chrome-192x192.png`}
            width={40}
          />
          <span className='font-bold'>{siteConfig.name}</span>
        </Link>
        <nav className='grid grid-flow-row auto-rows-max text-sm'>
          {items.map((item, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}