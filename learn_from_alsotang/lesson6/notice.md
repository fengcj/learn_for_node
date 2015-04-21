# Notices

when you run

```sh
istanbul cover _mocha
```

this will not work in win, so you need use the command below:

```sh
istanbul cover ./node_modules/mocha/bin/_mocha --  -R spec
```


## Reference

https://github.com/gotwarlost/istanbul/issues/13