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

function changeJobStatus(jobId, nextStatus) {
  const job = jobs.find((currentJob) => currentJob.id === jobId);

  if (!job) {
    return;
  }

  const allowedActions = getJobActions(job);
  const canMoveToNextStatus = allowedActions.some(
    (action) => action.nextStatus === nextStatus,
  );

  if (!canMoveToNextStatus) {
    return;
  }

  job.status = nextStatus;
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

function getEmptyStateMessage(status) {
  const messagesByStatus = {
    [queueStates.pending]: "No hay trabajos pendientes.",
    [queueStates.processing]: "No hay trabajos en proceso.",
    [queueStates.completed]: "No hay trabajos completados.",
    [queueStates.failed]: "No hay trabajos fallidos.",
  };

  return messagesByStatus[status] ?? "No hay trabajos.";
}

function createEmptyStateElement(status) {
  const emptyStateElement = document.createElement("p");

  emptyStateElement.classList.add("empty-state");
  emptyStateElement.textContent = getEmptyStateMessage(status);

  return emptyStateElement;
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
    const columnCount = column.querySelector("[data-column-count]");

    columnCount.textContent =
      jobsByStatus.length === 1
        ? "1 trabajo"
        : `${jobsByStatus.length} trabajos`;

    jobsList.innerHTML = "";

    if (jobsByStatus.length === 0) {
      const emptyStateElement = createEmptyStateElement(status);
      jobsList.appendChild(emptyStateElement);
      return;
    }

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

function handleBoardClick(event) {
  const actionButton = event.target.closest("[data-next-status]");

  if (!actionButton) {
    return;
  }

  const jobElement = actionButton.closest("[data-job-id]");

  if (!jobElement) {
    return;
  }

  const jobId = Number(jobElement.dataset.jobId);
  const nextStatus = actionButton.dataset.nextStatus;

  changeJobStatus(jobId, nextStatus);
  renderJobs();
}

const jobForm = document.querySelector("[data-job-form]");
const board = document.querySelector(".board");

jobForm.addEventListener("submit", handleJobFormSubmit);
board.addEventListener("click", handleBoardClick);

renderJobs();

console.log("Trabajos renderizados:", jobs);
