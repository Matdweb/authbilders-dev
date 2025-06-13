
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center space-y-8 py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* AuthBuilders Logo */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-authbuilders-purple to-authbuilders-purple-light flex items-center justify-center text-white font-bold text-xl shadow-lg">
              AB
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              AuthBuilders.dev
            </span>
          </div>
        </motion.div>

        {/* Floating Illustration */}
        <motion.div
          animate={{
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&auto=format"
              alt="404 Illustration"
              className="w-80 h-60 rounded-2xl shadow-2xl border border-border object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </motion.div>

        {/* 404 Heading */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h1 className="text-8xl lg:text-9xl font-bold bg-gradient-to-r from-authbuilders-purple via-authbuilders-purple-light to-authbuilders-purple-dark bg-clip-text text-transparent">
            404
          </h1>
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Search className="w-12 h-12 text-authbuilders-purple opacity-60" />
            </motion.div>
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
            Oops! Page not found
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry though – let's get you back on track!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link to="/">
            <Button 
              size="lg"
              className="bg-authbuilders-purple hover:bg-authbuilders-purple-dark text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Go back home
            </Button>
          </Link>
          
          <Link to="/docs">
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-4 rounded-xl border-2 border-authbuilders-purple text-authbuilders-purple hover:bg-authbuilders-purple hover:text-white transition-all duration-300 transform hover:scale-105 group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Browse Documentation
            </Button>
          </Link>
        </motion.div>

        {/* Fun Fact */}
        <motion.div
          variants={itemVariants}
          className="pt-12"
        >
          <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-2xl p-6 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-authbuilders-purple">Fun fact:</span> {" "}
              404 errors got their name from room 404 at CERN, where the web was born!
            </p>
          </div>
        </motion.div>

        {/* Current Path Display */}
        {location.pathname !== "/" && (
          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <code className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-lg border">
              Attempted path: {location.pathname}
            </code>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NotFound;
