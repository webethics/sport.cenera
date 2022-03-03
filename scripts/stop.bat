
schtasks /End /TN "Run Cenera Web Server"

if %ERRORLEVEL% NEQ 0 exit 0