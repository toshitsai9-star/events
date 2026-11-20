import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Volume2, 
  Sparkles, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  RefreshCw, 
  Save, 
  ExternalLink 
} from 'lucide-react';

/**
 * DigitalHostAdminModal Component
 * 
 * Secure administrator configuration system for HeyGen AI Talking Avatar:
 * - Update and verify HEYGEN_API_KEY securely.
 * - Edit the official Telugu introduction script.
 * - Select and preview available Telugu male voices.
 * - Initiate real AI video generation via HeyGen API.
 * - Monitor rendering progress with live polling.
 * - Preview and publish completed video to the website.
 */
export default function DigitalHostAdminModal({ isOpen, onClose, onConfigUpdated }) {
  const [config, setConfig] = useState(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [script, setScript] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState('');
  const [isLoadingVoices, setIsLoadingVoices] = useState(false);
  
  // Audio preview state
  const [previewAudioUrl, setPreviewAudioUrl] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef(new Audio());

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');
  const [activeVideoId, setActiveVideoId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Fetch current config on open
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/avatar/config')
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setHasApiKey(data.hasApiKey);
        setScript(data.script || '');
        setSelectedVoiceId(data.selectedVoiceId || 'te-IN-MohanNeural');
        if (data.videoUrl) setGeneratedVideoUrl(data.videoUrl);
      })
      .catch((err) => console.error('Failed to load config:', err));

    loadVoices();
  }, [isOpen]);

  const loadVoices = () => {
    setIsLoadingVoices(true);
    fetch('/api/avatar/voices')
      .then((res) => res.json())
      .then((data) => {
        setVoices(data.voices || []);
        setIsLoadingVoices(false);
      })
      .catch((err) => {
        console.error('Failed to load voices:', err);
        setIsLoadingVoices(false);
      });
  };

  // Save API Key
  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) return;

    try {
      const res = await fetch('/api/avatar/api-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setHasApiKey(true);
        setApiKeyInput('');
        setSuccessMsg('HeyGen API Key saved securely to server .env!');
        loadVoices();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Preview Voice Audio
  const handlePreviewVoice = (audioUrl) => {
    if (!audioUrl) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    audioRef.current.src = audioUrl;
    audioRef.current.play();
    setIsPlayingAudio(true);
    audioRef.current.onended = () => setIsPlayingAudio(false);
    audioRef.current.onerror = () => setIsPlayingAudio(false);
  };

  // Save Script & Voice to configuration
  const handleSaveConfig = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const selectedVoice = voices.find((v) => v.voice_id === selectedVoiceId);
      const res = await fetch('/api/avatar/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script,
          selectedVoiceId,
          selectedVoiceName: selectedVoice?.name || selectedVoiceId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Settings updated successfully!');
        if (onConfigUpdated) onConfigUpdated(data.config);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  // Trigger HeyGen Video Generation
  const handleGenerateVideo = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationStatus('Initiating HeyGen photo avatar rendering...');

    try {
      const res = await fetch('/api/avatar/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script,
          voiceId: selectedVoiceId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to start generation');

      const videoId = data.videoId;
      setActiveVideoId(videoId);
      setGenerationStatus('Rendering video & lip-syncing Telugu audio...');
      setGenerationProgress(35);

      // Start polling for video completion
      pollVideoStatus(videoId);
    } catch (err) {
      setIsGenerating(false);
      setErrorMsg(err.message);
      setGenerationStatus('Failed');
    }
  };

  // Poll HeyGen status endpoint
  const pollVideoStatus = (videoId) => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/avatar/status/${videoId}`);
        const data = await res.json();

        if (data.status === 'completed' && data.videoUrl) {
          clearInterval(pollInterval);
          setIsGenerating(false);
          setGenerationProgress(100);
          setGenerationStatus('Completed successfully!');
          setGeneratedVideoUrl(data.videoUrl);
          setSuccessMsg('AI Video successfully generated! Click "Publish to Website" to activate.');
        } else if (data.status === 'failed') {
          clearInterval(pollInterval);
          setIsGenerating(false);
          setGenerationStatus('Failed');
          setErrorMsg(data.error || 'HeyGen render job failed');
        } else {
          setGenerationProgress((prev) => Math.min(prev + 5, 90));
          setGenerationStatus(`Rendering in progress (${data.status})...`);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 4000);
  };

  // Publish video to website
  const handlePublishVideo = async () => {
    if (!generatedVideoUrl) return;

    try {
      const res = await fetch('/api/avatar/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: generatedVideoUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg('Video published live to your website digital host section!');
        if (onConfigUpdated) onConfigUpdated(data.config);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gold/30 overflow-hidden my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#06110C] text-white border-b border-gold/20">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Telugu AI Avatar Studio
              </h3>
              <p className="text-[10px] text-white/60 uppercase tracking-widest font-mono">
                HeyGen API Video Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto text-[#111111]">
          
          {/* Notifications */}
          {errorMsg && (
            <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start space-x-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Section 1: HeyGen API Key */}
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="w-4 h-4 text-gold" />
                <span className="font-bold text-xs uppercase tracking-wider text-gray-800">
                  HeyGen API Key
                </span>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                hasApiKey ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {hasApiKey ? '✓ CONNECTED' : 'KEY REQUIRED'}
              </span>
            </div>

            <form onSubmit={handleSaveApiKey} className="flex space-x-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder={hasApiKey ? '•••••••••••••••••••••••• (Key Active)' : 'Enter HEYGEN_API_KEY...'}
                className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#06110C] text-white hover:bg-gold text-xs font-semibold rounded-lg transition-colors"
              >
                Save Key
              </button>
            </form>
            <p className="text-[10px] text-gray-500">
              Your API key is stored securely on the server environment (<code className="font-mono">.env</code>) and is never sent to the visitor browser.
            </p>
          </div>

          {/* Section 2: Telugu Introduction Script */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Official Telugu Introduction Script
            </label>
            <textarea
              rows={4}
              value={script}
              onChange={(e) => setScript(e.target.value)}
              className="w-full p-3 text-sm font-sans border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold/30 bg-gray-50/50"
              placeholder="నమస్కారం! అందరికీ..."
            />
            <p className="text-[10px] text-gray-500">
              Telugu Unicode script will be fed directly into HeyGen text-to-speech with natural Andhra phrasing.
            </p>
          </div>

          {/* Section 3: Telugu Voice Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Verified Telugu Male Voice
              </label>
              <button
                type="button"
                onClick={loadVoices}
                className="text-[10px] text-gold hover:underline flex items-center space-x-1"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingVoices ? 'animate-spin' : ''}`} />
                <span>Refresh Voices</span>
              </button>
            </div>

            <div className="space-y-2">
              {voices.map((v) => (
                <div
                  key={v.voice_id}
                  onClick={() => setSelectedVoiceId(v.voice_id)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                    selectedVoiceId === v.voice_id
                      ? 'border-gold bg-gold/5 ring-1 ring-gold shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      selectedVoiceId === v.voice_id ? 'border-gold bg-gold' : 'border-gray-300'
                    }`}>
                      {selectedVoiceId === v.voice_id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 leading-none">
                        {v.name}
                      </p>
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                        {v.gender} · {v.language} {v.accent ? `(${v.accent})` : ''}
                      </span>
                    </div>
                  </div>

                  {v.preview_audio && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviewVoice(v.preview_audio);
                      }}
                      className="px-2.5 py-1 text-[10px] font-semibold rounded-md border border-gray-300 hover:border-gold hover:text-gold flex items-center space-x-1 transition-colors"
                      title="Listen to voice sample"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Preview</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Video Generation & Live Progress */}
          <div className="p-4 rounded-xl border border-gold/30 bg-[#FAF7F0] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  Generate Talking Avatar Video
                </h4>
                <p className="text-[10px] text-gray-500">
                  Uses transparent founder portrait <code className="font-mono">/founder-cutout.png</code>.
                </p>
              </div>

              <button
                type="button"
                disabled={isGenerating || !hasApiKey}
                onClick={handleGenerateVideo}
                className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-md transition-all ${
                  isGenerating || !hasApiKey
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#06110C] text-white hover:bg-gold hover:scale-105 active:scale-95'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Rendering...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Generate AI Video</span>
                  </>
                )}
              </button>
            </div>

            {/* Progress bar */}
            {isGenerating && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-gray-600">
                  <span>{generationStatus}</span>
                  <span className="font-bold">{generationProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div 
                    className="h-full bg-gold transition-all duration-500 ease-out"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Completed Video Preview & Publish */}
            {generatedVideoUrl && (
              <div className="pt-2 border-t border-gold/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Completed Video Ready</span>
                  </span>

                  <button
                    type="button"
                    onClick={handlePublishVideo}
                    className="inline-flex items-center space-x-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold tracking-wide shadow-sm transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Publish to Website</span>
                  </button>
                </div>

                <div className="aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
                  <video
                    src={generatedVideoUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleSaveConfig}
            className="inline-flex items-center space-x-1.5 px-5 py-2 bg-[#06110C] hover:bg-gold text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}

