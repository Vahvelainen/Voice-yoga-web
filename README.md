# Voice yoga

A web based yoga application for blind people. The application uses image regocnition to give user advice into getting to the yoga positions. For interaction, the aplication use a combination of text to speech, voice commands and graphical user interface.
Course project for the course CS-E4200 - Emergent User interfaces 2023

## Framework

The framework is javascript based sveltekit. See https://kit.svelte.dev/

Other important technologies are 
- Tensorflow JS pose detection https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
- Web Speech API https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API

## Developing

Once you've created a project and installed dependencies with `npm ci` , start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building and Deploying

The application is hosted on Firebase
To create a production version of your app:

```bash
npm run build
```
You can preview the production build with `npm run preview`.

To deoloy to Firebase
```bash
firebase deploy
```

## Repository
```
├── build/          // static files for hosting, no need to edit
│
├── src/             // app source code
│   ├── lib/         // reusable utility functions
│   ├── routes/      // page and API endpoints
│   └── app.html     // base app template
│
├── .gitignore       // files to ignore in Git
├── package.json     // project dependencies and configuration
├── README.md        // project documentation
├── .svelte.config.js// svelte project configuration
└── .vite.config.js  // build tool configuration
```

### Folder Structure Explanation:

- `src`: This directory contains all the source code for your application. The code is organized into sub-directories based on functionality.

- `lib`: This directory contains reusable utility functions and shared code that can be used across different components and routes.

- `routes`: This directory contains all the Svelte component pages and API endpoints for your application. Each +page.svelte corresponds to a route that can be navigated to from the web app.

- `app.html`: This file is the base HTML template for your application. All the other pages will be injected into this template to form the final HTML output to the browser.

- `.gitignore`: This file specifies which files should be ignored by Git when committing changes to your code repository.

- `package.json`: This file contains dependencies and configuration details for your SvelteKit project.

- `README.md`: This file contains documentation for your project.