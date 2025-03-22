
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Users, BookOpen, Menu, X, LogIn, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/mood-tracker', label: 'Track Mood', icon: <BarChart2 size={20} /> },
    { path: '/community', label: 'Community', icon: <Users size={20} /> },
    { path: '/resources', label: 'Resources', icon: <BookOpen size={20} /> },
  ];


  // Check if current path is login or register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-background relative">
      {/* Mobile menu button */}
      <button 
        className="fixed top-6 right-6 z-50 md:hidden bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.div 
              className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-white shadow-lg"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6 pt-20 flex flex-col gap-6">
                {navItems.map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      location.pathname === item.path 
                        ? "bg-primary text-white" 
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    to="/profile"
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2",
                      location.pathname === '/profile'
                        ? "bg-primary text-white"
                        : "hover:bg-secondary"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span className="font-medium">Your Profile</span>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span className="font-medium">Sign Out</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      {!isAuthPage && (
        <div className="fixed left-0 top-0 h-full w-60 hidden md:block p-6 border-r border-border">
          <div className="flex flex-col h-full">
            <div className="mb-10">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MC</span>
                </div>
                <h1 className="text-xl font-semibold">MindCheck</h1>
              </Link>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    location.pathname === item.path 
                      ? "bg-primary text-white" 
                      : "hover:bg-secondary"
                  )}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto">
              <div className="glass-card p-4 mb-4">
                <p className="text-sm text-foreground/80">
                  Remember, taking care of your mental health is a journey. Be patient with yourself.
                </p>
              </div>

              <Link to="/profile">
                <Button variant="outline" className="w-full flex items-center gap-2 mb-2">
                  <User size={16} />
                  <span>Your Profile</span>
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" className="w-full flex items-center gap-2 mb-2">
                  <LogIn size={16} />
                  <span>Sign Out</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className={cn(
        "min-h-screen",
        !isAuthPage && "md:pl-60"
      )}>
        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="px-6 py-8 max-w-5xl mx-auto"
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
};

export default Layout;
