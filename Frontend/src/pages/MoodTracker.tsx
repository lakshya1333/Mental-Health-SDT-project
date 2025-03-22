import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Send } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import MoodSelector from '@/components/MoodSelector';
import SelfCareTip from '@/components/SelfCareTip';
import MoodHistory from '@/components/MoodHistory';
import GlassMorphism from '@/components/GlassMorphism';
import { fetchMoodEntries } from '@/lib/mocks';

interface MoodEntry {
  id: string;
  date: Date;
  mood: string;
  note?: string;
  userId: string; // Add userId to the interface
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const userId = 'your-user-id'; // Replace with the actual userId (e.g., from authentication)

  useEffect(() => {
    const loadMoodEntries = async () => {
      try {
        const entries = await fetchMoodEntries();
        setMoodEntries(entries);
      } catch (error) {
        console.error('Error fetching mood entries:', error);
        toast.error('Failed to load mood entries');
      }
    };

    loadMoodEntries();
  }, []);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMood) {
      toast.error('Please select a mood before submitting');
      return;
    }

    // Create a new mood entry
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      note: moodNote.trim() || undefined,
      userId, // Include the userId
    };

    try {
      // Send the new mood entry to the backend
      const response = await fetch('http://localhost:3000/api/v1/user/moodentry/add', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error('Failed to save mood entry');
      }

      const data = await response.json();
      setMoodEntries((prevEntries) => [...prevEntries, data.moodEntry]);


      setSelectedMood(null);
      setMoodNote('');

      toast.success('Mood tracked successfully!');
    } catch (error) {
      console.error('Error saving mood entry:', error);
      toast.error('Failed to save mood entry');
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
          <h1 className="text-3xl font-bold mb-2">Mood Tracker</h1>
          <p className="text-muted-foreground mb-6">
            Track your daily moods and identify patterns in your emotional wellbeing.
          </p>
        </motion.div>

        <GlassMorphism className="p-6 mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Calendar size={16} />
            <span>{format(new Date(), 'EEEE, MMMM d, yyyy')}</span>
          </div>

          <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>

          <MoodSelector
            onSelect={handleMoodSelect}
            selectedMood={selectedMood}
          />

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: selectedMood ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-6">
              <label htmlFor="mood-note" className="block mb-2 font-medium">
                Add a note (optional)
              </label>
              <textarea
                id="mood-note"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="What's contributing to your mood today?"
                rows={3}
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
            </div>

            <div className="mt-4 flex justify-end">
              <motion.button
                type="submit"
                className="bg-primary text-white rounded-xl px-6 py-3 font-medium inline-flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Save Entry <Send size={16} />
              </motion.button>
            </div>
          </motion.form>

          {selectedMood && <SelfCareTip mood={selectedMood} />}
        </GlassMorphism>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
          <MoodHistory entries={moodEntries} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default MoodTracker;