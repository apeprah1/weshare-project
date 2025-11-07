from django.contrib import admin
from .models import Post, Comment, Media, Advertisement


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "is_ad", "is_deleted", "created_at")
    list_filter = ("is_ad", "is_deleted", "created_at")
    search_fields = ("content", "author__username")


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "author", "created_at")
    list_filter = ("created_at",)
    search_fields = ("content", "author__username", "post__id")


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "media_type", "uploaded_at")
    list_filter = ("media_type", "uploaded_at")


@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "owner", "price", "is_active", "created_at")
    list_filter = ("is_active", "created_at")
    search_fields = ("title", "description", "owner__username")