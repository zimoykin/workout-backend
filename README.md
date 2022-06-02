<p align="center">
  <a href="https://zimoykin.github.io/" target="blank"><img src="https://zimoykin.github.io/assets/ava_2.png" width="320" alt="author Logo" /></a>
</p>



## Project based on

[NEST + GRAPHQL](https://github.com/nestjs/nest)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


# setup database
```
> mysql -uroot;
> SET PASSWORD FOR 'root'@'localhost' = PASSWORD('password');
> exit;
> mysql -uroot -ppassword;
> CREATE DATABASE workout_db;
> GRANT ALL PRIVILEGES ON workout_db.* TO 'root'@'%' IDENTIFIED BY 'password';
> GRANT ALL PRIVILEGES ON workout_db.* TO 'root'@'%'IDENTIFIED WITH mysql_native_password BY 'password';
> exit;
```