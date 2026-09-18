' Starts BUDE Global Tech Presentations server silently in background on port 9000
Dim WshShell, comSpec
Set WshShell = CreateObject("WScript.Shell")
comSpec = WshShell.ExpandEnvironmentStrings("%ComSpec%")
WshShell.CurrentDirectory = "C:\Github\bude-global-tech-presentations\bude-presentations-next"
WshShell.Run comSpec & " /c node scripts\serve-local.js", 0, False
