class YoutubeEmbed extends HTMLElement {

    #shadowRoot;
    #width;
    #height;
    #videoId;
    #title;

    #missingVideoIdException() {
        throw new Error('Missing videoId');
    }

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'open' });

        this.#videoId = this.getAttribute('videoId');
        this.#title = this.getAttribute('title') || 'YouTube video player';

        this.#width = this.getAttribute('width') || '720';
        this.#height = this.getAttribute('height') || '405';

        this.#shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex: 1;
                }
                html {
                    --youtube-embed-border-color: transparent;
                    --youtube-embed-border-width: 0px;
                    --youtube-embed-border-style: none;
                }
                .youtube-embed {
                    border: var(--youtube-embed-border-width) 
                            var(--youtube-embed-border-style) 
                            var(--youtube-embed-border-color);
                    width: ${this.#width}px;
                    height: ${this.#height}px;
                }
            </style>

            <iframe 
                class="youtube-embed"
                src="https://www.youtube.com/embed/${this.#videoId}?rel=0&ytp-pause-overlay=0" 
                title="${this.#title}"" 
                frameborder="0" allow="accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;
    }

}

customElements.define("youtube-embed", YoutubeEmbed);