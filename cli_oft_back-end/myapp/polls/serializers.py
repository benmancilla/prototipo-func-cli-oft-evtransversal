from rest_framework import serializers
from .models import Sist_salud, Paciente, Examen

class SistSaludSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sist_salud
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

class ExamenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Examen
        fields = '__all__'
