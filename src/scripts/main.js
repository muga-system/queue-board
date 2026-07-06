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

let nextJobId = Math.max(...jobs.map((job) => job.id)) + 1;

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

function createPendingJob(title, priority) {
  const newJob = {
    id: nextJobId,
    title,
    priority,
    status: queueStates.pending,
  };

  jobs.push(newJob);
  nextJobId += 1;

  return newJob;
}

function getJobActions(job) {
  const actionByStatus = {
    [queueStates.pending]: [
      {
        label: "Procesar",
        nextStatus: queueStates.processing,
      },
    ],
    [queueStates.processing]: [
      {
        label: "Completar",
        nextStatus: queueStates.completed,
      },
      {
        label: "Fallar",
        nextStatus: queueStates.failed,
      },
    ],
    [queueStates.failed]: [
      {
        label: "Reintentar",
        nextStatus: queueStates.pending,
      },
    ],
    [queueStates.completed]: [],
  };

  return actionByStatus[job.status] ?? [];
}

function createJobElement(job) {
  const jobElement = document.createElement("article");
  jobElement.classList.add("job-card");
  jobElement.dataset.priority = String(job.priority);
  jobElement.dataset.jobId = String(job.id);

  const actions = getJobActions(job);

  const actionsMarkup = actions
    .map(
      (action) => `
      <button
        class="job-card__button"
        type="button"
        data-next-status="${action.nextStatus}"
      >
        ${action.label}
      </button>
    `,
    )
    .join("");

 jobElement.innerHTML = `
  <h3>${job.title}</h3>
  <p class="job-card__meta">
    <span>Prioridad ${job.priority}</span>
    <span>${getPriorityLabel(job.priority)}</span>
  </p>

  <div class="job-card__actions">
    ${actionsMarkup}
  </div>
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

function handleJobFormSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const title = formData.get("title").trim();
  const priority = Number(formData.get("priority"));

  if (!title) {
    return;
  }

  createPendingJob(title, priority);
  renderJobs();

  form.reset();
}

const jobForm = document.querySelector("[data-job-form]");

jobForm.addEventListener("submit", handleJobFormSubmit);

renderJobs();

console.log("Trabajos renderizados:", jobs);
