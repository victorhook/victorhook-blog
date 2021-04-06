from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include

from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/', include('blog.urls')),
    path('api/upload_image/', include('blog.urls')),
    path('', include('frontend.urls')),
    path('archive/', include('frontend.urls')),
    path('about/', include('frontend.urls')),
    path('images/', include('frontend.urls')),
    path('post/<int:id>/', include('frontend.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
