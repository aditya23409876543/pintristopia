
import { useState } from 'react';
import { Menu, Search, Bell, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header = ({ onSidebarToggle }: HeaderProps) => {
  const [searchFocused, setSearchFocused] = useState(false);
  
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
          
          <a href="/" className="font-semibold text-lg">Pintristopia</a>
        </div>
        
        <div className={cn(
          "relative flex-1 mx-4 max-w-xl transition-all duration-300",
          searchFocused ? "scale-105" : ""
        )}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-muted-foreground" />
            </div>
            <input
              type="search"
              className="w-full py-2 pl-10 pr-4 bg-secondary rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              placeholder="Search for inspiration..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <Bell size={20} />
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
