from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PostViewSet,
    CommentViewSet,
    MediaViewSet,
    AdvertisementViewSet,
)

router = DefaultRouter()
router.register("posts", PostViewSet, basename="post")
router.register("comments", CommentViewSet, basename="comment")
router.register("media", MediaViewSet, basename="media")
router.register("ads", AdvertisementViewSet, basename="ad")

urlpatterns = [
    path("", include(router.urls)),
]

