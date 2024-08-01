```toml
name = 'Singin'
method = 'POST'
url = 'http://localhost:3000/auth/signin'
sortWeight = 2000000
id = 'bcd08874-2a83-4be4-b536-820494bbc8e6'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  "email": "test2@test.com",
  "password": "123456"
}'''
```
