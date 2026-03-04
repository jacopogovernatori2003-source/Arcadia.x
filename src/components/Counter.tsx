import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(9998);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 10) return prev;
        // Randomly decrement to simulate real-time selection
        return Math.random() > 0.9 ? prev - 1 : prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2 font-display">
      <div className="flex items-center gap-3 text-gold">
        <Users size={24} />
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold tracking-tighter"
        >
          {count.toLocaleString()}
        </motion.span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
        Posti Rimanenti per la Sopravvivenza
      </span>
    </div>
  );
}
