# Caquita
> Small clicker game developed in p5 and basic html/javascript with high-score tracking backend made in Django

CLICK THE POOP

![](CaquitaGif.gif)

Check the live version at:
https://www.caquita.party/

### Dependencies

Python 3
Pip 

### Install

install python3

```
$ sudo apt install python3
```

install pip

```
$ sudo apt-get install python-pip python-dev build-essential 
```

clone repository

```
$ git clone (url)
```

create a local virtual enviroment

```
$ virtualenv env
```

activate env

```
$ source env/bin/activate
```

install requirements

```
$ env/bin/pip install -r requirements.txt 
```

Debug and run backend server
```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```

Other commands see
https://docs.djangoproject.com/en/2.0/

To run the front end just use a basic webserver in the front end folder like so:

```
# python
python -m SimpleHTTPServer 8000

# python 3
python3 -m http.server
```

## Deploy

Use gunicorn and nginx for the backend

## Built With

* [Django](https://www.djangoproject.com/) - Web Framework
* [PostgreSQL](https://www.postgresql.org/) - Database
* [P5](https://p5js.org/) - Processing Javascript Port


## Authors

* **Emmanuel Perez** - *Initial work* - [EmmanuelPerezP](https://github.com/EmmanuelPerezP)
Twitter: [@EmmanuelPdev](https://twitter.com/EmmanuelPdev)

