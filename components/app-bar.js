class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        .app-bar {
          background-color: #007BFF;
          color: white;
          padding: 15px;
          text-align: center;
          font-size: 1.5em;
        }
      </style>
      <div class="app-bar">
        Notes App
      </div>
    `;
  }
}

customElements.define('app-bar', AppBar);
