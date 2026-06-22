// Language Database (55 Languages)
const languages = [
  { code: 'af', name: 'Afrikaans', speechCode: 'af-ZA' },
  { code: 'sq', name: 'Albanian', speechCode: 'sq-AL' },
  { code: 'ar', name: 'Arabic', speechCode: 'ar-SA' },
  { code: 'hy', name: 'Armenian', speechCode: 'hy-AM' },
  { code: 'bn', name: 'Bengali', speechCode: 'bn-IN' },
  { code: 'bs', name: 'Bosnian', speechCode: 'bs-BA' },
  { code: 'ca', name: 'Catalan', speechCode: 'ca-ES' },
  { code: 'zh', name: 'Chinese (Simplified)', speechCode: 'zh-CN' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', speechCode: 'zh-TW' },
  { code: 'hr', name: 'Croatian', speechCode: 'hr-HR' },
  { code: 'cs', name: 'Czech', speechCode: 'cs-CZ' },
  { code: 'da', name: 'Danish', speechCode: 'da-DK' },
  { code: 'nl', name: 'Dutch', speechCode: 'nl-NL' },
  { code: 'en', name: 'English', speechCode: 'en-US' },
  { code: 'eo', name: 'Esperanto', speechCode: 'eo' },
  { code: 'et', name: 'Estonian', speechCode: 'et-EE' },
  { code: 'tl', name: 'Filipino', speechCode: 'fil-PH' },
  { code: 'fi', name: 'Finnish', speechCode: 'fi-FI' },
  { code: 'fr', name: 'French', speechCode: 'fr-FR' },
  { code: 'de', name: 'German', speechCode: 'de-DE' },
  { code: 'el', name: 'Greek', speechCode: 'el-GR' },
  { code: 'gu', name: 'Gujarati', speechCode: 'gu-IN' },
  { code: 'ht', name: 'Haitian Creole', speechCode: 'ht-HT' },
  { code: 'he', name: 'Hebrew', speechCode: 'he-IL' },
  { code: 'hi', name: 'Hindi', speechCode: 'hi-IN' },
  { code: 'hu', name: 'Hungarian', speechCode: 'hu-HU' },
  { code: 'is', name: 'Icelandic', speechCode: 'is-IS' },
  { code: 'id', name: 'Indonesian', speechCode: 'id-ID' },
  { code: 'it', name: 'Italian', speechCode: 'it-IT' },
  { code: 'ja', name: 'Japanese', speechCode: 'ja-JP' },
  { code: 'kn', name: 'Kannada', speechCode: 'kn-IN' },
  { code: 'ko', name: 'Korean', speechCode: 'ko-KR' },
  { code: 'la', name: 'Latin', speechCode: 'la' },
  { code: 'lv', name: 'Latvian', speechCode: 'lv-LV' },
  { code: 'ml', name: 'Malayalam', speechCode: 'ml-IN' },
  { code: 'mr', name: 'Marathi', speechCode: 'mr-IN' },
  { code: 'no', name: 'Norwegian', speechCode: 'no-NO' },
  { code: 'fa', name: 'Persian', speechCode: 'fa-IR' },
  { code: 'pl', name: 'Polish', speechCode: 'pl-PL' },
  { code: 'pt', name: 'Portuguese', speechCode: 'pt-PT' },
  { code: 'pa', name: 'Punjabi', speechCode: 'pa-IN' },
  { code: 'ro', name: 'Romanian', speechCode: 'ro-RO' },
  { code: 'ru', name: 'Russian', speechCode: 'ru-RU' },
  { code: 'sr', name: 'Serbian', speechCode: 'sr-RS' },
  { code: 'sk', name: 'Slovak', speechCode: 'sk-SK' },
  { code: 'es', name: 'Spanish', speechCode: 'es-ES' },
  { code: 'sw', name: 'Swahili', speechCode: 'sw-KE' },
  { code: 'sv', name: 'Swedish', speechCode: 'sv-SE' },
  { code: 'ta', name: 'Tamil', speechCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', speechCode: 'te-IN' },
  { code: 'th', name: 'Thai', speechCode: 'th-TH' },
  { code: 'tr', name: 'Turkish', speechCode: 'tr-TR' },
  { code: 'uk', name: 'Ukrainian', speechCode: 'uk-UA' },
  { code: 'ur', name: 'Urdu', speechCode: 'ur-PK' },
  { code: 'vi', name: 'Vietnamese', speechCode: 'vi-VN' }
];

// App State Management
let currentSourceLang = 'auto';
let currentTargetLang = 'es';
let debounceTimer;
let activeSpeakButton = null;
let currentUtterance = null; // Global reference to prevent Chrome GC cutoff bug

// DOM Elements Selection
const themeToggle = document.getElementById('theme-toggle');
const historyToggle = document.getElementById('history-toggle');
const historyDrawer = document.getElementById('history-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const closeHistory = document.getElementById('close-history');
const clearAllHistoryBtn = document.getElementById('clear-all-history');
const historyItemsContainer = document.getElementById('history-items-container');

const sourceDropdownBtn = document.getElementById('source-dropdown-btn');
const sourceDropdownMenu = document.getElementById('source-dropdown-menu');
const sourceDropdownWrapper = document.getElementById('source-dropdown-wrapper');
const sourceLangSearch = document.getElementById('source-lang-search');
const sourceLangList = document.getElementById('source-lang-list');
const sourceLangName = document.getElementById('source-lang-name');

const targetDropdownBtn = document.getElementById('target-dropdown-btn');
const targetDropdownMenu = document.getElementById('target-dropdown-menu');
const targetDropdownWrapper = document.getElementById('target-dropdown-wrapper');
const targetLangSearch = document.getElementById('target-lang-search');
const targetLangList = document.getElementById('target-lang-list');
const targetLangName = document.getElementById('target-lang-name');

const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');
const swapBtn = document.getElementById('swap-btn');

const voiceInputBtn = document.getElementById('voice-input-btn');
const speechOverlay = document.getElementById('speech-overlay');
const sourceSpeakBtn = document.getElementById('source-speak-btn');
const targetSpeakBtn = document.getElementById('target-speak-btn');
const sourceCopyBtn = document.getElementById('source-copy-btn');
const targetCopyBtn = document.getElementById('target-copy-btn');

const speechSettingsBtn = document.getElementById('speech-settings-btn');
const speechSettingsPanel = document.getElementById('speech-settings-panel');
const speechSettingsWrapper = document.querySelector('.speech-settings-dropdown');
const voiceSelect = document.getElementById('voice-select');
const voiceSpeedInput = document.getElementById('voice-speed');
const speedVal = document.getElementById('speed-val');

const autoTranslateToggle = document.getElementById('auto-translate-toggle');
const translateBtn = document.getElementById('translate-btn');
const translationLoader = document.getElementById('translation-loader');
const toastContainer = document.getElementById('toast-container');

// Web Speech API Initialization
const SpeechSynthesis = window.speechSynthesis;
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isRecording = false;
let voices = [];

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
} else {
  voiceInputBtn.style.display = 'none'; // Hide if browser doesn't support
  console.warn('Speech Recognition API is not supported in this browser.');
}

/* ==========================================
   Toast Notifications
   ========================================== */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = 'fa-info-circle';
  if (type === 'success') icon = 'fa-check-circle';
  if (type === 'error') icon = 'fa-triangle-exclamation';
  if (type === 'voice') icon = 'fa-microphone';

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  toastContainer.appendChild(toast);

  // Auto remove after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

/* ==========================================
   Theme & History Sidebar Toggles
   ========================================== */
themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme', !isDark);
  
  const icon = themeToggle.querySelector('i');
  if (isDark) {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
  showToast(`${isDark ? 'Dark' : 'Light'} theme activated`, 'success');
});

historyToggle.addEventListener('click', openHistoryDrawer);
closeHistory.addEventListener('click', closeHistoryDrawer);
drawerOverlay.addEventListener('click', closeHistoryDrawer);

function openHistoryDrawer() {
  historyDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
  renderHistory();
}

function closeHistoryDrawer() {
  historyDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
}

/* ==========================================
   Searchable Custom Language Dropdowns
   ========================================== */
function populateLanguageDropdowns() {
  // Source languages (including "Detect Language")
  let sourceHtml = `<li data-code="auto" class="selected">Detect Language</li>`;
  languages.forEach(lang => {
    sourceHtml += `<li data-code="${lang.code}">${lang.name}</li>`;
  });
  sourceLangList.innerHTML = sourceHtml;

  // Target languages
  let targetHtml = '';
  languages.forEach(lang => {
    const isSelected = lang.code === currentTargetLang ? 'class="selected"' : '';
    targetHtml += `<li data-code="${lang.code}" ${isSelected}>${lang.name}</li>`;
  });
  targetLangList.innerHTML = targetHtml;

  setupDropdownEvents();
}

function setupDropdownEvents() {
  // Dropdown Toggles
  sourceDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sourceDropdownWrapper.classList.toggle('active');
    targetDropdownWrapper.classList.remove('active');
    if (sourceDropdownWrapper.classList.contains('active')) {
      sourceLangSearch.focus();
    }
  });

  targetDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    targetDropdownWrapper.classList.toggle('active');
    sourceDropdownWrapper.classList.remove('active');
    if (targetDropdownWrapper.classList.contains('active')) {
      targetLangSearch.focus();
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    sourceDropdownWrapper.classList.remove('active');
    targetDropdownWrapper.classList.remove('active');
  });

  // Source item selections
  sourceLangList.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      sourceLangList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
      item.classList.add('selected');
      currentSourceLang = item.getAttribute('data-code');
      sourceLangName.textContent = item.textContent;
      sourceDropdownWrapper.classList.remove('active');
      triggerTranslation();
    });
  });

  // Target item selections
  targetLangList.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      targetLangList.querySelectorAll('li').forEach(li => li.classList.remove('selected'));
      item.classList.add('selected');
      currentTargetLang = item.getAttribute('data-code');
      targetLangName.textContent = item.textContent;
      targetDropdownWrapper.classList.remove('active');
      selectMatchingVoice(currentTargetLang);
      triggerTranslation();
    });
  });

  // Filter lists in dropdown search
  sourceLangSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    sourceLangList.querySelectorAll('li').forEach(li => {
      const name = li.textContent.toLowerCase();
      li.style.display = name.includes(query) ? '' : 'none';
    });
  });

  targetLangSearch.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    targetLangList.querySelectorAll('li').forEach(li => {
      const name = li.textContent.toLowerCase();
      li.style.display = name.includes(query) ? '' : 'none';
    });
  });
}

