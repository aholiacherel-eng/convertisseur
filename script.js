// Les unités disponibles pour chaque type de conversion
const unites = {
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    distance: ['Mètre', 'Kilomètre', 'Mile', 'Pied', 'Pouce'],
    devise: ['EUR', 'USD', 'XOF', 'GBP', 'JPY']
};

// Récupérer les éléments HTML
const typeSelect = document.getElementById('type');
const inputValue = document.getElementById('value');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const resultValue = document.getElementById('result-value');
const btnConvertir = document.getElementById('btn-convertir');
const btnEchanger = document.getElementById('btn-echanger');
const resultDiv = document.getElementById('result');

// Fonction pour remplir les selects avec les unités
function remplirSelects(type) {
    // Vider les selects
    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    // Récupérer les unités du type choisi
    const unitesType = unites[type];
    
    // Remplir les deux selects avec les unités
    unitesType.forEach(function(unite) {
        // Créer une option pour "De"
        const optionFrom = document.createElement('option');
        optionFrom.value = unite;
        optionFrom.textContent = unite;
        fromSelect.appendChild(optionFrom);
        
        // Créer une option pour "Vers"
        const optionTo = document.createElement('option');
        optionTo.value = unite;
        optionTo.textContent = unite;
        toSelect.appendChild(optionTo);
    });
    
    // Sélectionner des unités différentes par défaut
    if (unitesType.length > 1) {
        toSelect.selectedIndex = 1;
    }
}

// Fonction de conversion de température
function convertirTemperature(valeur, de, vers) {
    // Convertir d'abord tout en Celsius
    let celsius;
    
    if (de === 'Celsius') {
        celsius = valeur;
    } else if (de === 'Fahrenheit') {
        celsius = (valeur - 32) * 5/9;
    } else if (de === 'Kelvin') {
        celsius = valeur - 273.15;
    }
    
    // Convertir de Celsius vers l'unité désirée
    if (vers === 'Celsius') {
        return celsius;
    } else if (vers === 'Fahrenheit') {
        return (celsius * 9/5) + 32;
    } else if (vers === 'Kelvin') {
        return celsius + 273.15;
    }
}

// Fonction de conversion de distance
function convertirDistance(valeur, de, vers) {
    // Convertir d'abord tout en mètres
    let metres;
    
    if (de === 'Mètre') {
        metres = valeur;
    } else if (de === 'Kilomètre') {
        metres = valeur * 1000;
    } else if (de === 'Mile') {
        metres = valeur * 1609.34;
    } else if (de === 'Pied') {
        metres = valeur * 0.3048;
    } else if (de === 'Pouce') {
        metres = valeur * 0.0254;
    }
    
    // Convertir de mètres vers l'unité désirée
    if (vers === 'Mètre') {
        return metres;
    } else if (vers === 'Kilomètre') {
        return metres / 1000;
    } else if (vers === 'Mile') {
        return metres / 1609.34;
    } else if (vers === 'Pied') {
        return metres / 0.3048;
    } else if (vers === 'Pouce') {
        return metres / 0.0254;
    }
}

// Fonction de conversion de devise
function convertirDevise(valeur, de, vers) {
    // Taux de change par rapport à l'EUR
    const taux = {
        'EUR': 1,
        'USD': 1.10,
        'XOF': 655.957,
        'GBP': 0.85,
        'JPY': 163.50
    };
    
    // Convertir d'abord tout en EUR
    const euros = valeur / taux[de];
    
    // Convertir de EUR vers la devise désirée
    return euros * taux[vers];
}

// Fonction principale de conversion
function convertir(valeur, de, vers, type) {
    // Si les deux unités sont identiques
    if (de === vers) {
        return valeur;
    }
    
    let resultat = 0;
    
    // Conversion selon le type
    if (type === 'temperature') {
        resultat = convertirTemperature(valeur, de, vers);
    } else if (type === 'distance') {
        resultat = convertirDistance(valeur, de, vers);
    } else if (type === 'devise') {
        resultat = convertirDevise(valeur, de, vers);
    }
    
    return resultat;
}

// Fonction pour effectuer la conversion et afficher le résultat
function effectuerConversion() {
    // Récupérer les valeurs
    const valeur = parseFloat(inputValue.value);
    const de = fromSelect.value;
    const vers = toSelect.value;
    const type = typeSelect.value;
    
    // Vérifier que la valeur est un nombre
    if (isNaN(valeur)) {
        resultDiv.textContent = 'Veuillez entrer une valeur valide';
        resultValue.value = '';
        return;
    }
    
    // Effectuer la conversion
    const resultat = convertir(valeur, de, vers, type);
    
    // Arrondir à 2 décimales
    const resultatArrondi = Math.round(resultat * 100) / 100;
    
    // Afficher le résultat
    resultValue.value = resultatArrondi;
    resultDiv.textContent = `${valeur} ${de} = ${resultatArrondi} ${vers}`;
}

// Fonction pour échanger les unités
function echangerUnites() {
    // Échanger les valeurs des selects
    const tempFrom = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = tempFrom;
    
    // Recalculer si une valeur est présente
    if (inputValue.value !== '') {
        effectuerConversion();
    }
}

// Événements
// Écouter le changement du type de conversion
typeSelect.addEventListener('change', function() {
    const typeChoisi = typeSelect.value;
    remplirSelects(typeChoisi);
    resultValue.value = '';
    resultDiv.textContent = '';
});

// Écouter le clic sur le bouton Convertir
btnConvertir.addEventListener('click', effectuerConversion);

// Écouter le clic sur le bouton d'échange
btnEchanger.addEventListener('click', echangerUnites);

// Conversion en temps réel (optionnel)
inputValue.addEventListener('input', function() {
    if (inputValue.value !== '') {
        effectuerConversion();
    }
});

fromSelect.addEventListener('change', function() {
    if (inputValue.value !== '') {
        effectuerConversion();
    }
});

toSelect.addEventListener('change', function() {
    if (inputValue.value !== '') {
        effectuerConversion();
    }
});

// Remplir les selects au chargement de la page
remplirSelects('temperature');