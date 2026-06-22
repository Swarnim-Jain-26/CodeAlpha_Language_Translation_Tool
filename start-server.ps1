# Set console output encoding to UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$port = 3000
$started = $false
$listener = $null

while (-not $started -and $port -le 3010) {
    try {
        $listener = New-Object System.Net.HttpListener
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Start()
        $started = $true
    } catch {
        Write-Host "Port $port is in use. Trying next port..." -ForegroundColor Yellow
        $port++
    }
}

if (-not $started) {
    Write-Error "Failed to start server. All ports from 3000 to 3010 are occupied."
    exit 1
}

Write-Host "`n======================================================" -ForegroundColor Cyan
Write-Host " LinguaWave Local HTTP Dev Server" -ForegroundColor Green
Write-Host " Running on: http://localhost:$port/" -ForegroundColor Green
Write-Host " (Required for Web Speech API / Voice Typing permissions)" -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "Press Ctrl+C in this terminal window to stop the server.`n"

# Automatically launch browser to the HTTP url
Start-Process "http://localhost:$port/"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath
        if ($url -eq "/") { $url = "/index.html" }

        # Decode URL encoding (e.g. space characters represented as %20)
        $url = [System.Uri]::UnescapeDataString($url)
        
        $filePath = Join-Path (Get-Location) $url
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Match Content-Type header based on file extension
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            elseif ($filePath.EndsWith(".jpg") -or $filePath.EndsWith(".jpeg")) { $response.ContentType = "image/jpeg" }
            elseif ($filePath.EndsWith(".svg")) { $response.ContentType = "image/svg+xml" }
            elseif ($filePath.EndsWith(".ico")) { $response.ContentType = "image/x-icon" }
            
            # CORS policy
            $response.Headers.Add("Access-Control-Allow-Origin", "*")
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # File Not Found
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $errMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errMsg, 0, $errMsg.Length)
        }
        $response.Close()
    } catch {
        # Catch connection aborts gracefully
    }
}
$listener.Stop()
