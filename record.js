document.addEventListener('DOMContentLoaded', () => {
  const symptomButtons = document.querySelectorAll('.symptomButton');

  symptomButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected'); // Toggle the 'selected' class
    });
  });
});
// Retrieve the selected language from localStorage
const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to 'en' if not set

// Translation data for different languages
const translations = {
  English: {
    title: "Record Your Symptoms",
    startRecording: "Start Recording",
    stopRecording: "Stop Recording",
    submit: "Submit Symptoms",
    audioTitle: "Record Your Voice:",
    otherSymptomsLabel: "Describe any additional symptoms:",
    symptoms: [
      "Headache",
      "Fever",
      "Cough",
      "Fatigue",
      "Chest Pain"
    ]
  },
  Hindi: {
    title: "अपने लक्षण रिकॉर्ड करें",
    startRecording: "रिकॉर्ड शुरू करें",
    stopRecording: "रिकॉर्ड बंद करें",
    submit: "लक्षण जमा करें",
    audioTitle: "अपनी आवाज रिकॉर्ड करें:",
    otherSymptomsLabel: "कृपया कोई अन्य लक्षण दर्ज करें:",
    symptoms: [
      "सिर दर्द",
      "बुखार",
      "खांसी",
      "थकान",
      "सीने में दर्द"
    ]
  },
  Bengali: {
    title: "আপনার লক্ষণ রেকর্ড করুন",
    startRecording: "রেকর্ড শুরু করুন",
    stopRecording: "রেকর্ড থামান",
    submit: "লক্ষণ জমা দিন",
    audioTitle: "আপনার কন্ঠ রেকর্ড করুন:",
    otherSymptomsLabel: "অন্যান্য লক্ষণ বর্ণনা করুন:",
    symptoms: [
      "মাথাব্যথা",
      "জ্বর",
      "কাশি",
      "থাকান",
      "বুকে ব্যথা"
    ]
  },
  Tamil: {
    title: "உங்கள் அறிகுறிகளைப் பதிவு செய்யுங்கள்",
    startRecording: "பதிவு செய்யத் தொடங்கு",
    stopRecording: "பதிவு செய்வதை நிறுத்து",
    submit: "அறிகுறிகளைச் சமர்ப்பிக்கவும்",
    audioTitle: "உங்கள் குரலைப் பதிவு செய்யுங்கள்:",
    otherSymptomsLabel: "பிற அறிகுறிகளை விவரிக்கவும்:",
    symptoms: [
        "தலைவலி",
        "காய்ச்சல்",
        "இருமல்",
        "சோர்வு",
        "நெஞ்சு வலி"
    ]
  },
  Odia:{
    title: "ଆପଣଙ୍କ ଲକ୍ଷଣ ରେକର୍ଡ କରନ୍ତୁ",
    startRecording: "ରେକର୍ଡିଂ ଆରମ୍ଭ କରନ୍ତୁ",
    stopRecording: "ରେକର୍ଡିଂ ବନ୍ଦ କରନ୍ତୁ",
    submit: "ଲକ୍ଷଣ ଦାଖଲ କରନ୍ତୁ",
    audioTitle: "ଆପଣଙ୍କ ସ୍ୱର ରେକର୍ଡ କରନ୍ତୁ:",
    otherSymptomsLabel: "ଅନ୍ୟ ଲକ୍ଷଣ ବର୍ଣ୍ଣନା କରନ୍ତୁ:",
    symptoms: [
        "ମୁଣ୍ଡବିନ୍ଧା",
        "ଜ୍ୱର",
        "କାଶ",
        "କ୍ଳାନ୍ତି",
        "ଛାତି ଯନ୍ତ୍ରଣା"
    ]
}

};

// Set the page text based on selected language
document.getElementById('pageTitle').textContent = translations[selectedLanguage].title;
document.getElementById('audioTitle').textContent = translations[selectedLanguage].audioTitle;
document.getElementById('otherSymptomsLabel').textContent = translations[selectedLanguage].otherSymptomsLabel;
document.getElementById('submitSymptoms').textContent = translations[selectedLanguage].submit;

// Set the start and stop recording button text based on the selected language
document.getElementById('startRecord').textContent = translations[selectedLanguage].startRecording;
document.getElementById('stopRecord').textContent = translations[selectedLanguage].stopRecording;

// Create symptom buttons dynamically
const symptomsButtons = document.getElementById('symptomsButtons');
translations[selectedLanguage].symptoms.forEach(symptom => {
  const button = document.createElement('button');
  button.textContent = symptom;
  button.classList.add('symptomButton');
  symptomsButtons.appendChild(button);
});

// Audio recording functionality
let mediaRecorder;
let audioChunks = [];
let mediaStream;

document.getElementById('startRecord').addEventListener('click', async () => {
  // Request microphone access
  mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(mediaStream);

  // Collect audio chunks
  mediaRecorder.ondataavailable = event => audioChunks.push(event.data);

  // Process and convert to WAV when recording stops
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const wavBlob = await convertToWav(audioBlob);

    // Create audio playback
    const wavUrl = URL.createObjectURL(wavBlob);
    const audioElement = document.getElementById('audioPlayback');
    audioElement.src = wavUrl;

    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = wavUrl;
    downloadLink.download = 'symptoms-recording.wav';
    downloadLink.textContent = 'Download Recorded Audio (WAV)';
    document.body.appendChild(downloadLink);

    // Stop all tracks to release the microphone
    mediaStream.getTracks().forEach(track => track.stop());
  };

  // Start recording
  audioChunks = []; // Clear previous recordings
  mediaRecorder.start();
  document.getElementById('stopRecord').disabled = false;
  document.getElementById('startRecord').disabled = true;
});

document.getElementById('stopRecord').addEventListener('click', () => {
  mediaRecorder.stop();
  document.getElementById('startRecord').disabled = false;
  document.getElementById('stopRecord').disabled = true;
});

// Convert audio blob to WAV format
async function convertToWav(audioBlob) {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await decodeAudioData(arrayBuffer);
  const wavArrayBuffer = encodeWav(audioBuffer);
  return new Blob([wavArrayBuffer], { type: 'audio/wav' });
}

// Decode audio data using Web Audio API
async function decodeAudioData(arrayBuffer) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  return await audioContext.decodeAudioData(arrayBuffer);
}

// Encode WAV from audio buffer
function encodeWav(audioBuffer) {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const format = 16; // 16-bit PCM
  const numSamples = audioBuffer.length * numberOfChannels;

  // WAV Header
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true); // File size
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size
  view.setUint16(20, 1, true); // Audio format (PCM)
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numberOfChannels * (format / 8), true); // Byte rate
  view.setUint16(32, numberOfChannels * (format / 8), true); // Block align
  view.setUint16(34, format, true); // Bits per sample
  writeString(view, 36, 'data');
  view.setUint32(40, numSamples * 2, true); // Data chunk size

  // WAV Data
  const samples = audioBuffer.getChannelData(0); // Mono audio
  const wavData = new Int16Array(numSamples);
  for (let i = 0; i < samples.length; i++) {
    wavData[i] = Math.max(-1, Math.min(1, samples[i])) * 32767; // Convert to 16-bit PCM
  }

  // Combine header and data
  const wavBuffer = new Uint8Array(header.byteLength + wavData.byteLength);
  wavBuffer.set(new Uint8Array(header), 0);
  wavBuffer.set(new Uint8Array(wavData.buffer), header.byteLength);
  return wavBuffer.buffer;
}

// Helper to write strings to DataView
function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}
