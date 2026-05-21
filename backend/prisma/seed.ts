import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.ticket.count();

  if (count > 0) {
    console.log('Seed skipped: tickets already exist.');
    return;
  }

  await prisma.ticket.createMany({
    data: [
      {
        title: 'No funciona el acceso a la VPN',
        description:
          'El usuario no puede establecer conexion con la VPN corporativa desde su portatil.',
        category: 'Red',
        priority: 'Alta',
        status: 'Abierta',
        assignedTo: 'Laura',
      },
      {
        title: 'Error al iniciar sesion en equipo Windows',
        description:
          'El equipo muestra un error de credenciales al arrancar la sesion del usuario.',
        category: 'Software',
        priority: 'Media',
        status: 'En proceso',
        assignedTo: 'Daniel',
      },
      {
        title: 'Contenedor Docker se reinicia constantemente',
        description:
          'El servicio de inventario entra en reinicio continuo tras desplegar la ultima imagen.',
        category: 'Docker',
        priority: 'Crítica',
        status: 'Abierta',
        assignedTo: 'Marcos',
      },
      {
        title: 'Servidor web no responde',
        description:
          'El sitio interno devuelve timeout desde varios puestos de trabajo.',
        category: 'Servidor',
        priority: 'Alta',
        status: 'Resuelta',
        assignedTo: 'Sofia',
      },
      {
        title: 'Problema de permisos en carpeta compartida',
        description:
          'Un tecnico no puede escribir en la carpeta compartida del departamento de pruebas.',
        category: 'Linux',
        priority: 'Baja',
        status: 'Cerrada',
        assignedTo: 'Miguel',
      },
    ],
  });

  console.log('Seed completed with fictional IT tickets.');
}

main()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
