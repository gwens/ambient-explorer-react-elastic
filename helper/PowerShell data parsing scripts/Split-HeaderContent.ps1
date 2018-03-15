# From https://gallery.technet.microsoft.com/scriptcenter/Split-large-textfiles-into-e9b8f53e

Function Split-HeaderContent($readerfilename){

$folder = "C:\ambient-list\4_header\" 
$folderOrig = "C:\ambient-list\3_indiv\"
#$readerfilename = "amb-1994-08_3.txt"
 
[IO.Directory]::SetCurrentDirectory($folder) 
$reader = [System.IO.File]::OpenText($folderOrig + $readerfilename) 
 
try { 
    $counter = 0 
    $filecounter = 1 
    $writerfilename = $folder + $readerfilename.Replace(".txt", ("_HEADER.txt"))
    $writer = [System.IO.File]::CreateText($writerfilename) 
    for(;;) { 
        $line = $reader.ReadLine() 
        if ($line -eq $null) { break } 
        # When we hit the first blank line, if the filecounter is still 1, then this is the break between
        # header and content
        if ($line -Match "^$" -AND $filecounter -eq 1)
        {
            $counter = 0 
            $filecounter++ 
            $writer.Close() 
            $writerfilename = $folder + $readerfilename.Replace(".txt", ("_CONTENT.txt"))
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