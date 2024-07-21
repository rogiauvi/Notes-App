class NoteItem extends HTMLElement {
    connectedCallback() {
      this.render();
    }
  
    static get observedAttributes() {
      return ['title', 'body', 'created-at'];
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    formatDate(dateString) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('id-ID', options);
    }
  
    render() {
      const createdAt = this.getAttribute('created-at');
      const formattedDate = this.formatDate(createdAt);
      
      this.innerHTML = `
        <div class="note-card">
          <h2>${this.getAttribute('title')}</h2>
          <small>${formattedDate}</small>
          <p>${this.getAttribute('body')}</p>
        </div>
      `;
    }
  }
  
  customElements.define('note-item', NoteItem);
  