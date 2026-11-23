/* ==========================================
   TEMPORA - TEMPERATURE CONVERTER
   JavaScript Functionality
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Get HTML elements
    const temperatureInput = document.getElementById("temperatureInput");
    const unitSelect = document.getElementById("unitSelect");

    const convertBtn = document.getElementById("convertBtn");
    const resetBtn = document.getElementById("resetBtn");

    const errorMessage = document.getElementById("errorMessage");
    const resultsSection = document.getElementById("resultsSection");

    const celsiusResult = document.getElementById("celsiusResult");
    const fahrenheitResult = document.getElementById("fahrenheitResult");
    const kelvinResult = document.getElementById("kelvinResult");

    const resultSummary = document.getElementById("resultSummary");
    const currentYear = document.getElementById("currentYear");


    // Absolute zero constants
    const ABSOLUTE_ZERO_C = -273.15;
    const ABSOLUTE_ZERO_F = -459.67;
    const ABSOLUTE_ZERO_K = 0;


    // Update footer year
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // Format result to 2 decimal places
    function formatTemperature(value) {
        return value.toFixed(2);
    }


    // Show error message
    function showError(message) {

        errorMessage.textContent = message;

        resultsSection.style.display = "none";

        temperatureInput.setAttribute("aria-invalid", "true");
    }


    // Clear error message
    function clearError() {

        errorMessage.textContent = "";

        temperatureInput.removeAttribute("aria-invalid");
    }


    // Validate temperature input
    function validateTemperature(value, unit) {

        if (value.trim() === "") {
            return "Please enter a temperature value.";
        }

        const temperature = Number(value);

        if (!Number.isFinite(temperature)) {
            return "Please enter a valid numeric temperature.";
        }

        if (unit === "C" && temperature < ABSOLUTE_ZERO_C) {
            return "Temperature cannot be below absolute zero (-273.15 °C).";
        }

        if (unit === "F" && temperature < ABSOLUTE_ZERO_F) {
            return "Temperature cannot be below absolute zero (-459.67 °F).";
        }

        if (unit === "K" && temperature < ABSOLUTE_ZERO_K) {
            return "Kelvin temperature cannot be below 0 K.";
        }

        return null;
    }


    // Convert input temperature into Celsius
    function convertToCelsius(value, unit) {

        switch (unit) {

            case "C":
                return value;

            case "F":
                return (value - 32) * 5 / 9;

            case "K":
                return value - 273.15;

            default:
                return NaN;
        }
    }


    // Convert Celsius into all temperature units
    function convertFromCelsius(celsius) {

        const fahrenheit = (celsius * 9 / 5) + 32;

        const kelvin = celsius + 273.15;

        return {
            celsius: celsius,
            fahrenheit: fahrenheit,
            kelvin: kelvin
        };
    }


    // Display conversion results
    function displayResults(results, originalValue, originalUnit) {

        celsiusResult.textContent =
            formatTemperature(results.celsius);

        fahrenheitResult.textContent =
            formatTemperature(results.fahrenheit);

        kelvinResult.textContent =
            formatTemperature(results.kelvin);


        const unitNames = {
            C: "°C",
            F: "°F",
            K: "K"
        };

        resultSummary.textContent =
            `${originalValue} ${unitNames[originalUnit]} converted successfully into all three temperature scales.`;


        resultsSection.style.display = "block";

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

    }


    // Main conversion function
    function convertTemperature() {

        clearError();

        const inputValue = temperatureInput.value;
        const selectedUnit = unitSelect.value;

        // Validate input
        const validationError = validateTemperature(
            inputValue,
            selectedUnit
        );

        if (validationError) {
            showError(validationError);
            temperatureInput.focus();
            return;
        }


        const temperature = Number(inputValue);

        // Convert to Celsius first
        const celsius = convertToCelsius(
            temperature,
            selectedUnit
        );

        // Calculate all output values
        const results = convertFromCelsius(celsius);

        // Display all results
        displayResults(
            results,
            temperature,
            selectedUnit
        );

    }


    // Convert button event
    convertBtn.addEventListener("click", convertTemperature);


    // Enter key event
    temperatureInput.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            convertTemperature();
        }

    });


    // Clear error when user edits input
    temperatureInput.addEventListener("input", () => {

        clearError();

    });


    // Clear error when unit changes
    unitSelect.addEventListener("change", () => {

        clearError();

    });


    // Reset all fields and results
    resetBtn.addEventListener("click", () => {

        temperatureInput.value = "";

        unitSelect.value = "C";

        clearError();

        resultsSection.style.display = "none";

        celsiusResult.textContent = "0.00";
        fahrenheitResult.textContent = "32.00";
        kelvinResult.textContent = "273.15";

        resultSummary.textContent =
            "Your converted temperatures will appear here.";

        temperatureInput.focus();

    });


    // Hide results initially
    resultsSection.style.display = "none";

});