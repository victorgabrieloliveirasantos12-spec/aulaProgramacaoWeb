<#
serve.ps1 — Simple static file server using .NET HttpListener
Usage (interactive):
  Right-click -> Run with PowerShell, or
  Open PowerShell in this folder and run:
    .\serve.ps1 -Port 8000

Notes:
- Does not require Python or Node.
- May require running PowerShell as Administrator in some environments due to HttpListener prefix reservations.
- If you get an error starting the listener, try running PowerShell as Administrator or choose a different port (e.g. 8080).
#>
param(
    [int]$Port = 8000,
    [string]$Root = $PSScriptRoot
)

function Get-ContentType($path){
    $map = @{
        '.html' = 'text/html; charset=utf-8'
        '.htm' = 'text/html; charset=utf-8'
        '.css' = 'text/css; charset=utf-8'
        '.js'  = 'application/javascript; charset=utf-8'
        '.json' = 'application/json'
        '.png' = 'image/png'
        '.jpg' = 'image/jpeg'
        '.jpeg' = 'image/jpeg'
        '.gif' = 'image/gif'
        '.svg' = 'image/svg+xml'
        '.ico' = 'image/x-icon'
        '.txt' = 'text/plain; charset=utf-8'
    }
    $ext = [IO.Path]::GetExtension($path).ToLower()
    return $map[$ext] -or 'application/octet-stream'
}

$prefix = "http://localhost:$Port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try{
    $listener.Start()
}catch{
    Write-Error "Failed to start HttpListener on $prefix — try running PowerShell as Administrator or choose another port. Error: $_"
    exit 1
}

Write-Output "Serving files from: $Root"
Write-Output "Listening: $prefix"
Write-Output "Press Ctrl+C to stop"

