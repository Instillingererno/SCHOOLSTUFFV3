@echo off
Echo Krever at dotnet er installert...
Echo Chrome trengs og for debugging...
Echo Sjekker om dotnet er installert...
dotnet --version >nul 2>&1 && (
    echo dotnet er installert... starter server
    dotnet restore
    start dotnet run
    timeout 5
    start chrome http://localhost:5000
) || (
    echo dotnet er ikke installert... redirekter til nedlastingsside
    start https://www.microsoft.com/net/core#windowsvs2017
    pause
)