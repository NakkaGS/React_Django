#urls.py(Backend)->product_urls.py(Base)
from django.urls import path

#import all the function defined in the base/views/product_views.py
from base.views import product_views as views

#every time that one path is requested it is requested a function
#it doesn't need to have the complete name because in urls.py it is the full address
urlpatterns = [

    path('', views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    
    path('<str:pk>/reviews/', views.createProductReview, name="product-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>', views.getProduct, name="product"),
    
    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),


]