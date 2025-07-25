---
{
    "title": "ESQUERY",
    "language": "en"
}
---

## Description

Use the `ESQUERY(<field>, <query_dsl>)` function to push down queries that cannot be expressed in SQL to Elasticsearch for filtering. The first parameter, `<field>`, is used to associate indexes, while the second parameter, `<query_dsl>`, is a JSON expression representing the basic Elasticsearch Query DSL. The JSON must be enclosed in curly brackets `{}` and contain exactly one root key (e.g., `match_phrase`, `geo_shape`, `bool`).

## Syntax

```sql
ESQUERY(<field>, <query_dsl>)
```

## Parameters

| Parameter   | Description                                                                                 |
|------------|---------------------------------------------------------------------------------------------|
| `<field>`    | The field to be queried; used to associate indexes.                                         |
| `<query_dsl>` | A JSON expression representing the Elasticsearch Query DSL. It must be enclosed in `{}` and contain exactly one root key (e.g., `match_phrase`, `geo_shape`, `bool`). |

## Return Value

Returns a boolean value indicating whether the document matches the provided Elasticsearch query DSL.

## Examples

```sql
-- match_phrase SQL:
SELECT * FROM es_table 
WHERE ESQUERY(k4, '{
    "match_phrase": {
       "k4": "doris on es"
    }
}');
```

```sql
-- geo_shape SQL:
SELECT * FROM es_table 
WHERE ESQUERY(k4, '{
  "geo_shape": {
     "location": {
        "shape": {
           "type": "envelope",
           "coordinates": [
              [13, 53],
              [14, 52]
           ]
        },
        "relation": "within"
     }
  }
}');
```