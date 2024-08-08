```toml
name = 'approve-report'
method = 'PATCH'
url = 'http://localhost:3000/reports/6'
sortWeight = 2000000
id = '3f64b796-5444-4843-9827-0a9a93250c12'

[[headers]]
key = 'Content-Type'
value = 'application/json'

[body]
type = 'JSON'
raw = '''
{
  approved: true
}'''
```
