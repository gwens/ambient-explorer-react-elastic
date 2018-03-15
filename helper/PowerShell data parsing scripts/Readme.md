Rough process for parsing and building the dataset:

* Download all the archives
* Unzip
* Split each file into individual emails by looking for lines that start with 'From ' and contain a long-format date
* Split each individual email into header and content by looking for the first blank line
* Parse the header to build a PS hash of just the useful info (Sender, date, subject line)
* Parse the content to try to remove unnecessary line breaks but retain real ones
* Iterate over the emails and build a giant hash or array of emails, combining header and content, and convert this to JSON (some app versions used the array format and some the hash format)

*A note about dates*: When parsing the dates that the original emails were sent, note that they include TIMEZONE and that the format varies. So to figure out the order from these would require parsing various formats and taking timezone into account. The order of emails in the original archives does seem to reflect the actual order though, so the id (which takes the format amb_year_month_number) is what should be used to sort the emails by date in the app.