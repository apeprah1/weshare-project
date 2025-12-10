#!/bin/sh
python manage.py migrate --noinput
gunicorn -b 0.0.0.0:8000 weshare.wsgi:application
