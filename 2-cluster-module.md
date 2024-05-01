# Cluster Module in NodeJS

## Resources:

https://blog.logrocket.com/optimizing-node-js-app-performance-clustering/

https://www.youtube.com/watch?v=SHR-KmfRIsU

Micro Session - Clustering in Nodejs and pm2

https://www.youtube.com/watch?v=9RLeLngtQ3A

https://www.linkedin.com/pulse/ultimate-guide-nodejs-performance-feat-clustering-pm2-sutradhar#:~:text=The%20cluster%20module%20allows%20you,inside%20of%20the%20cluster%20module. - Well explained in detail

https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html


### To start a cluster in PM2, what we'll do is run the following command:

```Bash
pm2 start app.js -l logs.txt -i max        
```

where the flags
- -i = instance, it measures the number of worker processes that will be created in our cluster.
- max = to tell we want to start the maximum amount of workers to take full advantage of all of the CPU cores in our machine.
- app.js = The name of our main JavaScript file as the entry point,
- the flag -l = To specify the name of a file to send our logs to,
- logs.txt = The name of the log file that we want to be created.

### 💡What is Zero Downtime Restart?
With zero downtime reload or restart, instead of terminating all the processes and restarting them all at once, we can use the command:

```Bash
pm2 reload server        
```

Here notice it's ‘reload’ and not ‘restart’ to restart processes one by one, keeping at least one process running at all times. This is the best way to update servers that are already live and serving users, particularly with applications that are time-sensitive.