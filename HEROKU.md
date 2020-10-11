## HOW TO CONFIGURE HEROKU

#### Link your project
```
git remote add heroku [HEROKU GIT URL]
```
#### Login into Heroku
```
heroku login
```

#### Configure the client.

Configure the client following the steps in ```client/readme.md```

#### Create database

Go into heroku's dashboard, select your app and into the "Resources" tabs, search for the PostgreSQL addon and add it to your project.

#### Use heroku's database on your project.

Go into heroku's dashboard, select your app and into the "settings" tabs, search for the "Config Vars" section and click on Reveal config vars. Copy the DATABASE_URL and paste it on your ```server/.env ``` DATABASE_URL variable.

#### Setting up all the tables

Once database configured, run ```server/create_tables.py```

#### Setting the environ variables.

Go into heroku's dashboard, select your app and into the "settings" tabs, search for the "Config Vars" section.

You'll create a var for each env var you have in your ```server/.env``` file

EX:
```
DATABASE_URL=... (Already created by heroku)
SECRET_KEY=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

#### Deploying

Run the next command on the root directory:
```
bash deploy_next_release.sh
```

#### New changes, how to deploy?

Merge master into heroku_master, there shouldn't be conflicts.

```
git merge master
```