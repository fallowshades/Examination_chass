

//loader need return session, there is a action setup.
// ;```tsx
// return json(
//   { ...data, error },
//   // you should commit the session to remove the flash key
//   { headers: { 'Set-Cookie': await commitSession(session) } }
// )
// ```