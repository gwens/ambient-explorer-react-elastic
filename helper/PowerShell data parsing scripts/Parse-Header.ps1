# Parse the header and return a PS object

Function Parse-Header($headerFullname, $headername){

$reader = [System.IO.File]::OpenText($headerFullName) 
$from, $subject, $dateString = ""
 
try { 
    $counter = 0 
    for(;;) { 
        $line = $reader.ReadLine() 
        if ($line -eq $null) { break } 
        # Pick out the relevant bits of data from the header
        if ($line -Match "^From: ") {
            $from = $line.Replace("From: ", "");
        }
        elseif ($line -Match "^Subject: ") {
            $subject = $line.Replace("Subject: ", "");
        }
        elseif ($line -Match "^Date: ") {
            $dateString = $line.Replace("Date: ", "");
        }
        $counter++ 
    }
    # And convert them to a hash table
    $headers = @{
        from = $from;
        dateString = $dateString;
        subject = $subject;
        }
} 
finally { 
    $reader.Close() 
} 

$headers = New-Object -TypeName PSObject -Property $headers
Write-Output $headers

}