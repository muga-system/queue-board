const queueStates = {
  pending: "pending",
  processing: "processing",
  completed: "completed",
  failed: "failed",
};

const jobs = [
  {
    id: 1,
    title: "Enviar comprobante",
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
  {
    id: 4,
    title: "Connfirmaar pago",
    priority: 2,
    status: queueStates.completed,
  },
  {
    id: 5,
    title: "Reintentar envío de email",
    priority: 1,
    status: queueStates.failed,
  },
];

function getPriorityLabel(priority) {
  const priorityLabels = {
    1: "Alta",
    2: "Media",
    3: "Baja",
  };

  return priorityLabels[priority] ?? "Sin definir";
}

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
  jobElement.dataset.priority = String(job.priority);

  jobElement.innerHTML = `
  <h3>${job.title}</h3>
  <p class="job-card__meta">
    <span>Prioridad ${job.priority}</span>
    <span>${getPriorityLabel(job.priority)}</span>
  </p>
`;

  return jobElement;
}

function renderJobs() {
  const columns = document.querySelectorAll("[data-status]");

  columns.forEach((column) => {
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
