from django.shortcuts import render
from rest_framework import viewsets, permissions
from . import serializers
from . import models


class PostView(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    queryset = models.Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagView(viewsets.ModelViewSet):
    serializer_class = serializers.TagSerializer
    queryset = models.Tag.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostTagView(viewsets.ModelViewSet):
    serializer_class = serializers.PostTagSerializer
    queryset = models.PostChange.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostChangeView(viewsets.ModelViewSet):
    serializer_class = serializers.PostChangeSerializer
    queryset = models.PostTag.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
