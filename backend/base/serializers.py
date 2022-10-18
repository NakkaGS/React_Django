from rest_framework import serializers
from django.contrib.auth.models import User #takes the User accounts data, used also for permisition

from .models import Product #call the data from the Database (Models = Table)

class ProductSerializer(serializers.ModelSerializer): #take all the model (Table) and converts to js
    class Meta:
        model = Product
        fields = '__all__'