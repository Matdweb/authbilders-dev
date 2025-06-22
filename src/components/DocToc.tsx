
import { useEffect, useState } from 'react';

const DocToc = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
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
    const headingElements = document.querySelectorAll('h2, h3, h4');
    const headingList = Array.from(headingElements).map((heading) => ({
      id: heading.id || '',
      text: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setHeadings(headingList);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block">
      <div className="fixed top-[69px] right-0 h-[calc(100vh-69px-80px)] w-64 overflow-y-auto border-l border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="p-6">
          <h4 className="font-semibold text-sm mb-4 text-foreground">On This Page</h4>
          <nav className="space-y-2">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`block text-sm py-1 transition-colors hover:text-foreground ${
                  activeId === heading.id
                    ? 'text-foreground font-medium border-l-2 border-authbuilders-purple pl-3'
                    : 'text-muted-foreground pl-3'
                } ${heading.level === 3 ? 'ml-4' : ''} ${heading.level === 4 ? 'ml-8' : ''}`}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DocToc;
