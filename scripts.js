function submitFormAndRedirect(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    
    if (name && email && project) {
        // Log data being sent
        console.log('Sending data:', { name, email, project });
        
        // Sending data to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbw6Mc70q-ffiYSi4nOJnIHhHftCUrTTn9Luw7s4aEzmun7VT5PHni7zYMulvPh6bIac/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, project })
        })
        .then(response => {
            // Check if response is ok
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            if (data.result === 'success') {
                alert('Form submitted successfully! Redirecting to Calendly...');
                // Redirect to Calendly
                window.location.href = 'https://calendly.com/matuszak-jonathan';
            } else {
                alert('There was an error submitting the form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        });
    } else {
        alert('Please fill out all fields.');
    }
}

