$emails = Get-ChildItem "C:\ambient-list\3_indiv\"

for ($i=0; $i -lt $emails.Length; $i++) {
    Split-HeaderContent $emails[$i].Name
}


# THEN

$headercontent = Get-ChildItem "C:\ambient-list\4_header\"

for ($i=0; $i -lt $headercontent.Length; $i++) {
    if ($headercontent[$i].Name -Match "CONTENT") {
        Move-Item $headercontent[$i].FullName "C:\ambient-list\4_content\"
    }
}