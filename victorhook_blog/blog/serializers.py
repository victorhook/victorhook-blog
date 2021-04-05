from rest_framework import serializers
from . import models


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Post
        fields = ('id', 'title', 'body', 'timestamp')


class PostChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PostChange
        fields = ('id', 'post', 'timestamp')
