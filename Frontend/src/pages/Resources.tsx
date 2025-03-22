
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, ExternalLink, Search } from 'lucide-react';
import Layout from '@/components/Layout';
import GlassMorphism from '@/components/GlassMorphism';
import { mockResources } from '@/lib/mocks';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(mockResources.map(resource => resource.category)));
  
  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = searchTerm === '' || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-2">Mental Health Resources</h1>
          <p className="text-muted-foreground mb-6">
            Find support resources, hotlines, and educational materials for your mental health journey.
          </p>
        </motion.div>
        
        <GlassMorphism className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </GlassMorphism>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <motion.div key={resource.id} variants={itemVariants}>
                <GlassMorphism className="p-6">
                  <div className="flex flex-col">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-2 self-start">
                      {resource.category}
                    </span>
                    
                    <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    
                    {resource.contact && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Phone size={16} />
                        <span>{resource.contact}</span>
                      </div>
                    )}
                    
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary font-medium hover:underline mt-auto"
                    >
                      Visit Resource <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </GlassMorphism>
              </motion.div>
            ))
          ) : (
            <GlassMorphism className="p-6 text-center">
              <p className="text-muted-foreground">No resources found matching your search criteria.</p>
            </GlassMorphism>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 mb-6"
        >
          <GlassMorphism className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Need Immediate Help?</h2>
            <p className="text-muted-foreground mb-4">
              If you're experiencing a mental health emergency, please call your local emergency services or one of the crisis hotlines listed above.
            </p>
            <p className="font-medium">Your wellbeing matters. Reach out for support when you need it.</p>
          </GlassMorphism>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Resources;
