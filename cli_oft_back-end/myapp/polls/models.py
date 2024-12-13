from django.db import models


class Sist_salud(models.Model):
    ISAPRE = "IS"
    FONASA = "FN"
    NON = "NO"
    TIPO_CHOICES = [
        (ISAPRE, "IS"),
        (FONASA, "FN"),
        (NON, "NO"),
    ]
    tipo = models.CharField(max_length=2, choices=TIPO_CHOICES, default=NON)
    
    def __str__(self):
        return self.get_tipo_display()  


class Paciente(models.Model):
    num_rut = models.CharField(max_length=8)
    dv_rut = models.CharField(max_length=1)
    primer_nombre = models.CharField(max_length=150)
    segundo_nombre = models.CharField(max_length=150, blank=True)
    apellido_paterno = models.CharField(max_length=150)
    apellido_materno = models.CharField(max_length=150)
    sist_salud = models.ForeignKey(Sist_salud, on_delete=models.CASCADE, related_name="pacientes")

    def __str__(self):
        return f"{self.num_rut}-{self.dv_rut} {self.primer_nombre} {self.apellido_paterno} {self.apellido_materno}"  


class Examen(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE, related_name='pacientes')
    titulo_examen = models.CharField(max_length=255)
    archivo_pdf = models.FileField(upload_to='documents/pdfs/', null=True, blank=True)
    fecha_subida = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.titulo_examen} {self.fecha_subida}"
