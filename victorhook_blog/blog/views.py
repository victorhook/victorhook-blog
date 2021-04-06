from django.shortcuts import render
from django.http import HttpRequest
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse


from rest_framework import viewsets, permissions
from . import serializers
from . import models
from . import forms


class PostView(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    queryset = models.Post.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagView(viewsets.ModelViewSet):
    serializer_class = serializers.TagSerializer
    queryset = models.Tag.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ImageView(viewsets.ModelViewSet):
    serializer_class = serializers.ImageSerializer
    queryset = models.Image.objects.all()
    permission_classes = [permissions.IsAuthenticated]


class PostImageView(viewsets.ModelViewSet):
    serializer_class = serializers.PostImageSerializer
    queryset = models.PostImage.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostTagView(viewsets.ModelViewSet):
    serializer_class = serializers.PostTagSerializer
    queryset = models.PostChange.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostChangeView(viewsets.ModelViewSet):
    serializer_class = serializers.PostChangeSerializer
    queryset = models.PostTag.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


@login_required
def get_all_images(request: HttpRequest):

    models.Image.objects.all()

    if request.method == 'POST':

        for name, image in request.FILES.items():

            if forms.UploadImageForm(request.POST, image):
                # Save the image to disk.
                instance = models.Image(image=image, name=name)
                instance.save()
            else:
                print(f'Invalid image upload {name} {image}!')

    return JsonResponse({'result': 'ok'})


@login_required
def upload_image(request: HttpRequest):

    if request.method == 'POST':

        for name, image in request.FILES.items():

            if forms.UploadImageForm(request.POST, image):
                # Save the image to disk.
                instance = models.Image(image=image, name=name)
                instance.save()
            else:
                print(f'Invalid image upload {name} {image}!')
            

    return JsonResponse({'result': 'ok'})