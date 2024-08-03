```toml
name = 'Create-user'
method = 'POST'
url = 'http://localhost:3000/auth/signup'
sortWeight = 3000000
id = '7cd15c2c-8c7c-486b-a0a5-fe5445ab7cda'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "email": "test3@test.com",
  "password": "123456"
}'''
```
