import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Save, UserPen } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(300, 'Bio must be less than 300 characters').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfileForm = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // In a real app, this would come from your backend or context
  const [userData, setUserData] = useState({
    name: "Lakshya Jain",
    username: "lakshya@example.com",
  });
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name,
      username: userData.username,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // In a real app, this would be an API call to update the user profile
    console.log('Profile form submitted with:', data);
    
    // Update local user data
    setUserData({
      ...userData,
      ...data
    });
    
    // Display success toast
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg bg-primary text-white">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{userData.name}</h2>
            <p className="text-muted-foreground">{userData.username}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2"
        >
          {isEditing ? <Save size={16} /> : <UserPen size={16} />}
          {isEditing ? "Save" : "Edit Profile"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <User size={16} />
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your full name" 
                    {...field} 
                    disabled={!isEditing} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail size={16} />
                  Username
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your.email@example.com" 
                    {...field} 
                    disabled={!isEditing}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isEditing && (
            <div className="flex justify-end gap-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;