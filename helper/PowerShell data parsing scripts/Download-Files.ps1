# Loop over the months and years to get all the links

$rawLinks = @();

for ($year = 1994; $year -le 2017; $year++){
        for ($month = 1; $month -le 12; $month++){
            $monthStr = $month.ToString();
            if ($month -lt 10) { $monthStr = "0" + $monthStr; }
            $link = "amb-" + $year + "-" + $monthStr + ".gz";
            $rawLinks+= $link;
            }
    }

# We actually want to start in 1994-07 and end at 2017-10.

$actualLinks = $rawLinks[6..285]

for ($i = 0; $i -lt $actualLinks.Length; $i++ ) {
    Write-Host $actualLinks[$i];
    Download-FileFromUrl $actualLinks[$i] "http://music.hyperreal.org/lists/ambient/archives/" "C:\ambient-list\"
    }