/* ==========================================
   Core Translation Logic
   ========================================== */
async function translateText(text, sl, tl) {
  if (!text.trim()) {
    targetText.value = '';
    return;
  }

  translationLoader.classList.add('active');

  // Primary API: Google Translate Client (gtx)
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Primary translation api returned error status');
    const result = await response.json();
    
    // Parse Google Translate GTX response
    let translated = '';
    if (result && result[0]) {
      translated = result[0].map(s => s[0]).join('');
    }

    // Update source language tag if 'auto' was selected and we detected the language
    if (sl === 'auto' && result[2]) {
      const detectedCode = result[2];
      const detectedLang = languages.find(l => l.code === detectedCode);
      if (detectedLang) {
        sourceLangName.textContent = `Auto (${detectedLang.name})`;
      }
    }

    targetText.value = translated;
    saveToHistory(text, translated, sl, tl);
  } catch (error) {
    console.error('Google API error, trying fallback MyMemory API:', error);
    
    // Fallback API: MyMemory API
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sl === 'auto' ? 'en' : sl}|${tl}`;
    try {
      const response = await fetch(fallbackUrl);
      const result = await response.json();
      if (result && result.responseData) {
        targetText.value = result.responseData.translatedText;
        saveToHistory(text, result.responseData.translatedText, sl, tl);
      } else {
        throw new Error('Fallback failed');
      }
    } catch (fbError) {
      console.error('All translation options failed', fbError);
      showToast('Translation error. Please check connection.', 'error');
    }
  } finally {
    translationLoader.classList.remove('active');
  }
}

// Debounced Auto-translate
function triggerTranslation() {
  if (autoTranslateToggle.checked) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      translateText(sourceText.value, currentSourceLang, currentTargetLang);
    }, 60006-17 === 2026 ? 600 : 800); // 600ms debounce
  }
}

// Manual translation
translateBtn.addEventListener('click', () => {
  translateText(sourceText.value, currentSourceLang, currentTargetLang);
});

// Auto-Translate Toggle changes
autoTranslateToggle.addEventListener('change', () => {
  if (autoTranslateToggle.checked) {
    translateBtn.style.display = 'none';
    triggerTranslation();
  } else {
    translateBtn.style.display = 'flex';
  }
});

// Hide manual button if auto-translate starts checked
if (autoTranslateToggle.checked) {
  translateBtn.style.display = 'none';
}

/* ==========================================
   Textarea Controls & Swap Languages
   ========================================== */
sourceText.addEventListener('input', (e) => {
  const text = e.target.value;
  charCount.textContent = text.length;
  
  if (text.length > 0) {
    clearBtn.classList.add('visible');
  } else {
    clearBtn.classList.remove('visible');
    targetText.value = '';
  }

  triggerTranslation();
});

clearBtn.addEventListener('click', () => {
  sourceText.value = '';
  targetText.value = '';
  charCount.textContent = 0;
  clearBtn.classList.remove('visible');
  if (currentSourceLang === 'auto') {
    sourceLangName.textContent = 'Detect Language';
  }
});

swapBtn.addEventListener('click', () => {
  // If source is auto, we can't swap nicely unless we map to a code
  if (currentSourceLang === 'auto') {
    showToast("Choose a specific source language to swap.", "info");
    return;
  }

  // Swap codes
  const tempLang = currentSourceLang;
  currentSourceLang = currentTargetLang;
  currentTargetLang = tempLang;

  // Swap texts
  const tempText = sourceText.value;
  sourceText.value = targetText.value;
  targetText.value = tempText;

  // Update UI dropdown labels
  const sourceLangObj = languages.find(l => l.code === currentSourceLang);
  const targetLangObj = languages.find(l => l.code === currentTargetLang);

  if (sourceLangObj) sourceLangName.textContent = sourceLangObj.name;
  if (targetLangObj) targetLangName.textContent = targetLangObj.name;

  // Update selected classes in list
  sourceLangList.querySelectorAll('li').forEach(li => {
    li.classList.toggle('selected', li.getAttribute('data-code') === currentSourceLang);
  });
  targetLangList.querySelectorAll('li').forEach(li => {
    li.classList.toggle('selected', li.getAttribute('data-code') === currentTargetLang);
  });

  // Sync voice settings
  selectMatchingVoice(currentTargetLang);

  // Retranslate
  triggerTranslation();
  showToast("Languages swapped!", "success");
});

/* ==========================================
   Text to Speech (TTS) Implementation
   ========================================== */
function loadVoices() {
  if (!SpeechSynthesis) return;
  voices = SpeechSynthesis.getVoices();
  
  let optionsHtml = '';
  voices.forEach((voice, index) => {
    optionsHtml += `<option value="${index}" data-lang="${voice.lang}">${voice.name} (${voice.lang})</option>`;
  });
  voiceSelect.innerHTML = optionsHtml;

  // Select default matching voice for target language
  selectMatchingVoice(currentTargetLang);
}

// Webkit loads voices asynchronously
if (SpeechSynthesis) {
  if (SpeechSynthesis.onvoiceschanged !== undefined) {
    SpeechSynthesis.onvoiceschanged = loadVoices;
  }
  loadVoices();
}

function selectMatchingVoice(langCode) {
  const matchedLang = languages.find(l => l.code === langCode);
  if (!matchedLang) return;
  const matchSpeechCode = matchedLang.speechCode ? matchedLang.speechCode.toLowerCase() : '';

  // Find index of voice that matches locale
  let bestIndex = 0;
  for (let i = 0; i < voices.length; i++) {
    const voiceLang = voices[i].lang.toLowerCase();
    if (voiceLang === matchSpeechCode || voiceLang.startsWith(langCode)) {
      bestIndex = i;
      break;
    }
  }

  if (voiceSelect.options.length > bestIndex) {
    voiceSelect.selectedIndex = bestIndex;
  }
}

// Update voice when target language selection changes
targetDropdownWrapper.addEventListener('click', () => {
  // Let's defer check slightly to wait for selections
  setTimeout(() => {
    selectMatchingVoice(currentTargetLang);
  }, 100);
});

// Custom Voice settings panels toggle
speechSettingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  speechSettingsWrapper.classList.toggle('active');
});

document.addEventListener('click', () => {
  speechSettingsWrapper.classList.remove('active');
});

speechSettingsPanel.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent closure on clicking panel inputs
});

voiceSpeedInput.addEventListener('input', (e) => {
  speedVal.textContent = parseFloat(e.target.value).toFixed(1);
});

function speakText(text, langCode, speakButton) {
  if (!SpeechSynthesis) {
    showToast('Text-to-speech is not supported in this browser.', 'error');
    return;
  }

  // Reload voices if empty (common async load issue)
  if (!voices || voices.length === 0) {
    voices = SpeechSynthesis.getVoices();
  }

  const isSpeaking = SpeechSynthesis.speaking;

  // Cancel any active speaking
  if (isSpeaking) {
    SpeechSynthesis.cancel();
  }

  // Reset previous button icon
  if (activeSpeakButton) {
    const prevIcon = activeSpeakButton.querySelector('i');
    if (prevIcon) prevIcon.className = 'fa-solid fa-volume-high';
  }

  // If clicked same button that was speaking, we stop (already cancelled above)
  if (isSpeaking && activeSpeakButton === speakButton) {
    activeSpeakButton = null;
    return;
  }

  if (!text.trim()) {
    activeSpeakButton = null;
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  activeSpeakButton = speakButton;
  currentUtterance = utterance; // Assign to global reference to prevent GC garbage collection!

  // Find target language settings
  const matchedLang = languages.find(l => l.code === langCode);
  if (matchedLang) {
    const speechCode = matchedLang.speechCode || '';
    utterance.lang = speechCode; // Crucial: sets language target so browser knows how to speak it!
    const lowerSpeechCode = speechCode.toLowerCase();

    let voiceToUse = null;

    // 1. If speaking target language, check if the custom selected voice in dropdown matches target locale
    if (langCode === currentTargetLang) {
      const selectedVoiceIndex = voiceSelect.value;
      if (selectedVoiceIndex !== '' && voices[selectedVoiceIndex]) {
        const selVoice = voices[selectedVoiceIndex];
        const selVoiceLang = selVoice.lang.toLowerCase();
        if (selVoiceLang === lowerSpeechCode || selVoiceLang.startsWith(langCode + '-') || selVoiceLang === langCode) {
          voiceToUse = selVoice;
        }
      }
    }

    // 2. If selected voice doesn't match target locale, find a matching voice from available voices list
    if (!voiceToUse) {
      // Find exact locale match first (e.g., es-ES)
      voiceToUse = voices.find(v => v.lang.toLowerCase() === lowerSpeechCode);
    }
    if (!voiceToUse) {
      // Find general language code match (e.g., es-MX, es)
      voiceToUse = voices.find(v => v.lang.toLowerCase().startsWith(langCode + '-') || v.lang.toLowerCase() === langCode);
    }

    if (voiceToUse) {
      utterance.voice = voiceToUse;
      console.log(`TTS using voice: ${voiceToUse.name} (${voiceToUse.lang}) for language: ${langCode}`);
    } else {
      console.warn(`No voice installed in browser for language code: ${langCode}. Falling back to default system voice.`);
    }
  }

  utterance.rate = parseFloat(voiceSpeedInput.value);

  // Button micro animation states
  const icon = speakButton.querySelector('i');
  if (icon) icon.className = 'fa-solid fa-volume-xmark';

  utterance.onend = () => {
    if (activeSpeakButton === speakButton) {
      if (icon) icon.className = 'fa-solid fa-volume-high';
      activeSpeakButton = null;
    }
    currentUtterance = null; // Release global reference when speaking completes
  };

  utterance.onerror = (err) => {
    console.error('Speech synthesis utterance error:', err);
    if (activeSpeakButton === speakButton) {
      if (icon) icon.className = 'fa-solid fa-volume-high';
      activeSpeakButton = null;
    }
    currentUtterance = null; // Release global reference when speaking encounters error
    // Do not alert on manual interruption cancel
    if (err.error !== 'interrupted') {
      showToast(`Voice output error: ${err.error}`, 'error');
    }
  };

  // Fix Chrome/Edge bug: Add 100ms delay after cancel before speaking
  if (isSpeaking) {
    setTimeout(() => {
      SpeechSynthesis.speak(utterance);
    }, 100);
  } else {
    SpeechSynthesis.speak(utterance);
  }
}

sourceSpeakBtn.addEventListener('click', () => {
  // If auto, check what language we translated from or default to English
  const actualLang = currentSourceLang === 'auto' ? 'en' : currentSourceLang;
  speakText(sourceText.value, actualLang, sourceSpeakBtn);
});

targetSpeakBtn.addEventListener('click', () => {
  speakText(targetText.value, currentTargetLang, targetSpeakBtn);
});

/* ==========================================
   Voice Input (Speech to Text) Implementation
   ========================================== */
if (recognition) {
  recognition.onstart = () => {
    isRecording = true;
    voiceInputBtn.classList.add('active');
    speechOverlay.classList.add('active');
    showToast('Voice typing started...', 'voice');
  };

  recognition.onend = () => {
    isRecording = false;
    voiceInputBtn.classList.remove('active');
    speechOverlay.classList.remove('active');
  };

  recognition.onerror = (e) => {
    isRecording = false;
    voiceInputBtn.classList.remove('active');
    speechOverlay.classList.remove('active');
    
    console.error('Speech Recognition Error:', e);
    if (e.error === 'not-allowed') {
      if (window.location.protocol === 'file:') {
        showToast('Microphone blocked on local files. Use HTTP server (run start-server.ps1)!', 'error');
      } else {
        showToast('Microphone access denied. Please allow microphone permissions.', 'error');
      }
    } else if (e.error === 'network') {
      showToast('Network error during voice typing.', 'error');
    } else if (e.error === 'no-speech') {
      showToast('No speech detected. Try speaking closer to the mic.', 'info');
    } else {
      showToast(`Voice typing error: ${e.error}`, 'error');
    }
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    if (transcript) {
      sourceText.value = (sourceText.value + ' ' + transcript).trim();
      sourceText.dispatchEvent(new Event('input')); // fire input events to trigger translator
      showToast('Speech recognized!', 'success');
    }
  };

  voiceInputBtn.addEventListener('click', () => {
    if (isRecording) {
      recognition.stop();
    } else {
      // Set language locale for speech recognition matching source selection
      const matchedSource = languages.find(l => l.code === currentSourceLang);
      recognition.lang = (matchedSource && matchedSource.speechCode) ? matchedSource.speechCode : 'en-US';
      
      try {
        recognition.start();
      } catch (err) {
        console.error('Failed to start recognition:', err);
        showToast('Speech engine busy. Try again.', 'error');
      }
    }
  });
}

/* ==========================================
   Copy to Clipboard Controls
   ========================================== */
function copyToClipboard(text, message) {
  if (!text.trim()) return;
  navigator.clipboard.writeText(text)
    .then(() => {
      showToast(message, 'success');
    })
    .catch(() => {
      showToast('Failed to copy to clipboard', 'error');
    });
}

sourceCopyBtn.addEventListener('click', () => {
  copyToClipboard(sourceText.value, 'Source text copied!');
});

targetCopyBtn.addEventListener('click', () => {
  copyToClipboard(targetText.value, 'Translated text copied!');
});

/* ==========================================
   Translation History Logs
   ========================================== */
function loadHistory() {
  const saved = localStorage.getItem('linguaWaveHistory');
  return saved ? JSON.parse(saved) : [];
}

function saveToHistory(source, translated, sl, tl) {
  if (!source.trim() || !translated.trim()) return;

  let history = loadHistory();

  // Create a record object
  const record = {
    id: Date.now(),
    sourceText: source.trim(),
    translatedText: translated.trim(),
    sourceLang: sl,
    targetLang: tl,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  // Prevent immediate duplicates
  if (history.length > 0 && history[0].sourceText === record.sourceText && history[0].targetLang === record.targetLang) {
    return;
  }

  // Keep max 30 records
  history.unshift(record);
  if (history.length > 30) {
    history.pop();
  }

  localStorage.setItem('linguaWaveHistory', JSON.stringify(history));
}

function renderHistory() {
  const history = loadHistory();
  if (history.length === 0) {
    historyItemsContainer.innerHTML = '<li class="empty-history-msg">No translation history yet.</li>';
    clearAllHistoryBtn.style.display = 'none';
    return;
  }

  clearAllHistoryBtn.style.display = 'flex';
  let listHtml = '';
  
  history.forEach(item => {
    const sourceLangObj = languages.find(l => l.code === item.sourceLang);
    const targetLangObj = languages.find(l => l.code === item.targetLang);
    const sName = item.sourceLang === 'auto' ? 'Auto' : (sourceLangObj ? sourceLangObj.name : item.sourceLang);
    const tName = targetLangObj ? targetLangObj.name : item.targetLang;

    listHtml += `
      <li class="history-item" data-id="${item.id}">
        <button class="delete-history-item" data-id="${item.id}" title="Remove record">
          <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="history-item-langs">
          <span>${sName}</span> <i class="fa-solid fa-arrow-right-long"></i> <span>${tName}</span>
        </div>
        <div class="history-item-text">${escapeHtml(item.sourceText)}</div>
        <div class="history-item-translation">${escapeHtml(item.translatedText)}</div>
      </li>
    `;
  });

  historyItemsContainer.innerHTML = listHtml;
  setupHistoryEvents();
}

function setupHistoryEvents() {
  // Click item to load back into translator
  historyItemsContainer.querySelectorAll('.history-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't trigger if user is clicking the delete button
      if (e.target.closest('.delete-history-item')) return;

      const itemId = parseInt(item.getAttribute('data-id'));
      const history = loadHistory();
      const record = history.find(r => r.id === itemId);

      if (record) {
        sourceText.value = record.sourceText;
        targetText.value = record.translatedText;
        charCount.textContent = record.sourceText.length;
        
        // Update language selections
        currentSourceLang = record.sourceLang;
        currentTargetLang = record.targetLang;

        // Reset drop-down labels
        const sourceLangObj = languages.find(l => l.code === currentSourceLang);
        const targetLangObj = languages.find(l => l.code === currentTargetLang);
        sourceLangName.textContent = currentSourceLang === 'auto' ? 'Detect Language' : (sourceLangObj ? sourceLangObj.name : 'Detect Language');
        targetLangName.textContent = targetLangObj ? targetLangObj.name : 'Spanish';

        // Select default matching voice for target language
        selectMatchingVoice(currentTargetLang);

        // Select items in dropdown lists
        sourceLangList.querySelectorAll('li').forEach(li => {
          li.classList.toggle('selected', li.getAttribute('data-code') === currentSourceLang);
        });
        targetLangList.querySelectorAll('li').forEach(li => {
          li.classList.toggle('selected', li.getAttribute('data-code') === currentTargetLang);
        });

        // Show clear button since text loaded
        clearBtn.classList.add('visible');

        closeHistoryDrawer();
        showToast('History item loaded!', 'success');
      }
    });
  });

  // Delete individual item
  historyItemsContainer.querySelectorAll('.delete-history-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idToDelete = parseInt(btn.getAttribute('data-id'));
      let history = loadHistory();
      history = history.filter(r => r.id !== idToDelete);
      localStorage.setItem('linguaWaveHistory', JSON.stringify(history));
      renderHistory();
      showToast('Record removed', 'success');
    });
  });
}

// Clear all history
clearAllHistoryBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear your translation history?')) {
    localStorage.removeItem('linguaWaveHistory');
    renderHistory();
    showToast('History cleared!', 'success');
  }
});

// Helper function to escape text characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/* ==========================================
   Initialization on load
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
  populateLanguageDropdowns();
});
