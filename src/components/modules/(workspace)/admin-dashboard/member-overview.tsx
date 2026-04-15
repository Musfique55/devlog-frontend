'use client';

import { Search, Filter, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  streak: string;
  lastLog: string;
  avatar: string;
}

interface MemberTableProps {
  members: Member[];
}

export function MemberTable({ members }: MemberTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

//   const filteredMembers = members.filter(
//     (member) =>
//       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       member.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

  return (
    <div className="bg-surface-container rounded-xl overflow-hidden shadow-2xl shadow-black/20">
      <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface-container-high/30">
        <h3 className="text-lg font-bold tracking-tight text-on-background">Member Overview</h3>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <Input
              className="bg-surface-container-lowest border-none ring-1 ring-outline-variant/10 rounded-lg pl-9 pr-4 py-2 text-xs text-on-background focus:ring-primary transition-all outline-none w-full"
              placeholder="Search members..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="bg-surface-container-highest ring-1 ring-outline-variant/15">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-surface-container-high/50 text-[0.6875rem] font-bold uppercase tracking-widest text-zinc-500 border-b border-outline-variant/10">
              <th className="px-8 py-4">Name</th>
              <th className="px-8 py-4">Role</th>
              <th className="px-8 py-4">Streak</th>
              <th className="px-8 py-4">Last Log</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-surface-container-high transition-colors group">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <img alt={member.name} className="w-8 h-8 rounded object-cover" src={member.avatar} />
                    <div>
                      <p className="font-bold text-on-background">{member.name}</p>
                      <p className="text-xs text-zinc-500">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-[0.6875rem] font-bold uppercase tracking-tight">
                    {member.role}
                  </span>
                </td>
                <td className="px-8 py-5 font-mono text-xs">{member.streak}</td>
                <td className="px-8 py-5 text-zinc-400 text-xs">{member.lastLog}</td>
                <td className="px-8 py-5 text-right">
                  <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-on-background">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
