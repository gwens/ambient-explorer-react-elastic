# From https://gallery.technet.microsoft.com/scriptcenter/Split-large-textfiles-into-e9b8f53e

Function Split-File($readerfilename){

$folder = "C:\ambient-list\3_indiv\" 
$folderOrig = "C:\ambient-list\2_extracted\"
#$readerfilename = "amb-1994-07.txt"
 
[IO.Directory]::SetCurrentDirectory($folder) 
$reader = [System.IO.File]::OpenText($folderOrig + $readerfilename) 
 
try { 
    $counter = 0 
    $filecounter = 1 
    $writerfilename = $folder + $readerfilename.Replace(".txt", ("_" + $filecounter + ".txt"))
    $writer = [System.IO.File]::CreateText($writerfilename) 
    for(;;) { 
        $line = $reader.ReadLine() 
        if ($line -eq $null) { break } 
        #Write-Host $line
        # Check if the line starts with From and contains a long-format date, indicating the
        # beginning of a new email
        if ($line -Match "^From " -AND $line -Match "\d\d \d\d:\d\d:\d\d \d\d\d\d") 
        {
        #if($counter -eq $linespersplitfile) 
        #{ 
            $counter = 0 
            $filecounter++ 
            $writer.Close() 
            $writerfilename = $folder + $readerfilename.Replace(".txt", ("_" + $filecounter + ".txt"))
            $writer = [System.IO.File]::CreateText($writerfilename) 
        } 
         
        $writer.WriteLine($line) 
        $counter++ 
    } 
} 
finally { 
    $writer.Close() 
    $reader.Close() 
} 

}