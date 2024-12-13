from django.shortcuts import render
from rest_framework import viewsets
from .models import Sist_salud, Paciente, Examen
from .serializers import SistSaludSerializer, PacienteSerializer, ExamenSerializer

def home(request):
    sist_salud_list = Sist_salud.objects.all()
    pacientes_list = Paciente.objects.all()
    examenes_list = Examen.objects.all()
    
    return render(request, 'home.html', {
        'sist_salud_list': sist_salud_list,
        'pacientes_list': pacientes_list,
        'examenes_list': examenes_list,
    })

class SistSaludViewSet(viewsets.ModelViewSet):
    queryset = Sist_salud.objects.all()
    serializer_class = SistSaludSerializer

class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer

class ExamenViewSet(viewsets.ModelViewSet):
    queryset = Examen.objects.all()
    serializer_class = ExamenSerializer
