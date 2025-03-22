
import { useState } from 'react';
import { Menu, MessageCircle, User, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            id="sidebar-toggle"
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            onClick={onSidebarToggle}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          
          <a href="/" className="font-semibold text-lg">Marketplace</a>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Wallet size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <MessageCircle size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
