import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ChevronRight, 
  Upload, 
  FileText, 
  Activity, 
  User, 
  Briefcase, 
  HeartPulse, 
  ArrowRight,
  ShieldAlert,
  Crown
} from 'lucide-react';
import BiometricScanner from './components/BiometricScanner';
import Counter from './components/Counter';

type FormData = {
  name: string;
  age: string;
  health: string;
  specialization: string;
  value: string;
  file: File | null;
};

const SPECIALIZATIONS = [
  "Ingegneria Bellica",
  "Medicina d'Urgenza",
  "Produzione Idroponica",
  "Sicurezza e Difesa",
  "Gestione Risorse Critiche",
  "Bio-Robotica Avanzata",
  "Sintesi Atmosferica",
  "Cyber-Security Quantistica",
  "Genetica Evolutiva",
  "Logistica di Sopravvivenza",
  "Architettura Brutalista Post-Apocalittica",
  "Psicologia delle Masse e Controllo"
];

export default function App() {
  const [isScanning, setIsScanning] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    health: '',
    specialization: '',
    value: '',
    file: null
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
      setErrors(prev => ({ ...prev, file: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name) newErrors.name = "Dati insufficienti per la valutazione.";
    if (!formData.age) newErrors.age = "Età non pervenuta.";
    if (!formData.health) newErrors.health = "Stato di salute non dichiarato.";
    if (!formData.specialization) newErrors.specialization = "Specializzazione mancante.";
    if (formData.value.length < 50) newErrors.value = "Argomentazione insufficiente. Il merito non è dimostrato.";
    if (!formData.file) newErrors.file = "Prova di merito assente.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate submission to the "Two Kings"
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 3000);
    }
  };

  if (isScanning) {
    return <BiometricScanner onComplete={() => setIsScanning(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-gold selection:text-black">
      {/* Header / Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-gold font-display font-bold tracking-tighter text-xl">
          <ShieldCheck size={24} />
          <span>ARCADIA</span>
        </div>
        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/60">
          <span className="hidden sm:inline">Protocollo 0.1.2</span>
          <div className="flex items-center gap-2 text-blood">
            <div className="w-2 h-2 bg-blood rounded-full animate-pulse" />
            <span>SISTEMA ATTIVO</span>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="py-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Counter />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6 uppercase leading-none"
          >
            L'ULTIMO RIFUGIO: <br />
            <span className="text-gold">IL MERITO È LA TUA SALVEZZA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/60 max-w-2xl text-lg mb-12 font-light"
          >
            Solo 9.998 posti sono disponibili per chi dimostrerà utilità assoluta. 
            I Due Re attendono la tua prova di valore. Il tempo è un lusso che non possiedi.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a 
              href="#manifesto" 
              className="group flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] hover:text-white transition-colors"
            >
              Leggi il Manifesto <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* Manifesto Section */}
        <section id="manifesto" className="py-20 border-y border-white/5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tighter mb-6 flex items-center gap-3">
                <Crown className="text-gold" size={32} />
                IL MANIFESTO
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p className="text-xl italic text-white font-light">
                  "Nessun parassita, solo ingranaggi. Chi non produce, non sopravvive."
                </p>
                <p>
                  ARCADIA non è un atto di carità. È il bastione finale della specie umana. 
                  Ogni individuo ammesso deve essere un pilastro, una risorsa, un'arma contro l'estinzione.
                </p>
                <p>
                  La debolezza è un'infezione. L'inutilità è un crimine. 
                  Se cerchi rifugio per paura, sarai respinto. Se cerchi rifugio per servire, sarai valutato.
                </p>
                <div className="p-4 border border-gold/30 bg-gold/5 rounded-lg">
                  <p className="text-gold font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                    <AlertTriangle size={16} /> Quota di Iscrizione Obbligatoria
                  </p>
                  <p className="text-xs text-white/80">
                    Ogni candidatura deve essere accompagnata da un deposito cauzionale di <span className="text-white font-bold">30.000 €</span>. 
                    Tale somma è considerata un contributo allo sforzo realizzativo di ARCADIA. 
                    <span className="block mt-2 text-blood font-bold underline">NON VERRANNO EFFETTUATI RESI IN CASO DI MANCATA SELEZIONE.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-anthracite/50 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={120} />
              </div>
              <h3 className="text-gold text-xs uppercase tracking-[0.2em] mb-4">Criteri di Selezione</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <span>Eccellenza tecnica comprovata in settori critici.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <span>Stato di salute ottimale per il mantenimento della specie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <span>Capacità di sacrificio per il bene superiore di ARCADIA.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5 shrink-0" />
                  <span>Assenza di legami emotivi che possano compromettere il dovere.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section id="apply" className="py-20">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold uppercase tracking-tighter mb-4">CANDIDATURA AL MERITO</h2>
              <p className="text-white/50 text-sm uppercase tracking-widest">Compila con estrema precisione. Ogni errore è un'esclusione.</p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >
                  {/* Personal Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <User size={12} /> Nome Completo
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full bg-anthracite border ${errors.name ? 'border-blood' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-display`}
                        placeholder="IDENTIFICATIVO CIVILE"
                      />
                      {errors.name && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                        <Activity size={12} /> Età
                      </label>
                      <input 
                        type="number" 
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className={`w-full bg-anthracite border ${errors.age ? 'border-blood' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-display`}
                        placeholder="CICLI VITALI"
                      />
                      {errors.age && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.age}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                      <HeartPulse size={12} /> Stato di Salute
                    </label>
                    <input 
                      type="text" 
                      name="health"
                      value={formData.health}
                      onChange={handleInputChange}
                      className={`w-full bg-anthracite border ${errors.health ? 'border-blood' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-display`}
                      placeholder="ES: NESSUNA PATOLOGIA, GRUPPO SANGUIGNO 0-"
                    />
                    {errors.health && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.health}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                      <Briefcase size={12} /> Specializzazione
                    </label>
                    <select 
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className={`w-full bg-anthracite border ${errors.specialization ? 'border-blood' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-display appearance-none`}
                    >
                      <option value="">SELEZIONA CATEGORIA</option>
                      {SPECIALIZATIONS.map(s => (
                        <option key={s} value={s}>{s.toUpperCase()}</option>
                      ))}
                    </select>
                    {errors.specialization && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.specialization}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                      <FileText size={12} /> Valore Aggiunto
                    </label>
                    <textarea 
                      name="value"
                      value={formData.value}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full bg-anthracite border ${errors.value ? 'border-blood' : 'border-white/10'} rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors font-display resize-none`}
                      placeholder="CONVINCI I DUE RE. PERCHÉ LA TUA MORTE SAREBBE UNA PERDITA IRREPARABILE PER LA SPECIE UMANA?"
                    />
                    <div className="flex justify-between items-center">
                      {errors.value && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.value}</p>}
                      <p className="text-[10px] text-white/30 ml-auto uppercase tracking-tighter">Minimo 50 caratteri</p>
                    </div>
                  </div>

                  {/* File Upload Simulation */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                      <Upload size={12} /> Prova di Merito
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full bg-anthracite/30 border-2 border-dashed ${errors.file ? 'border-blood/50' : 'border-white/10'} rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 transition-all group`}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Upload size={32} className="text-white/20 group-hover:text-gold transition-colors mb-4" />
                      <p className="text-sm text-white/60 mb-1">
                        {formData.file ? formData.file.name : "Trascina o clicca per caricare certificazioni"}
                      </p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">PDF, JPG, PNG (MAX 10MB)</p>
                    </div>
                    {errors.file && <p className="text-blood text-[10px] uppercase tracking-wider">{errors.file}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold text-black font-display font-bold py-4 rounded-lg uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        TRASMISSIONE IN CORSO...
                      </>
                    ) : (
                      <>
                        INVIA CANDIDATURA <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-anthracite/50 border border-gold/30 rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <ShieldCheck size={40} className="text-gold" />
                  </div>
                  <h3 className="text-3xl font-display font-bold uppercase tracking-tighter mb-4">Candidatura Ricevuta</h3>
                  <p className="text-white/60 mb-8 max-w-md mx-auto">
                    I tuoi dati sono stati trasmessi al Consiglio dei Due Re. 
                    L'analisi del merito richiederà tempo. Non contattarci. Se sarai ritenuto degno, la tua porta si aprirà.
                  </p>
                  <div className="text-[10px] text-blood uppercase tracking-[0.3em] font-bold">
                    ATTENDI IL SEGNALE O L'ESTINZIONE.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-gold/50 font-display font-bold text-sm">
            <ShieldCheck size={16} />
            <span>ARCADIA © 2026</span>
          </div>
          
          <div className="flex items-center gap-4 text-blood text-[10px] uppercase tracking-[0.2em] font-medium text-center md:text-right">
            <ShieldAlert size={14} />
            <span>Le decisioni dei Due Re sono insindacabili. I tentativi di corruzione comportano l'esclusione immediata.</span>
          </div>
        </div>
      </footer>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.03),transparent_70%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blood/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
      </div>
    </div>
  );
}
