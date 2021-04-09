import os
import sys

from django.core.wsgi import get_wsgi_application


APP_PATH = '/home/victor/web/victorhook-blog/victorhook_blog'
sys.path.append(APP_PATH)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'victorhook_blog.settings')

application = get_wsgi_application()
