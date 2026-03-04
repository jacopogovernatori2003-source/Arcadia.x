import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, ShieldAlert } from 'lucide-react';

export default function BiometricScanner({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState('INIZIALIZZAZIONE...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const statusUpdates = [
      { p: 10, s: 'IDENTIFICAZIONE SOGGETTO...' },
      { p: 30, s: 'SCANSIONE RETINICA...' },
      { p: 50, s: 'ANALISI DNA...' },
      { p: 70, s: 'VERIFICA MERITO...' },
      { p: 90, s: 'ACCESSO AUTORIZZATO' },
    ];

    statusUpdates.forEach(({ p, s }) => {
      if (progress >= p) setStatus(s);
    });

    return () => clearInterval(timer);
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-gold font-display"
    >
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 border-2 border-gold/20 rounded-full animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Fingerprint size={120} className="text-gold" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 scan-line animate-scan" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-between mb-2 text-xs tracking-widest uppercase">
          <span>{status}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full bg-gold/10 overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-2 text-blood text-[10px] tracking-[0.2em] uppercase opacity-60">
        <ShieldAlert size={14} />
        <span>Protocollo di Sicurezza dei Due Re Attivo</span>
      </div>
    </motion.div>
  );
}
