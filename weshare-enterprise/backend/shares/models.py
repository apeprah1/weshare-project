from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="posts"
    )
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    is_ad = models.BooleanField(default=False)

    # who liked this post
    likes = models.ManyToManyField(
        User, related_name="liked_posts", blank=True
    )

    def __str__(self):
        return f"Post #{self.id} by {self.author.username}"


class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comments"
    )
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # threaded replies
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="replies",
    )

    # likes on comments
    likes = models.ManyToManyField(
        User, related_name="liked_comments", blank=True
    )

    def __str__(self):
        return f"Comment #{self.id} on Post #{self.post_id}"


class Media(models.Model):
    POST_MEDIA_TYPES = (
        ("image", "Image"),
        ("video", "Video"),
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="media",
    )
    file = models.FileField(upload_to="posts/")  # needs MEDIA_ROOT/MEDIA_URL
    media_type = models.CharField(max_length=10, choices=POST_MEDIA_TYPES)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.media_type} for Post #{self.post_id}"


class Advertisement(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="ads"
    )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    url = models.URLField(blank=True)  # link to product/service
    media = models.ForeignKey(
        Media,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="ads",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
