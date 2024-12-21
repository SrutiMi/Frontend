// Function to handle language selection
function selectLanguage(element) {
  // Extract the text within the parentheses using a regular expression
  const match = element.textContent.match(/\(([^)]+)\)/);
  const selectedLanguage = match ? match[1] : null;

  console.log("Selected Language:", selectedLanguage);

  // Store the selected language in localStorage
  localStorage.setItem('selectedLanguage', selectedLanguage);
  // Redirect to the ABHA HTML file with the selected language as a query parameter
  location.href = `abha.html?lang=${selectedLanguage}`;
}
