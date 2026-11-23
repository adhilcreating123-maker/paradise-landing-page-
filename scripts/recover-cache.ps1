$cacheSource='C:/Users/lenovo/AppData/Local/npm-cache/_cacache'
$cacheDestination=Join-Path (Get-Location) '.npm-cache/_cacache'
$pattern='registry.npmjs.org/(next|react|react-dom|typescript|@types[/\%]|@next[/\%]|@img[/\%]|sharp|postcss|styled-jsx|caniuse-lite|scheduler|csstype|undici-types|client-only|detect-libc|semver|source-map-js|picocolors|nanoid|tslib|@swc[/\%]|baseline-browser-mapping|browserslist|update-browserslist-db|electron-to-chromium|node-releases)'
$copied=0
Get-ChildItem -LiteralPath "$cacheSource/index-v5" -Recurse -File | ForEach-Object {
 $indexFile=$_
 $keep=$false
 foreach($line in [System.IO.File]::ReadAllLines($indexFile.FullName)){
  $parts=$line -split "`t",2
  if($parts.Count -ne 2){continue}
  try {$entry=$parts[1] | ConvertFrom-Json} catch {continue}
  if($entry.key -notmatch $pattern -or -not $entry.integrity){continue}
  $digest=($entry.integrity -split ' ')[0] -split '-',2
  $hex=([BitConverter]::ToString([Convert]::FromBase64String($digest[1]))).Replace('-','').ToLower()
  $relative="content-v2/$($digest[0])/$($hex.Substring(0,2))/$($hex.Substring(2,2))/$($hex.Substring(4))"
  $from=Join-Path $cacheSource $relative
  if(Test-Path -LiteralPath $from){$to=Join-Path $cacheDestination $relative;New-Item -ItemType Directory -Force -Path (Split-Path $to) | Out-Null;Copy-Item -LiteralPath $from -Destination $to;$keep=$true;$copied++}
 }
 if($keep){$rel=$indexFile.FullName.Substring($cacheSource.Length+1);$target=Join-Path $cacheDestination $rel;New-Item -ItemType Directory -Force -Path (Split-Path $target) | Out-Null;Copy-Item -LiteralPath $indexFile.FullName -Destination $target}
}
Write-Output "Copied $copied cache entries into workspace"
