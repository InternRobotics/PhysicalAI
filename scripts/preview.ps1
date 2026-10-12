$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $siteRoot 'out'
if (-not (Test-Path -LiteralPath (Join-Path $outputDirectory 'index.html'))) {
    throw 'Build the site first. The out directory is missing.'
}
$pythonCommand = Get-Command python -ErrorAction SilentlyContinue
if ($pythonCommand) {
    $pythonExecutable = $pythonCommand.Source
} else {
    $pythonExecutable = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
    if (-not (Test-Path -LiteralPath $pythonExecutable)) { throw 'Python 3 is required for the local preview.' }
}
Write-Host 'Open http://localhost:3001 in your browser. Press Ctrl+C to stop.'
& $pythonExecutable -m http.server 3001 --bind 127.0.0.1 --directory $outputDirectory
