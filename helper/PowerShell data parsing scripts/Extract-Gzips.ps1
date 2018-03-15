$gzips = Get-ChildItem "C:\ambient-list\gzips\"

for($i = 0; $i -lt $gzips.Length; $i++) {
    $infile = $gzips[$i].FullName;
    $outfile = "C:\ambient-list\extracted\" + $gzips[$i].Name.Replace(".gz", ".txt");
    Write-Host $outfile;
    DeGZip-File $infile $outfile
}