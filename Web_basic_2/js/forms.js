/* Gaadi Sarathi lead forms. Front-end demo storage only; connect a backend/CRM to receive leads centrally. */
(() => {
  const STORAGE_KEY = 'gaadiSarathiLeadRequests';
  const readEntries = () => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } };
  const saveEntry = entry => { const entries = readEntries(); entries.push(entry); localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); return entries.length; };
  const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const dateInput = document.getElementById('appointmentDate');
  if (dateInput) dateInput.min = today.toISOString().slice(0,10);

  const fileInput = document.getElementById('dreamImage');
  const previewWrap = document.getElementById('imagePreviewWrap');
  const preview = document.getElementById('dreamImagePreview');
  const filename = document.getElementById('uploadFilename');
  const removeButton = document.getElementById('removeDreamImage');
  let selectedImageName = '';
  if (fileInput) fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { fileInput.value = ''; filename.textContent = 'Please choose an image file.'; return; }
    if (file.size > 8 * 1024 * 1024) { fileInput.value = ''; filename.textContent = 'Image must be smaller than 8 MB.'; return; }
    selectedImageName = file.name; filename.textContent = file.name;
    const reader = new FileReader(); reader.onload = e => { preview.src = e.target.result; previewWrap.hidden = false; }; reader.readAsDataURL(file);
  });
  if (removeButton) removeButton.addEventListener('click', () => { fileInput.value = ''; selectedImageName = ''; preview.src = ''; previewWrap.hidden = true; filename.textContent = 'No image selected'; });

  function serialize(form) {
    const data = {};
    new FormData(form).forEach((value, key) => { if (key !== 'consent' && key !== 'dreamImage') data[key] = String(value).trim(); });
    if (selectedImageName) data.dreamImageFileName = selectedImageName;
    return data;
  }
  function handle(formId, statusId) {
    const form = document.getElementById(formId); if (!form) return;
    const status = document.getElementById(statusId);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const entry = { id: 'GS-' + Date.now(), type: form.dataset.formKind || 'Enquiry', submittedAt: new Date().toISOString(), details: serialize(form) };
      try {
        const count = saveEntry(entry);
        status.className = 'form-status success';
        status.textContent = `Thank you. Your details have been saved in this browser (${count} request${count === 1 ? '' : 's'} stored). This demo is not yet connected to an owner inbox, so your request has not been sent to Gaadi Sarathi.`;
        const exportButton = document.createElement('button'); exportButton.type = 'button'; exportButton.className = 'outline-button'; exportButton.style.marginTop = '12px'; exportButton.textContent = 'DOWNLOAD REQUEST SUMMARY';
        exportButton.addEventListener('click', () => {
          const blob = new Blob([JSON.stringify(entry, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${entry.id.toLowerCase()}-request.json`; a.click(); URL.revokeObjectURL(url);
        });
        status.appendChild(document.createElement('br')); status.appendChild(exportButton);
        form.reset();
        if (dateInput) dateInput.min = today.toISOString().slice(0,10);
        if (previewWrap) previewWrap.hidden = true;
        if (filename) filename.textContent = 'No image selected';
        if (preview) preview.src = ''; selectedImageName = '';
      } catch (error) {
        status.className = 'form-status error'; status.textContent = 'We could not save this request in this browser. Please try again.';
      }
    });
  }
  handle('appointmentForm', 'appointmentStatus');
  handle('enquiryForm', 'enquiryStatus');
})();
