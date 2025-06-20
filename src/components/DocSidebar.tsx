
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { docLinks } from '@/lib/docLinks';

const DocSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-20 flex-col border-r border-border bg-background w-80",
        "lg:flex lg:top-[69px] lg:h-[calc(100vh-69px)]",
        isMobileOpen ? "flex w-full" : "hidden lg:flex"
      )}>
        <div className="flex h-[69px] items-center border-b border-border px-6 lg:hidden">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-authbuilders-purple flex items-center justify-center text-white font-bold">
              AB
            </div>
            <span className="font-bold text-xl">AuthBuilders</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <ScrollArea className="flex-1 py-6 lg:py-8">
          <div className="px-6 lg:px-8">
            <div className="space-y-6">
              {docLinks.map((category, i) => (
                <div key={i} className="space-y-3">
                  <h4 className="font-semibold text-base tracking-tight text-foreground">
                    {category.title}
                  </h4>
                  <div className="grid grid-flow-row gap-2">
                    {category.links.map((link, j) => (
                      <Link
                        key={j}
                        to={link.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex w-full items-center rounded-md border border-transparent px-3 py-2 text-sm transition-colors",
                          location.pathname === link.href
                            ? "bg-muted font-medium text-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          link.disabled && "opacity-50 pointer-events-none"
                        )}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default DocSidebar;
