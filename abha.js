// Function to validate ABHA ID (only digits, exactly 14 digits)
function validateABHAId() {
  const abhaId = document.getElementById('abhaId').value;
  const abhaIdPattern = /^\d{14}$/; // Regex for 14 digits

  if (!abhaIdPattern.test(abhaId)) {
    alert('ABHA ID must be exactly 14 digits.');
    return false; // Prevent form submission
  }
  return true; // Allow form submission
}

// Set the language dynamically based on localStorage
const selectedLanguage = localStorage.getItem('selectedLanguage');
if (selectedLanguage) {
  document.querySelectorAll('[data-key]').forEach(function(element) {
    const key = element.getAttribute('data-key');
    // Placeholder for language translation logic
    if (selectedLanguage === "Hindi") {
      if (key === "patient-name") {
        element.textContent = "रोगी का नाम:";
      } else if (key === "abha-id") {
        element.textContent = "ABHA ID:";
      } else if (key === "submit") {
        element.value = "जमा करें";
      }
    } else if (selectedLanguage === "Bengali") {
      // Add Bengali translations here
      if (key === "patient-name") {
        element.textContent = "রোগীর নাম:";
      } else if (key === "abha-id") {
        element.textContent = "ABHA ID:";
      } else if (key === "submit") {
        element.value = "জমা দিন";
      }
    } else if (selectedLanguage === "Odia") {
      // Add Bengali translations here
      if (key === "patient-name") {
        element.textContent = "ରୋଗୀ-ନାମ";
      } else if (key === "abha-id") {
        element.textContent = "ABHA ID:";
      } else if (key === "submit") {
        element.value = "ଦାଖଲ କରନ୍ତୁ";
      }
    } else if (selectedLanguage === "Tamil") {
      // Add Bengali translations here
      if (key === "patient-name") {
        element.textContent = "நோயாளி-பெயர்";
      } else if (key === "abha-id") {
        element.textContent = "ABHA ID:";
      } else if (key === "submit") {
        element.value = "சமர்ப்பிக்கவும்";
      }
    } 
    
  });
}
