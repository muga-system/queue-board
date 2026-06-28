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

function getSortedJobsByStatus(status) {
  const jobsByStatus = jobs.filter((job) => job.status === status);

  if (status !== queueStates.pending) {
    return jobsByStatus;
  }
  return jobsByStatus.sort(
    (firstJob, secondJob) => firstJob.priority - secondJob.priority,
  );
}

function createJobElement(job) {
  const jobElement = document.createElement("article");
  jobElement.classList.add("job-card");

  jobElement.innerHTML = `<h3>${job.title}</h3>
  <p>Prioriddad ${job.priority}</p>`;
  return jobElement;
}

function renderJobs() {
  const colums = document.querySelectorAll("[data-status]");

  colums.forEach((column) => {
    const status = column.dataset.status;
    const jobsList = column.querySelector("[data-jobs-list]");
    const jobsByStatus = getSortedJobsByStatus(status);

    jobsList.innerHTML = "";

    jobsByStatus.forEach((job) => {
      const jobElement = createJobElement(job);
      jobsList.appendChild(jobElement);
    });
  });
}

renderJobs();

console.log("Trabajos renderizados:", jobs);
