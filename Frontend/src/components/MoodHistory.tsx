
import React from 'react';
import { format } from 'date-fns';
import { SmilePlus, Smile, Meh, Frown, Cloud } from 'lucide-react';
import GlassMorphism from './GlassMorphism';
import { AnimatePresence, motion } from 'framer-motion';

interface MoodEntry {
  id: string;
  date: Date;
  mood: string;
  note?: string;
}

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case 'great': return <SmilePlus size={20} className="text-mood-great" />;
    case 'good': return <Smile size={20} className="text-mood-good" />;
    case 'okay': return <Meh size={20} className="text-mood-okay" />;
    case 'bad': return <Frown size={20} className="text-mood-bad" />;
    case 'terrible': return <Cloud size={20} className="text-mood-terrible" />;
    default: return null;
  }
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'great': return 'bg-mood-great';
    case 'good': return 'bg-mood-good';
    case 'okay': return 'bg-mood-okay';
    case 'bad': return 'bg-mood-bad';
    case 'terrible': return 'bg-mood-terrible';
    default: return 'bg-gray-200';
  }
};

const MoodHistory = ({ entries }: MoodHistoryProps) => {
  const [expandedEntry, setExpandedEntry] = React.useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <GlassMorphism className="p-6 mt-4 text-center">
        <p className="text-muted-foreground">No mood entries yet. Start tracking your mood today!</p>
      </GlassMorphism>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      <AnimatePresence>
        {entries.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassMorphism className="overflow-hidden">
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`} />
                    <span className="font-medium">{format(entry.date, 'EEEE, MMMM d')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getMoodIcon(entry.mood)}
                    <span className="capitalize text-sm">{entry.mood}</span>
                  </div>
                </div>
                
                <AnimatePresence>
                  {expandedEntry === entry.id && entry.note && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-3 mt-3 border-t border-border"
                    >
                      <p className="text-muted-foreground">{entry.note}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassMorphism>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MoodHistory;
