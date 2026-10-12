$ErrorActionPreference = 'Stop'
$siteRoot = Split-Path -Parent $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$nodeExecutable = if ($nodeCommand) { $nodeCommand.Source } else { $null }
if ($nodeExecutable) {
    $nodeVersion = & $nodeExecutable -p 'Number(process.versions.node.split(".")[0])'
    if ([int]$nodeVersion -lt 20) { $nodeExecutable = $null }
}
if (-not $nodeExecutable) {
    $nodeExecutable = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $nodeExecutable)) { throw 'Please install Node.js 20.9 or newer.' }
}
$env:PATH = (Split-Path -Parent $nodeExecutable) + ';' + $env:PATH
$env:NEXT_TELEMETRY_DISABLED = '1'
Push-Location $siteRoot
try {
    & $nodeExecutable node_modules\next\dist\bin\next build
    if ($LASTEXITCODE -ne 0) { throw 'The site build failed.' }
} finally {
    Pop-Location
}
