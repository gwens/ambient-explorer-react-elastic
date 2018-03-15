# Fetch the header data from the Parse-Header function
# Fetch the email contents from the separate file and wrap them in html
# Build a JSON object for that email

Function Create-EmailObject($headerFullName){
    $email = "amb-1994-07_4"
    $headers = Parse-Header $headerFullName
    $content = Parse-Content $headerFullName.Replace("header", "content").Replace("HEADER", "CONTENT") #Does this replace both instances?

    # Still really need to learn how to pipe properly...
    $headers | Add-Member "content" $content
    #$emailJson = $headers | ConvertTo-Json | % { [System.Text.RegularExpressions.Regex]::Unescape($_) }

    Write-Output $headers
}