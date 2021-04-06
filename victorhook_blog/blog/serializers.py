from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ('id', 'title', 'body', 'public', 'timestamp')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = ('id', 'name', 'post')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = ('id', 'name', 'image')


class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostImage
        fields = ('id', 'post', 'image')


class PostChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostChange
        fields = ('id', 'post', 'timestamp')