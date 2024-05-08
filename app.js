// const url = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': '45cb2a9f21mshea010b6564b24d5p1618bcjsne71cdedd893e',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	
};

document.addEventListener('DOMContentLoaded', async () => {
  const inputText = document.getElementById('inputText');
  const sourceLang = document.getElementById('sourceLang');
  const targetLang = document.getElementById('targetLang');
  const translateBtn = document.getElementById('translateBtn');
  const outputText = document.getElementById('outputText');

  // Fetch supported languages and populate the dropdowns
  try {
    const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2',options);
    if (!response.ok) {
      throw new Error('Failed to fetch languages.');
    }
    const data = await response.json();
    const languages = data.data.languages;
    languages.forEach(lang => {
      const option = document.createElement('option');
      option.value = lang.language;
      option.text = lang.name;
      sourceLang.appendChild(option.cloneNode(true));
      targetLang.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching languages:', error);
  }

  translateBtn.addEventListener('click', async () => {
    const text = inputText.value.trim();
    const source = sourceLang.value;
    const target = targetLang.value;

    if (text === '') {
      alert('Please enter text to translate.');
      return;
    }
   
    try {
      const response = await fetch(`https://google-translate1.p.rapidapi.com/language/translate/v2=${encodeURIComponent(text)}&source=${source}&target=${target}`, {
        method: 'POST'
      },options);
      if (!response.ok) {
        throw new Error('Failed to translate text.');
      }
      const data = await response.json();
      const translatedText = data.data.translations[0].translatedText;
      outputText.textContent = translatedText;
    } catch (error) {
      console.error('Error translating text:', error);
    }
  });
});
