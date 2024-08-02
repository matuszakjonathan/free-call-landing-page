function submitFormAndRedirect(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const project = document.getElementById('project').value;
    
    if (name && email && project) {
        // Log data being sent
        console.log('Sending data:', { name, email, project });
        
        // Sending data to Google Sheets
        fetch('https://script.google.com/macros/s/AKfycbxzGR1r-8lKxMb1E_QQKU0hD7b8PO-xQnpS7zC2Yl8861-ZPIz0rwzkpk_kTjquKGWP/exec', {
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

