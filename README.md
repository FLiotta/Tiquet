# TIQUET 

Tiquet is an open source project management tool focused on the kanban methodology.

## Instalation

#### Requirements to run this project.
- **NodeJS** 12.18.3
- **Python** 3.8.1
- **PostgreSQL** 11.9

#### How to initialize the project

Initialize server environment, install client and server dependencies.

```
../project_dir

$ bash initialize_dev.sh
```

#### How to start the application in development

You can execture the start_dev bash on the project folder to initialize both at the same time.


```
../project_dir

$ bash start_dev.sh
```

But if you rather to start them independiently.


```
../project_dir/client

$ npm start
```

```
../project_dir/server

$ source env/scripts/activate
$ python run.py
```
