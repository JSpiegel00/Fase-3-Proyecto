const MOCK_PETS = [
  {
    id: "pet-1",
    nombre: "Chloe",
    raza: "Border Collie Mestizo",
    edad: "1 año",
    personalidad: "Inteligente, leal, muy activa y cariñosa",
    cuidados: "Paseos diarios largos, cepillado dos veces por semana",
    vacunas: "Vacuna antirrábica: completa\nVacuna polivalente: refuerzo anual",
    destacada: true,
    imagen: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pet-2",
    nombre: "Mozart",
    raza: "Gato Calicó",
    edad: "8 meses",
    personalidad: "Tranquilo, observador, disfruta dormir al sol",
    cuidados: "Arenero limpio diario, alimento balanceado para gatos",
    vacunas: "Triple felina: primera y segunda dosis\nAntirrábica: aplicada",
    destacada: true,
    imagen: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pet-3",
    nombre: "Peter",
    raza: "Mestizo Dorado",
    edad: "1 año y 3 meses",
    personalidad: "Alegre, sociable con niños y otros perros",
    cuidados: "Alimentación dos veces al día, juegos al aire libre",
    vacunas: "Vacuna antirrábica: al día\nDesparasitación interna y externa",
    destacada: true,
    imagen: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pet-4",
    nombre: "Pele",
    raza: "Perro salchicha",
    edad: "2 meses",
    personalidad: "Amistoso, juguetón, travieso",
    cuidados: "Baños semanales, alimentarlo tres veces al día",
    vacunas: "Vacuna antirrábica: primera dosis\nVacuna polivalente: primera dosis y refuerzo",
    destacada: false,
    imagen: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pet-5",
    nombre: "Princesita",
    raza: "Chihuahua",
    edad: "6 meses",
    personalidad: "Dulce, protectora, le encanta estar acompañada",
    cuidados: "Cuidar del frío, alimento de croqueta pequeña",
    vacunas: "Polivalente completa",
    destacada: false,
    imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: "pet-6",
    nombre: "Bolita",
    raza: "Poodle",
    edad: "4 meses",
    personalidad: "Juguetón, tierno y muy dócil",
    cuidados: "Corte de pelo mensual y paseos cortos",
    vacunas: "Primera dosis polivalente",
    destacada: false,
    imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=500&q=80"
  }
];

const MOCK_REQUESTS = [
  { id: "req-1", shortName: "ELIZABETH G.", fullName: "Elizabeth Gómez", petName: "BOLITA", residence: "ARRAIJAN", housing: "CASA", freeTime: "15 Horas", reason: "Tengo patio cercado y tiempo para pasearlo." },
  { id: "req-2", shortName: "EROBERT P.", fullName: "Erobert Pérez", petName: "PONKI", residence: "LOS PUEBLOS", housing: "CASA", freeTime: "10 Horas", reason: "Busco una mascota para mi familia." },
  { id: "req-3", shortName: "MORAS L.", fullName: "Moras Lopez", petName: "REX", residence: "PUNTA PACIFICA", housing: "APARTAMENTO", freeTime: "12 Horas", reason: "Me gustaría quien me acompañe en mis momentos de soledad, y a quien darle amor todos los días" },
  { id: "req-4", shortName: "CARLOS P.", fullName: "Carlos Pinto", petName: "HORUS", residence: "SAN MIGUELITO", housing: "CASA", freeTime: "18 Horas", reason: "Me encantan los perros y tengo experiencia cuidándolos." },
  { id: "req-5", shortName: "ANAL LEE.", fullName: "Anal Lee", petName: "LOLO", residence: "CONDADO DEL REY", housing: "APARTAMENTO", freeTime: "14 Horas", reason: "Trabajo desde casa y puedo atenderlo todo el día." }
];

const MOCK_USERS = [
  { nombre: "Administrador Principal", correo: "admin@utp.ac.pa", rol: "administrador" },
  { nombre: "Colaborador Centro", correo: "colaborador@utp.ac.pa", rol: "colaborador" },
  { nombre: "Ariel Esturain", correo: "cliente@utp.ac.pa", rol: "cliente" }
];
