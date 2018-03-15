// NB If sending mappings by curl, need to escape ' as '\''
{
  "mappings": {
    "email": {
      "properties": {
        "id": {"type": "date",
               "format": "'amb_'yyyy'_'mm'_'SSS", // custom date format for range calculations
               "fields": {
                 "raw": {
                   "type": "keyword" // raw text for quicker sorting
                  }
                }
              },
        "subject": {"type": "text", "analyzer": "english"},
        "from": {"type": "text", "analyzer": "english"},
        "dateString": {"type": "text", "index": "false"},
        "content": {"type": "text", "analyzer": "english"}
      }
    }
  }
}
