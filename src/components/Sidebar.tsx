
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, Search, Bell, MessageCircle, User, Heart, 
  BookmarkCheck, Settings, HelpCircle, LogOut, X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add event listener to close the sidebar when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('#sidebar') && !target.closest('#sidebar-toggle')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const menuItems = [
    { icon: Home, label: 'Home' },
    { icon: Search, label: 'Search' },
    { icon: Bell, label: 'Notifications' },
    { icon: MessageCircle, label: 'Messages' },
    { icon: User, label: 'Profile' },
    { icon: Heart, label: 'My Likes' },
    { icon: BookmarkCheck, label: 'Saved' },
  ];

  const secondaryItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
    { icon: LogOut, label: 'Logout' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          'fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={cn(
          'fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-sidebar z-50 shadow-xl',
          'flex flex-col transition-transform duration-300 ease-in-out',
          'overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-md bg-sidebar/90 border-b border-sidebar-border">
          <h2 className="text-xl font-semibold">Pintristopia</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-sidebar-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="h-px bg-sidebar-border my-6" />

          <ul className="space-y-2">
            {secondaryItems.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors text-sidebar-foreground/80"
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="rounded-lg bg-sidebar-accent p-4">
            <p className="text-sm text-sidebar-foreground/80">Logged in as</p>
            <p className="font-medium">User</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
