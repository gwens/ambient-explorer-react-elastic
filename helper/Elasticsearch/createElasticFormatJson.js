// Create batch files for dumping the email data in Elasticsearch
// Special format of json required by Elasticsearch
// NB: max size of 10MB per request

const fs = require('fs');
const emails = require('./emails_pt1.json');
console.log(emails.length);

const emails_0 = emails.slice(0,10000);
const emails_1 = emails.slice(10000,20000);
const emails_2 = emails.slice(20000,30000);
const emails_3 = emails.slice(30000);

const batchArray = [emails_0, emails_1, emails_2, emails_3];

batchArray.forEach( function (batch, index) {
  var stream = fs.createWriteStream(`emails_${index}.json`, {flags:'a'});
  
  batch.forEach( function (item, i) {
    const emailNo = batch[i].id.slice(12);
    // Add trailing zeros to the numbers on the end of the IDs so emails can be properly sorted by arrival order
    const numString = "00" + emailNo;
    const threeDigitNo = numString.slice(numString.length - 3);
    batch[i].id = batch[i].id.slice(0,12) + threeDigitNo;
    //console.log(emails[index].id);
  })

  batch.forEach( function (item,i) {
      stream.write(`{"index":{"_id":"${i + 10000 * index}"}}` + "\n" + JSON.stringify(batch[i]) + "\n");
  });
  
  stream.end();
});
