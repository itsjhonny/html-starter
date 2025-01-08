function calculate() {
  const weight = parseFloat(document.getElementById("weight").value);
  const activity = document.getElementById("activity").value;

  if (isNaN(weight) || weight <= 0) {
    alert(getTranslation("invalid_weight"));
    return;
  }

  const proteinPerKg = getProteinPerKg(activity);

  const totalProtein = proteinPerKg * weight;

  const creatine = 0.05 * weight;

  const wheyProtein = (totalProtein * 0.3).toFixed(2);

  const water = (weight * 0.033).toFixed(2);

  insertResults(totalProtein, creatine, wheyProtein, water);
}

function getProteinPerKg(activity) {
  switch (activity) {
    case "sedentary":
      return 0.8;
    case "light":
      return 1.0;
    case "moderate":
      return 1.2;
    case "active":
      return 1.5;
    case "very_active":
      return 1.8;
    default:
      return 1.0;
  }
}

function insertResults(protein, creatine, wheyProtein, water) {
  document.getElementById("protein").innerText = protein.toFixed(2);
  document.getElementById("creatine").innerText = creatine.toFixed(2);
  document.getElementById("whey").innerText = wheyProtein;
  document.getElementById("water").innerText = water;
  document.getElementById("results").classList.remove("hidden");
}

document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('language-selector');

  // Mapeamento dos valores do seletor para os códigos de idioma na URL
  const langMap = {
      'pt-BR': 'pt_br',
      'en-US': 'en_us',
      'es-ES': 'es_es'
  };

  languageSelector.addEventListener('change', function () {
      const selectedLang = this.value;
      const langCode = langMap[selectedLang] || 'en_us'; // Padrão para 'en_us' se não encontrado

      // Obter a URL atual
      const currentUrl = window.location.href;

      // Expressão regular para detectar o padrão de idioma na URL (ex: /en_us/)
      const langRegex = /\/(pt_br|en_us|es_es)\//;

      let newUrl;

      if (langRegex.test(currentUrl)) {
          // Substituir o código de idioma existente pelo novo
          newUrl = currentUrl.replace(langRegex, `/${langCode}/`);
      } else {
          // Se não houver código de idioma, adicionar antes do caminho
          const url = new URL(currentUrl);
          // Supondo que o idioma seja a primeira parte do caminho
          url.pathname = `/${langCode}${url.pathname.startsWith('/') ? '' : '/'}${url.pathname}`;
          newUrl = url.toString();
      }

      // Redirecionar para a nova URL
      window.location.href = newUrl;
  });
});
