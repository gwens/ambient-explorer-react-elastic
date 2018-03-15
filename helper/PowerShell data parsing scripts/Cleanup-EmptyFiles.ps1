# Get rid of empty emails (no header or no content)

$contents = Get-ChildItem "C:\ambient-list\4_content\"

for ($i=0; $i -lt $contents.length; $i++){
   If ((Get-Content $contents[$i].FullName) -eq $Null) {
        Write-Host "File is blank" + $contents[$i].Name
    }
}
        