

Function Download-FileFromURL($fileName, $remote, $local) {

$url = $remote + $filename;
# "http://music.hyperreal.org/lists/ambient/archives/amb-1994-07.gz"
$output = $local + $fileName;
# "amb-1994-07.gz"
$start_time = Get-Date

Invoke-WebRequest -Uri $url -OutFile $output
Write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"

}