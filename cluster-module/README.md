# Cluster Module

1. Run no-cluster.js

```bash
    node no-cluster.js
```

- Verify the load time it takes.

2. Run cluster.js

```bash
    node no-cluster.js
```

- Verify the load time it takes.

3. Use of pm2 package

```bash
    npx pm2 start no-cluster.js -i 0
```

- -i as 0 is provided such that it creates cluster on its own. If any value is given then cluster will be created accordingly.

```bash
npx pm2 stop no-cluster.js
```


https://medium.com/@mjdrehman/implementing-node-js-cluster-for-improved-performance-f800146e58e1

https://www.youtube.com/watch?v=6lHvks6R6cI [TODO]

