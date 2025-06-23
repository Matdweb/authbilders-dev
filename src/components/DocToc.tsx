import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const DocToc = () => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Generate slug from heading txt
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Collect headings and set up IntersectionObserver
  useEffect(() => {
    const collectHeadings = () => {
      const headings = document.querySelectorAll('h2, h3');
      const items: TocItem[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.charAt(1));
        const id = generateSlug(text);

        // Set ID on the heading element for scrolling
        heading.id = id;

        items.push({ id, text, level });
      });

      setTocItems(items);
    };

    // Collect headings after a short delay to ensure content is rendered
    const timer = setTimeout(collectHeadings, 100);

    return () => clearTimeout(timer);
  }, []);

  // Set up intersection observer for active section tracking
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tocItems]);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className="hidden lg:block lg:w-[240px] lg:shrink-0">
      <div className="fixed top-28 right-4 w-[240px]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-br from-background/80 to-muted/20 backdrop-blur-sm border border-border rounded-lg p-4 shadow-md max-h-[calc(100vh-140px)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40"
        >

          <h4 className="font-semibold text-sm text-foreground mb-3 tracking-tight">
            On this page
          </h4>

          <nav className="space-y-1">
            {tocItems.slice(2,(tocItems.length-3)).map((item,i) => (
              <motion.button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "block w-full text-left text-sm leading-snug py-1.5 px-2 rounded-md transition-all duration-200",
                  "hover:text-authbuilders-purple hover:bg-muted/50",
                  item.level === 3 && "ml-3 text-xs",
                  activeId === item.id
                    ? "text-authbuilders-purple font-medium bg-authbuilders-purple/10"
                    : "text-muted-foreground"
                )}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
              >
                {item.text}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      </div>
    </div>
  );
};

export default DocToc;
