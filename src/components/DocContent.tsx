
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DocToc from '@/components/DocToc';

interface DocContentProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const DocContent = ({ title, description, children }: DocContentProps) => {
  return (
    <div className="min-h-[calc(100vh-69px)] pb-16">
      <div className="container py-8 px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
              <span>Documentation</span>
              <span>/</span>
              <span className="text-foreground">{title}</span>
            </nav>

            {/* Header */}
            <header className="mb-12">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
              </h1>
              {description && (
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  {description}
                </p>
              )}
            </header>

            {/* Content */}
            <article className="prose prose-slate dark:prose-invert prose-lg max-w-none">
              {children}
            </article>

            {/* Navigation */}
            <nav className="flex justify-between items-center pt-12 mt-12 border-t border-border">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>

          {/* Table of Contents */}
          <DocToc />
        </div>
      </div>
    </div>
  );
};

export default DocContent;
