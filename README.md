# MUBS-Webpage
MUBS Webpage

## venv setup

For some reason, even if we selected python v3.4, the default settings and webapp were using python 2.7. I could see (via the ftp server) that the `web.config` file and the `env` eggs were all for 2.7. Even changing the `runtime.txt` and `requirements.txt` files was insufficient -- I *had* to delete the `env` folder from the server (seriously guys?), at which point the automated process re-built the needed `env` and the app updated to using python 3.4. In the interm, all you could see externally was that there had been a runtime error.
