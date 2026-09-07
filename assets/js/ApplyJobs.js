document.addEventListener('DOMContentLoaded', () => {
  const backendUrl = 'https://script.google.com/macros/s/AKfycbxrTF5J4smgfaFYvsyNlFRF3bQ7JUsRwnYWba-JYMAbKFUabyJBRQIjVWdZo1MorQRqnA/exec';
  const form = document.getElementById('jobApplicationForm');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = document.getElementById('spinner');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // UI Feedback: Show Spinner
      if (spinner) spinner.classList.remove('d-none');
      submitBtn.disabled = true;
      const originalText = submitBtn.lastChild.textContent;
      submitBtn.lastChild.textContent = ' Submitting...';

      const data = {
        job: document.getElementById('jobSelect').value,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        mobile: document.getElementById('userMobile').value,
        location: document.getElementById('userLocation').value,
        instituteName: document.getElementById('instituteName').value
      };

      console.log('Submitting application with data:', data);

      try {
        const payload = new URLSearchParams();
        payload.append('Action', 'applyJobs');
        payload.append('Type', 'career');
        payload.append('Data', JSON.stringify(data));

        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: payload.toString(),
        });

        if (!response.ok) throw new Error(`Status ${response.status}`);

        alert('Application submitted successfully!');
        bootstrap.Modal.getInstance(document.getElementById('applyModal')).hide();
        form.reset();

      } catch (error) {
        console.error('Error:', error);
        alert('Submission failed. Please try again.');
      } finally {
        if (spinner) spinner.classList.add('d-none');
        submitBtn.disabled = false;
        submitBtn.lastChild.textContent = originalText;
      }
    });
  }
});