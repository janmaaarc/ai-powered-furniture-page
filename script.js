document.addEventListener('DOMContentLoaded', () => {
    const furnitureForm = document.getElementById('furniture-form');
    const closeResultBtn = document.getElementById('close-result-btn');
    const generateBtn = document.getElementById('generate-btn');

    const ui = {
        mainCard: document.getElementById('main-card'),
        loader: document.getElementById('loader'),
        resultContainer: document.getElementById('result-container'),
        result: document.getElementById('result')
    };

    const showView = (view) => {
        // Hide all main components first
        ui.mainCard.style.display = 'none';
        ui.loader.style.display = 'none';
        ui.resultContainer.style.display = 'none';
        document.body.classList.remove('loading-active');

        if (view === 'form') {
            ui.mainCard.style.display = 'block';
            ui.result.innerHTML = '';
        } else if (view === 'loader') {
            ui.loader.style.display = 'flex'; // Use flex to center content
            ui.mainCard.classList.add('loading-active');
        } else if (view === 'result') {
            ui.resultContainer.style.display = 'block';
        }
    };

    const setButtonLoadingState = (isLoading) => {
        if (isLoading) {
            generateBtn.disabled = true;
            generateBtn.classList.add('loading');
            // Show the button's spinner
            generateBtn.querySelector('.spinner').style.display = 'block';
        } else {
            generateBtn.disabled = false;
            generateBtn.classList.remove('loading');
            // Hide the button's spinner
            generateBtn.querySelector('.spinner').style.display = 'none';
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Check if the form is valid using browser's built-in validation
        if (!furnitureForm.checkValidity()) {
            // If not, trigger the browser's validation messages to show the user what's missing
            furnitureForm.reportValidity();
            return; // Stop the function here
        }

        // --- IMPORTANT: Replace with your n8n Webhook URL ---
        const webhookUrl = 'https://janmaaarc.app.n8n.cloud/webhook/generate-furniture';

        const formData = new FormData(furnitureForm);
        const data = Object.fromEntries(formData.entries());

        setButtonLoadingState(true);
        showView('loader'); // Switch to loader view

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const htmlResponse = await response.text();
            
            if (htmlResponse && !htmlResponse.includes('undefined')) {
                ui.result.innerHTML = htmlResponse;
                showView('result'); // Switch to result view (Full Width)
            } else {
                throw new Error('Received an empty or invalid response from the server.');
            }

        } catch (error) {
            console.error('Error sending data to n8n:', error);
            ui.result.innerHTML = `<p style="text-align:center; color:red; padding: 40px;">An error occurred while generating the page. Please try again later.</p>`;
            showView('result'); // Show error in result view
        } finally {
            setButtonLoadingState(false);
            ui.mainCard.classList.remove('loading-active');
        }
    };

    const resetForm = () => {
        furnitureForm.reset();
        showView('form'); // Go back to small card mode
        ui.mainCard.classList.remove('loading-active');
    };

    furnitureForm.addEventListener('submit', handleFormSubmit);
    if (closeResultBtn) {
        closeResultBtn.addEventListener('click', resetForm);
    }

    // Set the initial view when the page loads
    showView('form');
});