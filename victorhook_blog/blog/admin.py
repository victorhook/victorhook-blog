from django.contrib import admin


from . import models
admin.site.register(models.Post)
admin.site.register(models.Tag)
admin.site.register(models.Image)
admin.site.register(models.PostImage)
admin.site.register(models.PostChange)