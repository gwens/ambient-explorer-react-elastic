$archives = Get-ChildItem "C:\ambient-list\2_extracted"

for ($i=0; $i -lt $archives.Length; $i++) {
    Split-File $archives[$i].Name
}