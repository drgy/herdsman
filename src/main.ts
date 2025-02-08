import {Application} from "pixi.js";

(async () => {
    const app = new Application();
    await app.init({ background: '#27AE60', resizeTo: window });
    document.body.appendChild(app.canvas);
})();