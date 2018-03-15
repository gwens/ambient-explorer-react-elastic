$emails = Get-ChildItem "C:\ambient-list\4_header\"

## Get each email as a PowerShell object, create a PowerShell array, then convert to Json
$psEmailHash = @{}

for ($i=0; $i -lt $emails.length; $i++){
    $id = $id = $emails[$i].Name.Replace("-", "_").Replace("_HEADER.txt", "")
    Write-Host $i
    $emailHash = Create-EmailObject $emails[$i].FullName $emails[$i].Name
    #$psEmailArray += $emailObject
    $psEmailHash.Add($id, $emailHash)
}

#$psEmailArray | ConvertTo-Json | % { [System.Text.RegularExpressions.Regex]::Unescape($_) } | Out-File "C:\ambient-list\amb-1000.json"

# Easier to use this for now and unescape characters later? This version creates valid JSON straight off
$psEmailHash | ConvertTo-Json | Out-File "C:\ambient-list\amb-all.json"


