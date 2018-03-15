# Creates a json file of the first 1000 emails as a giant object, with each email stored under its ID as key
# Format used by v2 of the ambient explorer app

$emails = Get-ChildItem "C:\ambient-list\4_header\"

## Get each email as a PowerShell object, create a giant PowerShell hash with all the emails in then convert to Json
$psEmailHash = @{}

for ($i=0; $i -lt 1000; $i++){
    $id = $id = $emails[$i].Name.Replace("-", "_").Replace("_HEADER.txt", "")
    $emailHash = Create-EmailObject $emails[$i].FullName $emails[$i].Name
    $psEmailHash.Add($id, $emailHash)
}

# Easier to use this for now and unescape characters later? This version creates valid JSON straight off
$psEmailHash | ConvertTo-Json | Out-File "C:\ambient-list\amb-1000-object.json"


