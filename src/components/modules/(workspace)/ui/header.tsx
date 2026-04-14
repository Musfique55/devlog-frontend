'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { Search, Bell, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export function WorkspaceHeader() {
  const {data : user} = useAuth();
  const {id} = useParams();
  const workspace = user?.workspaces.find((workspace) => workspace.id === id);

  return (
    <header className="sticky top-0 right-0 w-full bg-background/70 dark:bg-background/70 backdrop-blur-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 h-auto sm:h-16 px-4 sm:px-8 py-3 sm:py-0 z-40 border-b border-white/5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 w-full sm:w-auto">
        <span className="text-lg sm:text-xl font-black text-on-background tracking-tight whitespace-nowrap">{workspace?.name}</span>
        <div className="relative w-full sm:w-auto hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <Input
            className="bg-surface-container-lowest border-none ring-1 ring-white/5 rounded-lg pl-10 pr-4 py-1.5 text-xs w-full sm:w-64 focus:ring-primary focus:ring-2 transition-all"
            placeholder="Search logs..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
        <nav className="flex items-center gap-4 sm:gap-6 font-medium text-xs sm:text-sm hidden md:flex">
          <a className="text-zinc-400 hover:text-white transition-all whitespace-nowrap" href="#">
            Docs
          </a>
          <a className="text-zinc-400 hover:text-white transition-all whitespace-nowrap" href="#">
            Support
          </a>
          <a className="text-primary font-bold whitespace-nowrap" href="#">
            Changelog
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white h-8 w-8 sm:h-10 sm:w-10">
            <Bell className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex">
            <HelpCircle className="w-4 sm:w-5 h-4 sm:h-5" />
          </Button>
          {
            user?.image ? <Image
          height={32}
          width={32}
            alt="User Avatar"
            className="w-8 h-8 rounded-full bg-surface-container-highest object-cover flex-shrink-0"
            src={user?.image}
          /> :  <div className="w-8 h-8 rounded-xl object-cover hover:grayscale-0 transition-all duration-300 bg-amber-800 flex items-center justify-center text-white font-bold text-2xl">
            <p>{user?.name[0]}</p>
          </div>
          }
          
        </div>
      </div>
    </header>
  );
}
