import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Heart, MessageCircle, Send, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import GlassMorphism from '@/components/GlassMorphism';
import { fetchPosts } from '@/lib/mocks';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      console.log('Fetched Posts:', fetchedPosts); 
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
  
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill out all fields');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/v1/user/post/create', {
        method: 'POST',
        credentials: 'include', // Include cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newPostTitle,
          content: newPostContent,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.error || 'Failed to create post');
      }
  
      const newPost = await response.json();
      const loggedInUser = JSON.parse(localStorage.getItem('user'));

      setPosts([
     { ...newPost.post, user_id: { name: loggedInUser?.name || 'Unknown' } },
      ...posts,
     ]);
      setNewPostTitle('');
      setNewPostContent('');
      setShowNewPostForm(false);
  
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error(error.message || 'Failed to create post. Please try again.');
    }
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, likes: post.likes + 1 } 
        : post
    ));
  };
  
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
        duration: 0.4
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-2">Community Support</h1>
          <p className="text-muted-foreground mb-6">
            Share your experiences and connect with others in a safe, anonymous environment.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <GlassMorphism className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Community Guidelines</h2>
            </div>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-2">
              <li>Be respectful and supportive of others</li>
              <li>Protect your privacy and don't share personal identifying information</li>
              <li>Focus on sharing experiences rather than giving medical advice</li>
              <li>If you're in crisis, please reach out to professional resources</li>
            </ul>
          </GlassMorphism>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          {showNewPostForm ? (
            <GlassMorphism className="p-6">
              <h2 className="text-xl font-semibold mb-4">Share Your Thoughts</h2>
              
              <form onSubmit={handleSubmitPost}>
                <div className="mb-4">
                  <label htmlFor="post-title" className="block mb-2 font-medium">
                    Title
                  </label>
                  <input
                    id="post-title"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Give your post a title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    maxLength={100}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="post-content" className="block mb-2 font-medium">
                    Your message
                  </label>
                  <textarea
                    id="post-content"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="What would you like to share with the community?"
                    rows={4}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    maxLength={500}
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors"
                    onClick={() => setShowNewPostForm(false)}
                  >
                    Cancel
                  </button>
                  
                  <motion.button
                    type="submit"
                    className="bg-primary text-white rounded-xl px-5 py-2 font-medium inline-flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Share Post <Send size={16} />
                  </motion.button>
                </div>
              </form>
            </GlassMorphism>
          ) : (
            <motion.button
              onClick={() => setShowNewPostForm(true)}
              className="w-full p-4 rounded-xl border border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground hover:bg-secondary/50 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Pencil size={18} />
              Create a new post
            </motion.button>
          )}
        </motion.div>
        
        <h2 className="text-xl font-semibold mb-4">Community Posts</h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.map((post) => {
            // Ensure post.created_at is a valid date
            const postDate = post.created_at ? new Date(post.created_at) : new Date(); // Fallback to current date if created_at is invalid

            return (
              <motion.div key={post._id} variants={itemVariants}>
                <GlassMorphism className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {format(postDate, 'MMM d')} {/* Format the date */}
                    </span>
                  </div>
                  <p className="text-foreground/90 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Posted by {post.user_id.name} {/* Access username from user_id */}
                    </span>
                    <div className="flex items-center gap-4">
                      <button 
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => handleLikePost(post._id)} 
                      >
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </button>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle size={16} />
                        <span>{post.comments_count}</span> {/* Access comments_count */}
                      </span>
                    </div>
                  </div>
                </GlassMorphism>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center mt-12 mb-6"
        >
          <GlassMorphism className="p-6 text-center max-w-lg">
            <MessageSquare className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Need someone to talk to?</h3>
            <p className="text-muted-foreground">
              Our AI chat assistant is available 24/7 to provide a listening ear and supportive guidance.
            </p>
            <button className="mt-4 bg-primary/10 text-primary px-6 py-2 rounded-lg font-medium hover:bg-primary/20 transition-colors">
              Chat Now
            </button>
          </GlassMorphism>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Community;