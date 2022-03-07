cd c:\ceneraweb
xcopy build deploy /s /y /h
schtasks /Run /TN "Run Cenera Web Server"
