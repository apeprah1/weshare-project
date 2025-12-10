from rest_framework import serializers
from .models import Post, Comment, Media, Advertisement


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ["id", "media_type", "file", "uploaded_at", "post"]
        read_only_fields = ["uploaded_at"]
        

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username", read_only=True)
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    is_liked = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "parent",
            "author",
            "author_name",
            "content",
            "created_at",
            "likes_count",
            "is_liked",
            "replies",
        ]
        read_only_fields = [
            "author",
            "created_at",
            "likes_count",
            "is_liked",
            "replies",
        ]

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

    def get_replies(self, obj):
        # nested replies for this comment
        qs = obj.replies.all().order_by("created_at")
        return CommentSerializer(qs, many=True, context=self.context).data


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.username", read_only=True)
    media = MediaSerializer(many=True, read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "author_name",
            "content",
            "is_ad",
            "created_at",
            "updated_at",
            "media",
            "comments_count",
            "likes_count",
            "is_liked",
        ]
        read_only_fields = [
            "author",
            "created_at",
            "updated_at",
            "comments_count",
            "likes_count",
            "is_liked",
        ]

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False


class AdvertisementSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.username", read_only=True)

    class Meta:
        model = Advertisement
        fields = [
            "id",
            "owner",
            "owner_name",
            "title",
            "description",
            "price",
            "url",
            "media",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["owner", "created_at"]
