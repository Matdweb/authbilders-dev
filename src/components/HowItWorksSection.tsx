
import { Code, Download, BookOpen, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Select Your Stack",
    description: "Choose your framework, database, and auth method.",
    icon: <Code className="h-8 w-8 text-authbuilders-purple" />
  },
  {
    id: 2,
    title: "Download Template", 
    description: "Clone a GitHub project tailored to your stack.",
    icon: <Download className="h-8 w-8 text-authbuilders-purple" />
  },
  {
    id: 3,
    title: "Follow the Custom Guide",
    description: "Step-by-step docs matched to your exact setup.",
    icon: <BookOpen className="h-8 w-8 text-authbuilders-purple" />
  },
  {
    id: 4,
    title: "Authenticate",
    description: "Run your app and test secure login, signup, and more.",
    icon: <Shield className="h-8 w-8 text-authbuilders-purple" />
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How AuthBuilders Works
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A simple 4-step process to get your secure authentication system up and running fast.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={step.id}
              className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-authbuilders-purple/50 hover:shadow-lg hover:shadow-authbuilders-purple/10"
            >
              <CardContent className="p-6 text-center space-y-4">
                {/* Step Number */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-authbuilders-purple/10 text-authbuilders-purple text-sm font-bold border border-authbuilders-purple/20">
                    {step.id}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex justify-center">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-authbuilders-purple transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting Line (hidden on mobile, shown on larger screens) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-authbuilders-purple/30 to-transparent transform -translate-y-1/2 z-10" />
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-authbuilders-purple/5 to-authbuilders-purple-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
