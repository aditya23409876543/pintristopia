import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

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
          <h2 className="text-xl font-semibold">Marketplace</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 hover:bg-sidebar-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4">
          {/* Sidebar content will be added later */}
          <p className="text-center text-sidebar-foreground/50 mt-8">
            Sidebar features will be added later
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
