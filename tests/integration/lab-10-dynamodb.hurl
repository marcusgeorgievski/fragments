# 1. POST new fragment as authorized user

POST http://localhost:8080/v1/fragments
Content-Type: application/json
[BasicAuth]
user1@email.com: password1
```
{ "service": "DynamoDB" }
```

# 2. Confirm server returns 201

HTTP/1.1 201
[Captures]
fragment1_url: header "Location"
fragment1_id: jsonpath "$.fragment.id"
owner_id: jsonpath "$.fragment.ownerId"

# 3. GET fragment metadata, confirm server returns 200

GET {{fragment1_url}}/info
[BasicAuth]
user1@email.com:password1

HTTP/1.1 200
Content-Type: application/json; charset=utf-8
Content-Length: 259
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.fragment.id" == {{fragment1_id}}
jsonpath "$.fragment.ownerId" == {{owner_id}}
jsonpath "$.fragment.created" isString
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.type" == "application/json"
jsonpath "$.fragment.size" == 26

# 4. POST markdown fragment

POST http://localhost:8080/v1/fragments
Content-Type: text/markdown
[BasicAuth]
user1@email.com: password1
```
DynamoDB is **great**.
```

# 5. Confirm server returns 201

HTTP/1.1 201
[Captures]
fragment2_url: header "Location"
fragment2_id: jsonpath "$.fragment.id"

# 6. GET markdown fragment info, confirm server returns 200

GET {{fragment2_url}}/info
[BasicAuth]
user1@email.com: password1

HTTP/1.1 200
Content-Type: application/json; charset=utf-8
Content-Length: 256
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.fragment.id" == {{fragment2_id}}
jsonpath "$.fragment.ownerId" == {{owner_id}}
jsonpath "$.fragment.created" isString
jsonpath "$.fragment.updated" isString
jsonpath "$.fragment.type" == "text/markdown"
jsonpath "$.fragment.size" == 23

# 7. GET all fragments, confirm both id's form above are present

GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com: password1

HTTP/1.1 200
Content-Type: application/json; charset=utf-8
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.fragments" includes {{fragment1_id}}
jsonpath "$.fragments" includes {{fragment2_id}}

# 8. DELETE first fragments

DELETE {{fragment1_url}}
[BasicAuth]
user1@email.com: password1

# 9. Confirm server returns 200

HTTP/1.1 200
[Asserts]
jsonpath "$.status" == "ok"

# 10. Try to get first fragment against captured URL

GET {{fragment1_url}}
[BasicAuth]
user1@email.com: password1

# 11. Confirm server returns 404

HTTP/1.1 404
[Asserts]
jsonpath "$.status" == "error"
jsonpath "$.error.code" == 404
jsonpath "$.error.message" contains "Failed to fetch fragment for ownerId {{owner_id}} and fragment ID {{fragment1_id}}"

# 12. Get all fragments, confirm only second fragment is present

GET http://localhost:8080/v1/fragments
[BasicAuth]
user1@email.com: password1

HTTP/1.1 200
Content-Type: application/json; charset=utf-8
[Asserts]
jsonpath "$.status" == "ok"
jsonpath "$.fragments" not includes {{fragment1_id}}
jsonpath "$.fragments" includes {{fragment2_id}}
