
import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/AnimatedTransition';
import UserProfileForm from '../components/UserProfileForm';
import Layout from '@/components/Layout';

const Profile = () => {
  return (
    <Layout>
      <AnimatedTransition animation="slide" className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground mt-2">
              Manage your account settings and profile information
            </p>
          </motion.div>

          <UserProfileForm />
        </div>
      </AnimatedTransition>
    </Layout>
  );
};

export default Profile;