from django.urls import path
from .views import register, me

urlpatterns = [
    # /api/register/
    path("register/", register, name="register"),

    # /api/me/  (optional helper to check current user)
    path("me/", me, name="me"),
]
