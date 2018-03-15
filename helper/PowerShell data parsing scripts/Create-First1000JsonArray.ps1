# Creates a json file of the first 1000 emails as an array of objects
# This is the format used by v1 and v3 of the ambient explorer app

$emails = Get-ChildItem "C:\ambient-list\4_header\"

## Get each email as a PowerShell object, create a PowerShell array, then convert to Json
$psEmailArray = @()

for ($i=0; $i -lt 1000; $i++){
    $id = $id = $emails[$i].Name.Replace("-", "_").Replace("_HEADER.txt", "")
    $emailObject = Create-EmailObject $emails[$i].FullName $emails[$i].Name
    $emailObject | Add-Member "id" $id
    $psEmailArray += $emailObject
}

#$psEmailArray | ConvertTo-Json | % { [System.Text.RegularExpressions.Regex]::Unescape($_) } | Out-File "C:\ambient-list\amb-1000-array.json"
$psEmailArray | ConvertTo-Json | Out-File "C:\ambient-list\amb-1000-array.json"



