Due to version clashes, to install anything, use 
```
---legacy-peer-deps
```

flag after `npm install` commands to make them work.

For example

```
npm i
```

would give error, but 

```
npm i --legacy-peer-deps
```

would work.

Regarding the assignment, one assumption is that user will login through username and password instead of email and password.
