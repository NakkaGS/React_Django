"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

#urls.py(Backend)->urls.py(Base)
#it needs to call the urls from the application (base)

from django.contrib import admin
from django.urls import path, include #include add a file from a app

from django.conf import settings #Imports the data from the Django settings.py
from django.conf.urls.static import static #allows us to connect out urls

urlpatterns = [

    path('admin/', admin.site.urls), #Open the admin website
    path('api/products/', include ('base.urls.product_urls')),
    path('api/users/', include ('base.urls.user_urls')),
    path('api/orders/', include ('base.urls.order_urls')),
    
    #path('api/', include('base.urls')), #call the urls from the other app
]

#To show the images from the right folder in django admin
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
