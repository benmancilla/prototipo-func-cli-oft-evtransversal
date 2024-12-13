from django.contrib import admin
from .models import Sist_salud, Paciente, Examen

class SistSaludAdmin(admin.ModelAdmin):
    list_display = ('tipo',)  

class PacienteAdmin(admin.ModelAdmin):
    list_display = ('primer_nombre', 'apellido_paterno', 'num_rut', 'sist_salud')  
    search_fields = ('num_rut',)  
    list_filter = ('sist_salud',)  

class ExamenAdmin(admin.ModelAdmin):
    list_display = ('titulo_examen', 'paciente', 'fecha_subida', 'archivo_pdf')  
    search_fields = ('paciente__num_rut',)
    list_filter = ('fecha_subida',)


admin.site.register(Sist_salud, SistSaludAdmin)
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(Examen,ExamenAdmin)
