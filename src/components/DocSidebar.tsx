
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { generalCategories, technologySections } from '@/lib/docLinks';
import {
  SiNextdotjs,
  SiVite,
  SiReact
} from 'react-icons/si';
import {
  LayoutTemplate,
  Plug,
  Package
} from 'lucide-react';

const TechIcon = ({ icon }: { icon?: string }) => {
  switch (icon) {
    case 'nextjs': return <SiNextdotjs className="w-4 h-4" />;
    case 'vite': return <SiVite className="w-4 h-4" />;
    case 'template': return <LayoutTemplate className="w-4 h-4" />;
    case 'components': return <Package className="w-4 h-4" />;
    case 'integrations': return <Plug className="w-4 h-4" />;
    default: return <SiReact className="w-4 h-4" />;
  }
};

const DocSidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    const matchedTech = technologySections.find((tech) =>
      tech.categories.some((cat) =>
        cat.links.some((link) => link.href === location.pathname)
      )
    );
    if (matchedTech) {
      setOpenAccordions((prev) =>
        prev.includes(matchedTech.title.toLowerCase())
          ? prev
          : [...prev, matchedTech.title.toLowerCase()]
      );
    }
  }, [location.pathname]);


  return (
    <>
      <div className={cn(
        "fixed inset-y-0 left-0 z-20 flex-col border-r border-border bg-background w-80",
        "lg:flex lg:top-[69px] lg:h-[calc(100vh-69px)] ",
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
              {/* General Categories (Getting Started, Core Concepts, Security) */}
              {generalCategories.slice(0, 1).map((category, i) => (
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

              {/* Technology Sections with Accordion */}
              <div className="space-y-3">
                <h4 className="font-semibold text-base tracking-tight text-foreground">
                  Technologies
                </h4>

                <Accordion
                  type="multiple"
                  value={openAccordions}
                  onValueChange={setOpenAccordions}
                  className="w-full space-y-2"
                >
                  {technologySections.map((tech, techIndex) => (
                    <AccordionItem
                      key={techIndex}
                      value={tech.title.toLowerCase()}
                      className={cn(
                        "border border-border rounded-lg",
                        tech.disabled && "opacity-60"
                      )}
                    >
                      <AccordionTrigger className={cn(
                        "px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180",
                        tech.disabled && "pointer-events-none"
                      )}>
                        <div className="flex items-center gap-3">
                          <TechIcon icon={tech.icon} />
                          <span className="font-medium text-sm">{tech.title}</span>
                          {tech.disabled && (
                            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </AccordionTrigger>

                      {!tech.disabled && (
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-4">
                            {tech.categories.map((category, catIndex) => (
                              <div key={catIndex} className="space-y-2">
                                <div className="flex items-center gap-2 px-2">
                                  <TechIcon icon={category.icon} />
                                  <h5 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">
                                    {category.title}
                                  </h5>
                                </div>

                                <div className="space-y-1">
                                  {category.links.length > 0 ? (
                                    category.links.map((link, linkIndex) => (
                                      <Link
                                        key={linkIndex}
                                        to={link.href}
                                        onClick={() => setIsMobileOpen(false)}
                                        className={cn(
                                          "flex w-full items-center rounded-md border border-transparent px-3 py-2 text-sm transition-colors ml-2",
                                          location.pathname === link.href
                                            ? "bg-muted font-medium text-foreground"
                                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                          link.disabled && "opacity-50 pointer-events-none"
                                        )}
                                      >
                                        {link.title}
                                      </Link>
                                    ))
                                  ) : (
                                    <div className="px-3 py-2 text-xs text-muted-foreground ml-2">
                                      No items yet
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {generalCategories.slice(1).map((category, i) => (
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