while ($listener.IsListening) {
    try{
        $ctx = $listener.GetContext()
    }catch{
        break
    }
    Start-Job -ArgumentList $ctx, $Root -ScriptBlock {
        param($ctx, $Root)
        try{
            $req = $ctx.Request
            $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
            if ($urlPath -eq '/' -or $urlPath -eq '') { $rel = 'index.html' } else { $rel = $urlPath.TrimStart('/') }
            $full = Join-Path $Root $rel
            if (Test-Path $full -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($full)
                $ctype = Get-ContentType $full
                $ctx.Response.StatusCode = 200
                $ctx.Response.ContentType = $ctype
                $ctx.Response.ContentLength64 = $bytes.Length
                $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                $ctx.Response.Close()
                Write-Output ("{0} {1} -> 200 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
            } elseif (Test-Path (Join-Path $Root $rel) -PathType Container) {
                # if folder requested, look for index.html inside
                $index = Join-Path (Join-Path $Root $rel) 'index.html'
                if (Test-Path $index) {
                    $bytes = [System.IO.File]::ReadAllBytes($index)
                    $ctx.Response.StatusCode = 200
                    $ctx.Response.ContentType = 'text/html; charset=utf-8'
                    $ctx.Response.ContentLength64 = $bytes.Length
                    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                    $ctx.Response.Close()
                    Write-Output ("{0} {1} -> 200 {2}/index.html" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                } else {
                    $ctx.Response.StatusCode = 404
                    $buf = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found')
                    $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
                    $ctx.Response.Close()
                    Write-Output ("{0} {1} -> 404 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                }
            } else {
                $ctx.Response.StatusCode = 404
                $buf = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found')
                $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
                $ctx.Response.Close()
                Write-Output ("{0} {1} -> 404 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
            }
        }catch{
            try{ $ctx.Response.StatusCode = 500; $ctx.Response.Close() }catch{}
            <#
            serve.ps1 — Simple static file server using .NET HttpListener
            Usage (interactive):
              Right-click -> Run with PowerShell, or
              Open PowerShell in this folder and run:
                .\serve.ps1 -Port 8000

            Notes:
            - Does not require Python or Node.
            - May require running PowerShell as Administrator in some environments due to HttpListener prefix reservations.
            - If you get an error starting the listener, try running PowerShell as Administrator or choose a different port (e.g. 8080).
            #>
            param(
                [int]$Port = 8000,
                [string]$Root = $PSScriptRoot
            )

            function Get-ContentType($path){
                $map = @{
                    '.html' = 'text/html; charset=utf-8'
                    '.htm' = 'text/html; charset=utf-8'
                    '.css' = 'text/css; charset=utf-8'
                    '.js'  = 'application/javascript; charset=utf-8'
                    '.json' = 'application/json'
                    '.png' = 'image/png'
                    '.jpg' = 'image/jpeg'
                    '.jpeg' = 'image/jpeg'
                    '.gif' = 'image/gif'
                    '.svg' = 'image/svg+xml'
                    '.ico' = 'image/x-icon'
                    '.txt' = 'text/plain; charset=utf-8'
                }
                $ext = [IO.Path]::GetExtension($path).ToLower()
                return $map[$ext] -or 'application/octet-stream'
            }

            $prefix = "http://localhost:$Port/"
            $listener = New-Object System.Net.HttpListener
            $listener.Prefixes.Add($prefix)

            try{
                $listener.Start()
            }catch{
                Write-Error "Failed to start HttpListener on $prefix — try running PowerShell as Administrator or choose another port. Error: $_"
                exit 1
            }

            Write-Output "Serving files from: $Root"
            Write-Output "Listening: $prefix"
            Write-Output "Press Ctrl+C to stop"

            while ($listener.IsListening) {
                try{
                    $ctx = $listener.GetContext()
                }catch{
                    break
                }
                Start-Job -ArgumentList $ctx, $Root -ScriptBlock {
                    param($ctx, $Root)
                    try{
                        $req = $ctx.Request
                        $urlPath = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
                        if ($urlPath -eq '/' -or $urlPath -eq '') { $rel = 'index.html' } else { $rel = $urlPath.TrimStart('/') }
                        $full = Join-Path $Root $rel
                        if (Test-Path $full -PathType Leaf) {
                            $bytes = [System.IO.File]::ReadAllBytes($full)
                            $ctype = Get-ContentType $full
                            $ctx.Response.StatusCode = 200
                            $ctx.Response.ContentType = $ctype
                            $ctx.Response.ContentLength64 = $bytes.Length
                            $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                            $ctx.Response.Close()
                            Write-Output ("{0} {1} -> 200 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                        } elseif (Test-Path (Join-Path $Root $rel) -PathType Container) {
                            # if folder requested, look for index.html inside
                            $index = Join-Path (Join-Path $Root $rel) 'index.html'
                            if (Test-Path $index) {
                                $bytes = [System.IO.File]::ReadAllBytes($index)
                                $ctx.Response.StatusCode = 200
                                $ctx.Response.ContentType = 'text/html; charset=utf-8'
                                $ctx.Response.ContentLength64 = $bytes.Length
                                $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
                                $ctx.Response.Close()
                                Write-Output ("{0} {1} -> 200 {2}/index.html" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                            } else {
                                $ctx.Response.StatusCode = 404
                                $buf = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found')
                                $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
                                $ctx.Response.Close()
                                Write-Output ("{0} {1} -> 404 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                            }
                        } else {
                            $ctx.Response.StatusCode = 404
                            $buf = [System.Text.Encoding]::UTF8.GetBytes('404 - Not Found')
                            $ctx.Response.OutputStream.Write($buf,0,$buf.Length)
                            $ctx.Response.Close()
                            Write-Output ("{0} {1} -> 404 {2}" -f (Get-Date -Format u), $req.HttpMethod, $rel)
                        }
                    }catch{
                        try{ $ctx.Response.StatusCode = 500; $ctx.Response.Close() }catch{}
                        Write-Error "Error serving request: $_"
                    }
                } | Out-Null
            }

            $listener.Stop()
            $listener.Close()
