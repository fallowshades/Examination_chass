

//loader need return session, there is a action setup.
;```tsx
return json(
  { headers: { 'Set-Cookie': await commitSession(session) } }
)
```