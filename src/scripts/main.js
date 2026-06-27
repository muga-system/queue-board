const queueStates = {
  pending: "Pendiente",
  processing: "Procesamiento",
  completed: "Completado",
  failed: "Fallido",
};

const jobs = [
  {
    id: 1,
    title: "Enviar Comprovante",
    priority: 2,
    status: queueStates.pending,
  },
  {
    id: 2,
    title: "Procesar inscripción",
    priority: 1,
    status: queueStates.pending,
  },
  {
    id: 3,
    title: "Generar reporte",
    priority: 3,
    status: queueStates.processing,
  },
];

const pendingJobs = jobs
  .filter((job) => job.status === queueStates.pending)
  .sort((firstJob, secondJob) => firstJob.priority - secondJob.priority);

console.log("Estados disponibles", queueStates);
console.log(jobs);
console.log(pendingJobs);
