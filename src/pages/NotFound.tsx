
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <div className="h-1 w-24 bg-primary mx-auto rounded-full"></div>
        <p className="text-xl text-muted-foreground">
          We couldn't find the page you're looking for
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-6 text-primary hover:text-primary/90 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
