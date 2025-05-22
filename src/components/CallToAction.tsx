
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-16 bg-authbuilders-purple text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 text-center md:grid-cols-2 md:text-left">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to start building?
            </h2>
            <p className="text-lg text-white/80 md:text-xl">
              Get started with AuthBuilders today and implement authentication in your application within minutes, not days.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link to="/docs/getting-started">
              <Button size="lg" className="w-full sm:w-auto bg-white text-authbuilders-purple hover:bg-white/90">
                Read the Docs
              </Button>
            </Link>
            <a href="https://github.com/authbuilders" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full sm:w-auto text-white bg-black/60 hover:bg-black/80">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
