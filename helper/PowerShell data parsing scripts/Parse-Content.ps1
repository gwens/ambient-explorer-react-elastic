# Parse the header and return a PS object

Function Parse-Content($contentFullName){

$reader = [System.IO.File]::OpenText($contentFullName) 

$contentHtml = ""

try { 
    $counter = 0 
    $break = $FALSE
    for(;;) { 
        $line = $reader.ReadLine() 
        if ($line -eq $null) { break } 
        if ($line[0] -eq ">") { $break = $TRUE }
        # If it's a new line, add a break first
        if ($break) { $contentHtml = $contentHtml + "<br>" }
        # Then add the new content
        $contentHtml = $contentHtml + $line
        # If the line is 72 chars, don't want to break next time around
        if ($line.Length -ge 72){ $break = $FALSE }
        else { $break = $TRUE }
        }
        $counter++ 
} 
finally { 
    $reader.Close() 
} 

$contentHtml = $contentHtml.Replace('"', '&#34;')
Write-Output $contentHtml

}