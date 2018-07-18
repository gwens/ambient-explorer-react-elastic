export function buildElasticSearchQuery(searchParams, currentPage, resultsPerPage) {
  const { searchString, searchFilters, dateFilters, sortOrder } = searchParams;
  let matchQuery;

  // Match search term if there is one
  if (searchString.length <= 2) { 
    matchQuery = [{"match_all" : {}}]
  } else {
    const matchVarious = [];
    searchFilters.subject && matchVarious.push({ "match": { "subject": {"query": `${searchString}`, "boost": 2} } });
    searchFilters.sender && matchVarious.push({ "match": { "from": { "query": `${searchString}`, "boost": 1.5 } } });
    searchFilters.content && matchVarious.push({ "match": { "content": `${searchString}` } });
    matchQuery = [
      { "bool": {
        "should": matchVarious
      }}];
  };

  // Pagination
  const from = (currentPage - 1) * resultsPerPage;

  // Sort order
  let sort;
  if (sortOrder == "oldest") { sort = {"id.raw": {"order": "asc"}} };
  if (sortOrder == "newest") { sort = {"id.raw": {"order": "desc"}} };
  // Sort by score, but if two emails have the same score, show the oldest first
  if (sortOrder == "relevance") { sort = [ 
    {"_score": {"order": "desc"}},
    {"id.raw": {"order": "asc"}} 
  ]};

  // Combined query with date filters, sorting and pagination
  const query = {
    "from": from,
    "size": resultsPerPage,
    "sort": sort,
    "query": {
      "bool": {
        "filter": {
            "range": {
              "id": {
                "gte": `amb_${dateFilters.yearFrom}_${dateFilters.monthFrom}`,
                "lte": `amb_${dateFilters.yearTo}_${dateFilters.monthTo}`,
                "format": "'amb_'yyyy'_'mm"
                }
            } 
        },
        "must": matchQuery
      }
    }
  }

  // Return the complete search query
  return query;
}