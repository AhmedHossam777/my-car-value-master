```toml
name = 'Delete-User'
method = 'DELETE'
url = 'http://localhost:3000/auth/4 '
sortWeight = 8000000
id = '411aa103-86a6-4fc9-91fe-b9c7bf4fdb0c'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "email": "dada@gmail.com",
  "password": "123"
}'''
```
