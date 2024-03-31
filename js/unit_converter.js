const unitConversions = {
  length: {
    Inches: {
      toBase: inches => inches * 0.0254,
      fromBase: meters => meters / 0.0254
    },
    Centimeters: {
      toBase: cm => cm * 0.01,
      fromBase: meters => meters / 0.01
    },
    Millimeters: {
      toBase: mm => mm * 0.001,
      fromBase: meters => meters / 0.001
    },
    Meters: {
      toBase: meters => meters,
      fromBase: meters => meters
    },
    Feet: {
      toBase: feet => feet * 0.3048,
      fromBase: meters => meters / 0.3048
    },
    Miles: {
      toBase: miles => miles * 1609.34,
      fromBase: meters => meters / 1609.34
    },
    Kilometers: {
      toBase: kilometers => kilometers * 1000,
      fromBase: meters => meters / 1000
    },
    Yards: {
      toBase: yards => yards * 0.9144,
      fromBase: meters => meters / 0.9144
    }
    // Add more length units here...
  },
  mass: {
    Pounds: {
      toBase: pounds => pounds * 0.453592,
      fromBase: kilograms => kilograms / 0.453592
    },
    Kilograms: {
      toBase: kilograms => kilograms,
      fromBase: kilograms => kilograms
    },
    Grams: {
      toBase: grams => grams * 0.001,
      fromBase: kilograms => kilograms * 1000
    },
    Milligrams: {
      toBase: milligrams => milligrams * 0.000001,
      fromBase: kilograms => kilograms * 1e6
    },
    Tons: {
      toBase: imperial_tons => imperial_tons * 1016.05,
      fromBase: kilograms => kilograms / 1016.05
    },
    Stones: {
      toBase: stones => stones * 6.35029,
      fromBase: kilograms => kilograms / 6.35029
    },
    Ounces: {
      toBase: ounces => ounces * 0.0283495,
      fromBase: kilograms => kilograms / 0.0283495
    }
    // ... (any additional weight units)
  },
  volume: {
    Milliliters: {
      toBase: milliliters => milliliters / 1000,
      fromBase: liters => liters * 1000
    },
    Liters: {
      toBase: liters => liters,
      fromBase: liters => liters
    },
    Gallons: {
      toBase: ukGallons => ukGallons * 4.54609,
      fromBase: liters => liters / 4.54609
    },
    Pints: {
      toBase: pints => pints * 0.568261,
      fromBase: liters => liters / 0.568261
    },
    Cups: {
      toBase: cups => cups * 0.24,
      fromBase: liters => liters / 0.24
    },
    Teaspoons: {
      toBase: teaspoons => teaspoons * 0.00591939,
      fromBase: liters => liters / 0.00591939
    },
    Tablespoons: {
      toBase: tablespoons => tablespoons * 0.0177582,
      fromBase: liters => liters / 0.0177582
    },
    "Cubic Meters": {
      toBase: cubicMeters => cubicMeters * 1000,
      fromBase: liters => liters / 1000
    },
    "Cubic Centimeters": {
      toBase: cubicCentimeters => cubicCentimeters / 1000,
      fromBase: liters => liters * 1000
    },
    "Cubic Feet": {
      toBase: cubicFeet => cubicFeet *
        28.3168,
      fromBase: liters => liters / 28.3168
    },
    "Cubic Inches": {
      toBase: cubicInches => cubicInches * 0.0163871,
      fromBase: liters => liters / 0.0163871
    },
  }
  // Add more unit types and units here...
};

function populateOptions(unitType) {
  const inputUnit = document.getElementById('inputUnit');
  const outputUnit = document.getElementById('outputUnit');

  inputUnit.innerHTML = '';
  outputUnit.innerHTML = '';

  const units = Object.keys(unitConversions[unitType]);
  units.forEach(unit => {
    inputUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
    outputUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
  });
}

function convertUnits() {
  const unitType = document.getElementById('unitType').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const inputUnit = document.getElementById('inputUnit').value;
  const outputUnit = document.getElementById('outputUnit').value;

  let outputValue = "Invalid conversion";

  const baseValue = unitConversions[unitType][inputUnit].toBase(inputValue);
  const convertedValue = unitConversions[unitType][outputUnit].fromBase(baseValue);
  outputValue = convertedValue.toFixed(3); // Rounded to two decimal places for display

  document.getElementById('outputResult').innerText = `Result: ${outputValue}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // Populate unit options on initial load
  populateOptions(document.getElementById('unitType').value);

  // Update unit options when unit type changes
  document.getElementById('unitType').addEventListener('change', function() {
    populateOptions(this.value);
  });

  // Setup Enter key to trigger conversion
  const inputElements = [document.getElementById('inputValue'), document.getElementById('inputUnit'), document.getElementById('outputUnit'), document.getElementById('unitType')];

  inputElements.forEach(element => {
    element.addEventListener('keydown', function(event) {
      if (event.key === "Enter") {
        convertUnits();
      }
    });
  });
});
