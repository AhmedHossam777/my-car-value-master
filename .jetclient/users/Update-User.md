```toml
name = 'Update-User'
method = 'PATCH'
url = 'http://localhost:3000/auth/20'
sortWeight = 7000000
id = '0b757329-25f3-4b63-917a-3381fd1e803e'

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
