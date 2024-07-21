class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form id="noteForm">
        <h2>Create Note</h2>
        <input type="text" id="title" name="title" placeholder="Title" required pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
          minlength="10"
          autocomplete="off" aria-describedby="ttileValidation">
          <p id="titleValidation" class="validation-message" aria-live="polite"></p>
        <textarea id="body" name="body" placeholder="Description" required
          autocomplete="off" aria-describedby="bodyValidation" minlength="100"></textarea>
          <p id="bodyValidation" class="validation-message" aria-live="polite"></p>
        <button type="submit">Add Note</button>
      </form>
    `;

    this.querySelector('form').addEventListener('submit', this.addNote);
    const titleInput = this.querySelector('#title');
    titleInput.addEventListener('input', validateTitle);
    titleInput.addEventListener('blur', () => validateTitleOnBlur(titleInput));

    const bodyInput = this.querySelector('#body');
    bodyInput.addEventListener('input', validateBody);
    bodyInput.addEventListener('blur', () => validateBodyOnBlur(bodyInput));

  }

  addNote = (event) => {
    event.preventDefault();
    const title = this.querySelector('#title').value;
    const body = this.querySelector('#body').value;

    const noteItem = document.createElement('note-item');
    noteItem.setAttribute('title', title);
    noteItem.setAttribute('body', body);
    noteItem.setAttribute('created-at', new Date().toLocaleString());

    document.getElementById('notesGrid').appendChild(noteItem);

    // Clear the form
    this.querySelector('#title').value = '';
    this.querySelector('#body').value = '';
    document.querySelector('#titleValidation').innerText = '';
  }
}

customElements.define('note-form', NoteForm);

function validateTitle(event) {
  const titleInput = event.target;
  titleInput.setCustomValidity('');

  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Wajib diisi.');
    return;
  }

  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Minimal panjang title adalah sepuluh karakter.');
    return;
  }

  if (titleInput.validity.patternMismatch) {
    titleInput.setCustomValidity(
      'Tidak boleh diawali dengan simbol, mengandung white space atau spasi, dan mengandung karakter spesial seperti dolar ($).',
    );
    return;
  }
}

function validateBody(event) {
  const bodyInput = event.target;
  bodyInput.setCustomValidity('');

  if (bodyInput.validity.valueMissing) {
    bodyInput.setCustomValidity('Wajib diisi.');
    return;
  }
  if (bodyInput.validity.tooShort) {
    bodyInput.setCustomValidity('Minimal panjang Body adalah Seratus karakter.');
    return;
  }
  
}

function validateTitleOnBlur(titleInput) {
  const isValid = titleInput.validity.valid;
  const errorMessage = titleInput.validationMessage;
  const validationAlert = document.querySelector('#titleValidation');

  if (validationAlert) {
    if (!isValid) {
      validationAlert.innerText = errorMessage;
    } else {
      validationAlert.innerText = '';
    }
  }
}

function validateBodyOnBlur(bodyInput) {
  const isValid = bodyInput.validity.valid;
  const errorMessage = bodyInput.validationMessage;
  const validationAlert = document.querySelector('#bodyValidation');

  if (validationAlert) {
    if (!isValid) {
      validationAlert.innerText = errorMessage;
    } else {
      validationAlert.innerText = '';
    }
  }
}
