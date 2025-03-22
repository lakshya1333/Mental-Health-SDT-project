
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PencilLine, Users, BookOpen, BarChart2, ArrowRight } from 'lucide-react';
import GlassMorphism from '@/components/GlassMorphism';
import Layout from '@/components/Layout';

const Index = () => {
  const features = [
    {
      icon: <PencilLine size={24} />,
      title: "Mood Tracking",
      description: "Record and track your daily emotions with our intuitive mood journal.",
      path: "/mood-tracker",
      color: "bg-blue-100"
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Mental Health Assessments",
      description: "Take quick assessments to better understand your mental wellbeing.",
      path: "/assessment",
      color: "bg-purple-100"
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "Connect with others anonymously in a safe, supportive environment.",
      path: "/community",
      color: "bg-green-100"
    },
    {
      icon: <BookOpen size={24} />,
      title: "Resource Hub",
      description: "Access helpful articles, videos, and professional resources.",
      path: "/resources",
      color: "bg-amber-100"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              Your mental wellness companion
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Take control of your mental wellbeing
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your moods, receive personalized self-care tips, and connect with resources to support your mental health journey.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/mood-tracker">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-white rounded-xl px-6 py-3 font-medium"
              >
                Track Your Mood
              </motion.button>
            </Link>
            
            <Link to="/assessment">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border border-border rounded-xl px-6 py-3 font-medium"
              >
                Take Assessment
              </motion.button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassMorphism className="p-6 h-full">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Link to={feature.path} className="inline-flex items-center text-primary font-medium hover:underline">
                  Explore <ArrowRight size={16} className="ml-1" />
                </Link>
              </GlassMorphism>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16"
        >
          <GlassMorphism className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Remember</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
            </p>
          </GlassMorphism>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Index;
