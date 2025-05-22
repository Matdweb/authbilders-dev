
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface DocContentProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const DocContent = ({ title, description, children }: DocContentProps) => {
  return (
    <div className="min-h-[calc(100vh-69px)] pb-16 m-auto break-all">
      <div className="container py-8 px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold">{title}</h1>
            {description && <p className="text-xl text-muted-foreground">{description}</p>}
          </div>
          <div className="space-y-6">
            {children}
          </div>
          <div className="flex justify-between pt-4 border-t border-border mt-12">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-4 w-4">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocContent;
