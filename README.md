# generator-an

Generates browserify friendly angular applications. As any other yeoman generator this generator is very much opinionated. 

# usage

```
yo an appName && npm install
```

This will scaffold an angular app:

* [`browserify`](http://browserify.org/) as code organization;
* [`gulp`](http://gulpjs.com/) as a build tool;
* [`bootstrap`](http://getbootstrap.com/) as css framework (only `less` part of it is used);
* [`tape`](https://github.com/substack/tape) as a test harness;
* [`zuul`](https://github.com/defunctzombie/zuul) as test runner

# run

To run a newly created website simply run

```
gulp
```

This will start a dev server on a semi-random port (port is based on gulpfile
path). If you want to run dev server on the same port you can do

```
gulp -p 31337
```

This command will run dev server on port 31337.

# install

With [npm](https://npmjs.org) do:

```
npm install generator-an
```

# license

MIT
