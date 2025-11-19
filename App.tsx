import React, { useState, useCallback } from 'react';
import { 
  Network, 
  Monitor, 
  AlertTriangle, 
  Cpu, 
  ArrowRight, 
  RefreshCw, 
  Download,
  Share2,
  Eye
} from 'lucide-react';
import { TerminalBlock } from './components/TerminalBlock';
import { SectionCard } from './components/SectionCard';
import { generateSpanSchema } from './services/geminiService';
import { LoadingState } from './types';

const App: React.FC = () => {
  const [imageState, setImageState] = useState<LoadingState>(LoadingState.IDLE);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (imageState === LoadingState.LOADING) return;

    setImageState(LoadingState.LOADING);
    try {
      const url = await generateSpanSchema();
      setGeneratedImageUrl(url);
      setImageState(LoadingState.SUCCESS);
    } catch (e) {
      console.error(e);
      setImageState(LoadingState.ERROR);
    }
  }, [imageState]);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="text-indigo-600" size={28} />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-600">
              SPAN Visualizer
            </h1>
          </div>
          <div className="text-sm text-slate-500 font-medium">
            Cisco Network Fundamentals
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / Context */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Switch Port Analyzer (SPAN)
          </h2>
          <p className="text-lg text-slate-600">
            Une fonctionnalité essentielle pour le diagnostic réseau. Comprenez comment répliquer le trafic sans interrompre le service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Content */}
          <div className="space-y-6">
            
            {/* Presentation */}
            <SectionCard 
              title="Présentation" 
              icon={Eye} 
              colorClass="bg-indigo-600"
            >
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="mt-1 text-indigo-500 shrink-0" />
                  <span>Copie locale du trafic d’un port ou groupe de ports vers un autre port du même switch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="mt-1 text-indigo-500 shrink-0" />
                  <span>Le trafic original reste <strong>non perturbé</strong> (pas de latence ajoutée).</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight size={18} className="mt-1 text-indigo-500 shrink-0" />
                  <span><strong>Analogie :</strong> Un miroir numérique qui reflète les données vers une sonde.</span>
                </li>
              </ul>
            </SectionCard>

            {/* Functionalities */}
            <SectionCard 
              title="Fonctionnalités Clés" 
              icon={Cpu} 
              colorClass="bg-teal-600"
            >
              <div className="mb-4">
                Permet de surveiller :
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 ml-2">Port Serveur</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 ml-2">Uplink</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 ml-2">VLAN</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">Direction du trafic :</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-100 rounded p-2 text-sm font-medium text-slate-700">RX (Reçus)</div>
                <div className="bg-slate-100 rounded p-2 text-sm font-medium text-slate-700">TX (Émis)</div>
                <div className="bg-slate-100 rounded p-2 text-sm font-medium text-slate-700">BOTH (Les deux)</div>
              </div>
            </SectionCard>

            {/* Commands */}
            <SectionCard 
              title="Configuration Cisco" 
              icon={Monitor} 
              colorClass="bg-slate-700"
            >
              <TerminalBlock title="IOS CLI">
                <div className="text-green-400">Switch(config)# monitor session 1</div>
                <div className="pl-4"><span className="text-purple-400">source interface</span> Fa0/1</div>
                <div className="pl-4 text-gray-500">! Ou surveillance d'un VLAN entier</div>
                <div className="pl-4"><span className="text-purple-400">source vlan</span> 10</div>
                <div className="pl-4"><span className="text-purple-400">destination interface</span> Fa0/24</div>
                <div className="mt-2 text-gray-400 text-xs border-t border-gray-700 pt-2">
                  <span className="text-yellow-500">monitor session 1</span> : ID de session locale<br/>
                  <span className="text-yellow-500">source</span> : Port ou VLAN à écouter<br/>
                  <span className="text-yellow-500">destination</span> : Port connecté à l'analyseur (Wireshark)
                </div>
              </TerminalBlock>
            </SectionCard>

            {/* Pitfalls */}
            <SectionCard 
              title="Pièges à éviter" 
              icon={AlertTriangle} 
              colorClass="bg-amber-500"
            >
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="font-bold text-amber-600">1.</span>
                  <p className="text-sm text-amber-900">Incompatibilité : Impossible de mélanger VLAN source et Interface source dans la <em>même</em> session.</p>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="font-bold text-amber-600">2.</span>
                  <p className="text-sm text-amber-900">Oversubscription : Le port destination doit supporter le débit cumulé (RX + TX) pour éviter les pertes de paquets.</p>
                </div>
                <div className="flex gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <span className="font-bold text-amber-600">3.</span>
                  <p className="text-sm text-amber-900">Mode Dédié : Le port destination ne participe plus au trafic réseau normal (pas de ping, pas d'accès internet).</p>
                </div>
              </div>
            </SectionCard>

          </div>

          {/* Right Column: Visualization Generator */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                 Schéma SPAN
              </h3>
              <p className="text-slate-300 mb-6">
                Générez une représentation visuelle du concept SPAN utilisant l'IA pour illustrer le flux de trafic miroir.
              </p>

              <div className="bg-black/30 rounded-xl aspect-video flex items-center justify-center border border-white/10 relative overflow-hidden group">
                {imageState === LoadingState.IDLE && (
                  <div className="text-center p-6">
                    <Network size={48} className="mx-auto text-slate-500 mb-3 opacity-50" />
                    <p className="text-sm text-slate-400">Aucun schéma généré</p>
                  </div>
                )}

                {imageState === LoadingState.LOADING && (
                  <div className="flex flex-col items-center animate-pulse">
                    <RefreshCw size={32} className="text-indigo-400 animate-spin mb-2" />
                    <p className="text-sm text-indigo-300">Génération du schéma via Gemini...</p>
                  </div>
                )}

                {imageState === LoadingState.SUCCESS && generatedImageUrl && (
                  <>
                    <img 
                      src={generatedImageUrl} 
                      alt="SPAN Diagram" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <a 
                        href={generatedImageUrl} 
                        download="span-schema.jpg"
                        className="bg-white text-slate-900 px-4 py-2 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all"
                      >
                        <Download size={16} /> Sauvegarder
                      </a>
                    </div>
                  </>
                )}
                 
                 {imageState === LoadingState.ERROR && (
                   <div className="text-center text-red-300 p-6">
                     <AlertTriangle size={32} className="mx-auto mb-2" />
                     <p>Erreur de génération.</p>
                     <button onClick={() => setImageState(LoadingState.IDLE)} className="text-xs underline mt-2">Réessayer</button>
                   </div>
                 )}
              </div>

              <button
                onClick={handleGenerateImage}
                disabled={imageState === LoadingState.LOADING}
                className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 
                  ${imageState === LoadingState.LOADING 
                    ? 'bg-slate-700 cursor-not-allowed text-slate-400' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg hover:shadow-indigo-500/25 active:transform active:scale-95'
                  }`}
              >
                {imageState === LoadingState.LOADING ? 'Création en cours...' : imageState === LoadingState.SUCCESS ? 'Générer un nouveau schéma' : 'Générer le schéma'}
                {imageState !== LoadingState.LOADING && <Share2 size={18} />}
              </button>

              {imageState === LoadingState.SUCCESS && (
                 <p className="text-xs text-center mt-3 text-slate-400 opacity-70">
                   Image générée par le modèle Google Imagen 3
                 </p>
              )}
            </div>

            {/* Mini Info Box */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
              <h4 className="font-semibold text-teal-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                Astuce Pro
              </h4>
              <p className="text-sm text-teal-800 leading-relaxed">
                Utilisez SPAN pour le dépannage (Wireshark), mais aussi pour les IDS (Intrusion Detection Systems) afin d'analyser le trafic malveillant sans ralentir le réseau.
              </p>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default App;