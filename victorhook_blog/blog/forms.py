from django import forms
from . import models


class UploadImageForm(forms.Form):
    class Meta:
        model = models.Image
        fields = ['name', 'image']