from django.contrib import admin


from . import models
admin.site.register(models.Post)
admin.site.register(models.Tag)
admin.site.register(models.PostTag)
admin.site.register(models.PostChange)