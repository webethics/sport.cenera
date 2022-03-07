## About
This is the web dashboard for Cenera Sports manegement console.
This project is made with React and bootsrapped with create-react-app.

## Installation and run steps
### Install Node.js and NPM
Download Node.js for your operating system from [https://nodejs.org/en/download/](Here) and then install it.

##### 1. Verify node installation by running:
```bash
node --version
# v10.15.3   <== It should output your node version similar to this
```

##### 2. Verify npm installation by running:
```bash
npm --version
# 6.4.1   <=== It should output your npm version similar to this
```

### Build and run the project
1. Clone the project repository or download a zip archive of the project and extract it to your desired folder.
Open a terminal (cmd or powershell in windows) and cd in the project directory, then run:
```bash
npm install
# It takes quite a while for the first run, be patient.
```

2. Create a text file named ```.env``` and copy contents of ```.env.template``` into your new file.
3. Change values of ```REACT_APP_BASIC_AUTH_USER``` and ```REACT_APP_BASIC_AUTH_PASSWORD``` to appropriate credentials (basic HTTP auth credentials).
4. Run ```npm start``` in your terminal to compile and deploy the project on dev server.
5. [http://localhost:3000](http://localhost:3000) Should pop-up on your default browser and when building is done, you should see the login page, if so, it worked.

### Perform an optimized and ready to deploy build
The steps above was intended for development only. If you want to deploy the project on the web, you need to build the project. To do so, run:
```bash
npm run-scrip build
# It too make take a couple of minutes...
```
After the above command finishes running, you will have ready-to-deploy project on ``build`` folder.

