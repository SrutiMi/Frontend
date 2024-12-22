const otpInputs = document.querySelectorAll('.otp-input input');
const verifyBtn = document.getElementById('verify-btn');
const homeBtn = document.getElementById('home-btn');
const errorMessage = document.getElementById('error-message');
const correctOTP = "1111";

otpInputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    if (event.target.value.length === 1) {
      if (index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }
    }
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === "Backspace" && event.target.value.length === 0 && index > 0) {
      otpInputs[index - 1].focus();
    }
  });
});

verifyBtn.addEventListener('click', () => {
  let enteredOTP = "";
  otpInputs.forEach(input => {
    enteredOTP += input.value;
  });

  if (enteredOTP === correctOTP) {
    window.location.href = "record.html";
  } else {
    errorMessage.style.display = "block";
    otpInputs.forEach(input => {
      input.value = "";
    });
    otpInputs[0].focus();
  }
});

homeBtn.addEventListener('click', () => {
  window.location.href = "index.html";
});

// Set the language dynamically based on localStorage
const selectedLanguage = localStorage.getItem('selectedLanguage');
if (selectedLanguage) {
  if (selectedLanguage === "Hindi") {
    document.getElementById('otp-title').textContent = "अपना OTP कोड दर्ज करें";
    document.getElementById('otp-description').textContent = "हमने अभी पंजीकृत मोबाइल नंबर पर एक OTP कोड भेजा है।";
    document.getElementById('verify-btn').textContent = " सबमिट करें";
    document.getElementById('home-btn').textContent = "फिर से शुरू करें";
    document.getElementById('error-message').textContent = "गलत OTP। कृपया फिर से प्रयास करें।";
  } else if (selectedLanguage === "Bengali") {
    document.getElementById('otp-title').textContent = "আপনার যাচাইকরণ কোড প্রবেশ করুন";
    document.getElementById('otp-description').textContent = "আমরা নিবন্ধিত মোবাইল নম্বরে একটি যাচাইকরণ কোড পাঠিয়েছি।";
    document.getElementById('verify-btn').textContent = "জমা দিন";
    document.getElementById('home-btn').textContent = "আবার শুরু করুন";
    document.getElementById('error-message').textContent = "ভুল OTP। আবার চেষ্টা করুন।";
  } else if (selectedLanguage === "Odia") {
    document.getElementById('otp-title').textContent = "OTP ஐ உள்ளிடவும்";
    document.getElementById('otp-description').textContent = "பதிவுசெய்யப்பட்ட மொபைல் எண்ணுக்கு இப்போதுதான் OTP அனுப்பினோம்.";
    document.getElementById('verify-btn').textContent = "சமர்ப்பிக்க";
    document.getElementById('home-btn').textContent = "மீண்டும் தொடங்க";
    document.getElementById('error-message').textContent = "தவறான OTP. மீண்டும் முயற்சிக்கவும்.";
  }
  
}
