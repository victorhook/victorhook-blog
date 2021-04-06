from django.db import models
from django.utils import timezone


class Post(models.Model):
    title = models.CharField(max_length=100)
    body = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)
    public = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.title} - {self.timestamp}'


class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Image(models.Model):
    name = models.CharField(default='blog image', max_length=100)
    image = models.ImageField(upload_to='')

    def __str__(self):
        return self.name


class PostImage(models.Model):
    post = models.ForeignKey('blog.Post', on_delete=models.CASCADE)
    image = models.ForeignKey('blog.Image', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.post)


class PostChange(models.Model):
    post = models.ForeignKey('blog.Post', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'[{self.timestamp}] {self.post}'


class PostTag(models.Model):
    tag = models.ForeignKey('blog.Tag', on_delete=models.CASCADE)
    post = models.ForeignKey('blog.Post', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.tag} - {self.post.id}'