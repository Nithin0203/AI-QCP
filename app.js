const STORAGE_KEYS = {
  stationConfigs: "aiqi_station_configs",
  stationSequences: "aiqi_station_sequences",
  inspections: "aiqi_inspections",
  reportConfig: "aiqi_report_config",
  referenceImages: "aiqi_reference_images",
};

const REGION_PLANT_OPTIONS = {
  IAP: ["Tiruvallur", "Hosur"],
  MEA: ["SVAP"],
  NA: ["SHAP", "TNAP", "KEP"],
  EE: ["CAEN", "Mirafori", "Eisanech", "Poissy"],
};

const AREA_OPTIONS = ["Bodyshop", "Paint", "GA"];

const SUBAREA_OPTIONS = {
  Bodyshop: ["Underbody", "Hood", "Framing", "RH Door", "LH door", "Dash"],
  Paint: [
    "ECoat-North",
    "ECoat-South",
    "Sealer-North",
    "Sealer-South",
    "Coating-North",
    "Coating-South",
  ],
  GA: ["Trim", "Chassis", "W&T", "Final"],
};

const STATION_OPTIONS = ["ST-001", "ST-002", "ST-003"];
const ALL_PLANT_OPTIONS = Object.values(REGION_PLANT_OPTIONS).flat();

// ═══════════════════════════════════════════════════════════════════
// PART-SPECIFIC DEFECT METADATA
// ═══════════════════════════════════════════════════════════════════
const DEFECT_METADATA = {
  "Left Door Handle": {
    operationCodes: ["B1FT0001", "B1FT0002", "B1FT0003"],
    operationLabels: ["DOOR HANDLE ASSEMBLY", "SCRATCH INSPECTION", "FUNCTION TEST"],
    errorCodes: ["0B", "NM", "03", "0C"],
    localisations: ["DOOR HANDLE EXTERIOR (Z1D01001)", "DOOR HANDLE INTERIOR (Z1D01002)", "HANDLE GRIP AREA (Z1D01003)"],
    familyNatures: ["SCRATCH / MARK [AE]", "CRACK / FRACTURE [AE]", "FUNCTIONAL ISSUE [FM]", "ASSEMBLY DEFECT [AS]"],
  },
  "Right Door Trim": {
    operationCodes: ["B2FT0001", "B2FT0002", "B2FT0003"],
    operationLabels: ["TRIM PANEL INSPECTION", "PAINT QUALITY CHECK", "FIT & FINISH"],
    errorCodes: ["05", "11", "NC", "10"],
    localisations: ["TRIM PANEL SURFACE (Z2B02001)", "TRIM EDGE (Z2B02002)", "ATTACHMENT POINT (Z2B02003)"],
    familyNatures: ["PAINT DEFECT [PE]", "GAP OUT OF SPEC [FT]", "TRIM MISALIGNMENT [FT]", "SURFACE DAMAGE [AE]"],
  },
  "Front Bumper": {
    operationCodes: ["C1QC0001", "C1QC0002", "C1QC0003"],
    operationLabels: ["BUMPER ASSEMBLY CHECK", "GAP ALIGNMENT", "CLIP & LOCK INSPECTION"],
    errorCodes: ["06", "07", "08", "09"],
    localisations: ["BUMPER FACE (Z3C03001)", "BUMPER CLIP (Z3C03002)", "BUMPER GAP (Z3C03003)", "BRACKET AREA (Z3C03004)"],
    familyNatures: ["GAP OUT OF SPEC [FT]", "MISALIGNMENT [FT]", "CLIP FAILURE [AS]", "CRACK [AE]"],
  },
  "Hood Panel": {
    operationCodes: ["D2OP0001", "D2OP0002", "D2OP0003"],
    operationLabels: ["HOOD PAINT CHECK", "PANEL ALIGNMENT", "FINISH QUALITY"],
    errorCodes: ["0A", "12", "13"],
    localisations: ["HOOD SURFACE (Z4D04001)", "HOOD EDGE (Z4D04002)", "HOOD HINGE AREA (Z4D04003)"],
    familyNatures: ["PAINT DEFECT [PE]", "DUST / PARTICLE [PE]", "FINISH INCONSISTENCY [PE]", "DENT [AE]"],
  },
  "Right Front Fender": {
    operationCodes: ["E3AS0001", "E3AS0002", "E3AS0003"],
    operationLabels: ["FENDER PANEL CHECK", "GAP INSPECTION", "SURFACE DEFECT"],
    errorCodes: ["14", "15", "01", "0B"],
    localisations: ["FENDER SURFACE (Z5E05001)", "FENDER GAP (Z5E05002)", "WHEEL WELL AREA (Z5E05003)", "FENDER EDGE (Z5E05004)"],
    familyNatures: ["DENT [AE]", "GAP OUT OF SPEC [FT]", "PAINT DEFECT [PE]", "PANEL MISALIGNMENT [FT]"],
  },
  "Rear Bumper": {
    operationCodes: ["F4BP0001", "F4BP0002", "F4BP0003"],
    operationLabels: ["BUMPER REAR CHECK", "CLIP ENGAGEMENT", "PAINT INSPECTION"],
    errorCodes: ["02", "03", "04", "05"],
    localisations: ["REAR BUMPER FACE (Z6F06001)", "BUMPER CLIP (Z6F06002)", "BUMPER SEAL (Z6F06003)", "ATTACHMENT (Z6F06004)"],
    familyNatures: ["CLIP FAILURE [AS]", "GAP OUT OF SPEC [FT]", "PAINT DEFECT [PE]", "MISALIGNMENT [FT]"],
  },
  "Rear Spoiler": {
    operationCodes: ["G5SP0001", "G5SP0002", "G5SP0003"],
    operationLabels: ["SPOILER FITMENT", "ALIGNMENT CHECK", "FINISH QUALITY"],
    errorCodes: ["06", "07", "08"],
    localisations: ["SPOILER TIP (Z7G07001)", "SPOILER BASE (Z7G07002)", "ATTACHMENT POINT (Z7G07003)"],
    familyNatures: ["MISALIGNMENT [FT]", "LOOSE ATTACHMENT [AS]", "PAINT DEFECT [PE]", "CRACK [AE]"],
  },
  "Right Tail Lamp": {
    operationCodes: ["H6LL0001", "H6LL0002", "H6LL0003"],
    operationLabels: ["LAMP SEAL CHECK", "FITMENT INSPECTION", "HOUSING CONDITION"],
    errorCodes: ["09", "0A", "0B"],
    localisations: ["LAMP HOUSING (Z8H08001)", "LAMP SEAL (Z8H08002)", "ATTACHMENT POINT (Z8H08003)", "LENS AREA (Z8H08004)"],
    familyNatures: ["SEAL FAILURE [AS]", "HOUSING CRACK [AE]", "MISALIGNMENT [FT]", "OPTICAL DEFECT [FM]"],
  },
};
const LEFT_DOOR_HANDLE_PREVIEW_CANDIDATES = [
  "./left-door-handle.png",
  "left-door-handle.png",
  "./left-door-handle.jpg",
  "left-door-handle.jpg",
  "file:///C:/Users/TA26083/Downloads/Left%20door%20handle.png",
  "file:///C:/Users/TA26083/Downloads/Left%20Door%20Handle.png",
  "file:///C:/Users/TA26083/Downloads/left%20door%20handle.png",
  "file:///C:/Users/TA26083/Downloads/left%20door%20handle.jpg",
  "file:///C:/Users/TA26083/Downloads/left-door-handle.png",
  "file:///C:/Users/TA26083/Downloads/left-door-handle.jpg",
  "file:///C:/Users/TA26083/Downloads/Left-door-handle.png",
  "file:///C:/Users/TA26083/Downloads/Left-door-handle.jpg",
];
const RIGHT_DOOR_TRIM_PREVIEW_CANDIDATES = [
  "./right-door-trim.png",
  "right-door-trim.png",
  "./right-door-trim.jpg",
  "right-door-trim.jpg",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20door%20trim.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20Door%20Trim.png",
  "file:///C:/Users/TA26083/Downloads/right%20door%20trim.png",
  "file:///C:/Users/TA26083/Downloads/right-door-trim.png",
];
const FRONT_BUMPER_PREVIEW_CANDIDATES = [
  "./front-bumper.png",
  "front-bumper.png",
  "./front-bumper.jpg",
  "front-bumper.jpg",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Front%20bumper.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Front%20Bumper.png",
  "file:///C:/Users/TA26083/Downloads/front%20bumper.png",
  "file:///C:/Users/TA26083/Downloads/front-bumper.png",
];
const HOOD_PANEL_PREVIEW_CANDIDATES = [
  "./hood-panel.png",
  "hood-panel.png",
  "./hood-panel.jpg",
  "hood-panel.jpg",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Hood%20Panel.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Hood%20panel.png",
  "file:///C:/Users/TA26083/Downloads/hood%20panel.png",
  "file:///C:/Users/TA26083/Downloads/hood-panel.png",
];
const RIGHT_FRONT_FENDER_PREVIEW_CANDIDATES = [
  "./right-front-fender.png",
  "right-front-fender.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20Front%20Fender.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20front%20fender.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/right%20front%20fender.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/AI-QUALITY-INSPECTION-%20APP/Created/right-front-fender.png",
  "file:///C:/Users/TA26083/Downloads/right-front-fender.png",
];
const REAR_BUMPER_PREVIEW_CANDIDATES = [
  "./rear-bumper.png",
  "rear-bumper.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Rear%20bumper.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Rear%20Bumper.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/rear%20bumper.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/AI-QUALITY-INSPECTION-%20APP/Created/rear-bumper.png",
  "file:///C:/Users/TA26083/Downloads/rear-bumper.png",
];
const REAR_SPOILER_PREVIEW_CANDIDATES = [
  "./rear-spoiler.png",
  "rear-spoiler.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Rear%20spoiler.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Rear%20Spoiler.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/rear%20spoiler.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/AI-QUALITY-INSPECTION-%20APP/Created/rear-spoiler.png",
  "file:///C:/Users/TA26083/Downloads/rear-spoiler.png",
];
const RIGHT_TAIL_LAMP_PREVIEW_CANDIDATES = [
  "./right-tail-lamp.png",
  "right-tail-lamp.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20tail%20lamp.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/Right%20Tail%20Lamp.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/right%20tail%20lamp.png",
  "file:///C:/Users/TA26083/OneDrive%20-%20Stellantis/Documents/AI-QUALITY-INSPECTION-%20APP/Created/right-tail-lamp.png",
  "file:///C:/Users/TA26083/Downloads/right-tail-lamp.png",
];

function buildDownloadsImageCandidates(imageName = "") {
  const trimmed = String(imageName || "").trim();
  if (!trimmed) {
    return [];
  }

  const encoded = encodeURIComponent(trimmed).replace(/%2F/g, "/");
  const stem = trimmed.replace(/\.[^.]+$/, "");
  const extCandidates = [".png", ".jpg", ".jpeg"];

  const byName = [
    trimmed,
    trimmed.toLowerCase(),
    trimmed.replaceAll("-", " "),
    trimmed.replaceAll(" ", "-"),
  ];

  const byStem = extCandidates.flatMap((ext) => [
    `${stem}${ext}`,
    `${stem.toLowerCase()}${ext}`,
    `${stem.replaceAll("-", " ")}${ext}`,
    `${stem.replaceAll(" ", "-")}${ext}`,
  ]);

  const names = [...new Set([...byName, ...byStem].filter(Boolean))];
  const files = names.flatMap((name) => {
    const safe = encodeURIComponent(name).replace(/%2F/g, "/");
    return [
      `file:///C:/Users/TA26083/Downloads/${safe}`,
      `C:/Users/TA26083/Downloads/${name}`,
      `./${name}`,
      name,
    ];
  });

  return [
    ...new Set([`file:///C:/Users/TA26083/Downloads/${encoded}`, ...files]),
  ];
}

const STATION_CONFIG_COLUMNS = [
  { key: "region", header: "Region" },
  { key: "plant", header: "Plant" },
  { key: "area", header: "Area" },
  { key: "subArea", header: "Sub Area", aliases: ["SubArea"] },
  { key: "stationId", header: "Station ID", aliases: ["StationId"] },
  {
    key: "stationName",
    header: "Station Name",
    aliases: ["StationName", "Station Name Display"],
  },
  { key: "recordStatus", header: "Status", aliases: ["Record Status"] },
];

const STATION_SEQUENCE_COLUMNS = [
  { key: "region", header: "Region" },
  { key: "plant", header: "Plant" },
  { key: "area", header: "Area" },
  { key: "subArea", header: "Sub Area", aliases: ["SubArea"] },
  { key: "stationId", header: "Station ID", aliases: ["StationId"] },
  {
    key: "stationName",
    header: "Station Name",
    aliases: ["StationName", "Station Name Display"],
  },
  {
    key: "vehicleModel",
    header: "Vehicle Model",
    aliases: ["VehicleModel"],
  },
  { key: "sequenceId", header: "Sequence ID", aliases: ["SequenceId"] },
  {
    key: "sequenceName",
    header: "Sequence Name",
    aliases: ["SequenceName"],
  },
  {
    key: "sequenceDescription",
    header: "Sequence Description",
    aliases: ["SequenceDescription", "Part Description"],
  },
  { key: "partName", header: "Part Name", aliases: ["PartName"] },
  { key: "imageName", header: "Image Name", aliases: ["ImageName"] },
  {
    key: "recordStatus",
    header: "Status",
    aliases: ["Record Status", "Sequence Status"],
  },
];

const SAMPLE_LOGIN_USERS = [
  { name: "Teja", role: "admin" },
  { name: "Arjun", role: "admin" },
  { name: "Rohan", role: "admin" },
  { name: "Vikram", role: "admin" },
  { name: "Neha", role: "admin" },
  { name: "Anita", role: "admin" },
  { name: "Sanjay", role: "admin" },
  { name: "Pooja", role: "user" },
  { name: "Rahul", role: "user" },
  { name: "Deepa", role: "user" },
  { name: "Meera", role: "user" },
  { name: "Karan", role: "user" },
  { name: "Priya", role: "user" },
];

// Migrate old inspection records: strip embedded imagePreviewUrl (base64)
// to free up localStorage space. Runs once on every page load.
(function migrateInspectionStorage() {
  try {
    const raw = localStorage.getItem("aiqi_inspections");
    if (!raw) return;
    const records = JSON.parse(raw);
    if (!Array.isArray(records)) return;
    const hasBlob = records.some(
      (r) => r.imagePreviewUrl && r.imagePreviewUrl.length > 100,
    );
    if (!hasBlob) return;
    const cleaned = records.map(({ imagePreviewUrl, ...rest }) => rest);
    localStorage.setItem("aiqi_inspections", JSON.stringify(cleaned));
  } catch (_) {
    // ignore migration errors
  }
})();

const state = {
  stationConfigs: loadList(STORAGE_KEYS.stationConfigs),
  stationSequences: loadList(STORAGE_KEYS.stationSequences),
  inspections: loadList(STORAGE_KEYS.inspections),
  reportConfig: loadObject(STORAGE_KEYS.reportConfig),
  referenceImages: loadList(STORAGE_KEYS.referenceImages),
};

// Persists the last-used station context in Station Sequence Config so
// Add Sequence++ can restore it after a save re-renders the module.
let lastSeqStationContext = null;

const modules = [
  {
    id: "station-config",
    title: "1. Station Configuration",
    role: "admin",
    description:
      "Configure station identity, hardware, and AI threshold values.",
    render: renderStationConfig,
  },
  {
    id: "station-seq",
    title: "2. Station Sequence Configuration",
    role: "admin",
    description:
      "Configure the execution sequence and gating of inspection stations.",
    render: renderStationSequence,
  },
  {
    id: "station-inspection",
    title: "1. Station Quality Inspection",
    role: "user",
    description:
      "Configure and log VIN-wise inspection outcomes at each station.",
    render: renderStationInspection,
  },
  {
    id: "ai-report",
    title: "2. Report",
    role: "user",
    description:
      "Review defect trends by vehicle model and scanned barcode.",
    render: renderAiReport,
  },
];

const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const nameInput = document.getElementById("nameInput");
const passwordInput = document.getElementById("passwordInput");
const welcomeText = document.getElementById("welcomeText");
const dateTimeText = document.getElementById("dateTimeText");
const optionGrid = document.getElementById("optionGrid");
const modulePanel = document.getElementById("modulePanel");
const homePanel = document.getElementById("homePanel");
const homeBtn = document.getElementById("homeBtn");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const logoutBtn = document.getElementById("logoutBtn");

// ── Splash screen ────────────────────────────────────────────
(function initSplash() {
  const splash = document.getElementById("splashScreen");
  const appRoot = document.getElementById("appRoot");
  if (!splash || !appRoot) {
    return;
  }

  const MIN_SPLASH_MS = 1800;
  const startedAt = Date.now();

  function dismissSplash() {
    const remaining = Math.max(0, MIN_SPLASH_MS - (Date.now() - startedAt));
    window.setTimeout(() => {
      splash.classList.add("splash-exit");
      appRoot.classList.remove("hidden");
      window.setTimeout(() => splash.remove(), 520);
    }, remaining);
  }

  if (document.readyState === "complete") {
    dismissSplash();
  } else {
    window.addEventListener("load", dismissSplash, { once: true });
    window.setTimeout(dismissSplash, 5000);
  }
})();

// ── Role selector on login page ─────────────────────────────
let _selectedLoginRole = "user";

function isMobileWorkflowMode() {
  return (
    window.matchMedia("(max-width: 640px)").matches ||
    _selectedLoginRole === "mobile" ||
    currentUser?.role === "mobile"
  );
}

(function initRoleSelector() {
  const roleUser = document.getElementById("roleUser");
  const roleAdmin = document.getElementById("roleAdmin");
  if (!roleUser || !roleAdmin) {
    return;
  }

  function selectRole(role) {
    _selectedLoginRole = role;
    roleUser.classList.toggle("active", role === "user");
    roleAdmin.classList.toggle("active", role === "admin");
    document.body.classList.toggle("force-mobile-workflow", role === "mobile");
    if (window.navigator.vibrate) {
      window.navigator.vibrate(12);
    }
  }

  roleUser.addEventListener("click", () => selectRole("user"));
  roleAdmin.addEventListener("click", () => selectRole("admin"));
})();

// ── Password show/hide toggle ────────────────────────────────
(function initPwdToggle() {
  const btn = document.getElementById("pwdToggleBtn");
  const pwd = document.getElementById("passwordInput");
  if (!btn || !pwd) {
    return;
  }

  btn.addEventListener("click", () => {
    const showing = pwd.type === "text";
    pwd.type = showing ? "password" : "text";
    btn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
    btn.style.color = showing
      ? "rgba(255,255,255,0.4)"
      : "rgba(100,140,255,0.85)";
  });
})();

// ── Login error helper ───────────────────────────────────────
function setLoginError(msg) {
  const el = document.getElementById("loginError");
  if (!el) {
    return;
  }
  if (msg) {
    el.textContent = msg;
    el.classList.remove("hidden");
  } else {
    el.classList.add("hidden");
    el.textContent = "";
  }
}

let currentUser = null;
let activeModuleId = null;
let reportRefreshTimer = null;
const reportFilters = {
  fromDate: "",
  toDate: "",
  vehicleModel: "",
};
let dashboardClockTimer = null;
let liveWidgetTimer = null;
let demoSimTimer = null;
const MOBILE_RAPID_BREAKPOINT = "(max-width: 640px)";
const inspectionUiState = {
  currentSequenceIndex: 0,
  currentPhase: "priority", // "priority" or "regular"
  prioritySequences: [],
  regularSequences: [],
  priorityPhaseCompleted: false,
  partAnswers: {}, // key: "phase_index" → {good, bad, comments}
};
const mobileSyncState = {
  status: "idle", // idle | pending | synced | failed
  message: "",
};

function isMobileRapidMode() {
  return Boolean(
    window.matchMedia && window.matchMedia(MOBILE_RAPID_BREAKPOINT).matches,
  );
}

// ─── UX ENHANCEMENT HELPERS ──────────────────────────────────────────────────

let _undoHistory = []; // Store last inspection result for undo

/**
 * Show an undo toast with a specific message
 * Automatically dismisses after 3 seconds unless user taps Undo
 */
function showUndoToast(message, onUndo, customTimeout) {
  const toast = document.getElementById("undoToast");
  const msgEl = document.getElementById("undoToastMessage");
  const undoBtn = document.getElementById("undoToastBtn");

  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.remove("hidden", "undo-toast-exit");

  // Clear any existing timeout
  if (toast._undoTimeout) clearTimeout(toast._undoTimeout);

  // Set up undo handler
  const handleUndo = () => {
    if (onUndo) onUndo();
    dismissUndoToast();
  };

  undoBtn.replaceWith(undoBtn.cloneNode(true));
  document.getElementById("undoToastBtn").addEventListener("click", handleUndo);

  // Auto-dismiss after timeout (default 3 seconds)
  const timeout = customTimeout || 3000;
  toast._undoTimeout = setTimeout(() => dismissUndoToast(), timeout);
}

function dismissUndoToast() {
  const toast = document.getElementById("undoToast");
  if (!toast) return;
  toast.classList.add("undo-toast-exit");
  setTimeout(() => toast.classList.add("hidden"), 280);
  if (toast._undoTimeout) clearTimeout(toast._undoTimeout);
}

/**
 * Show a warning toast for missed inspections
 * Displays: "Warning- Inspection is missed for Part XX. Please complete the Inspection."
 */
function showMissedInspectionWarning(partName) {
  const toast = document.getElementById("warningToast");
  const msgEl = document.getElementById("warningToastMessage");

  if (!toast || !msgEl) return;

  const message = `⚠️ Warning- Inspection is missed for Part ${partName}. Please complete the Inspection.`;
  msgEl.textContent = message;
  toast.classList.remove("hidden", "undo-toast-exit");

  // Clear any existing timeout
  if (toast._warningTimeout) clearTimeout(toast._warningTimeout);

  // Auto-dismiss after 4 seconds for warning message
  toast._warningTimeout = setTimeout(() => dismissWarningToast(), 4000);
}

function dismissWarningToast() {
  const toast = document.getElementById("warningToast");
  if (!toast) return;
  toast.classList.add("undo-toast-exit");
  setTimeout(() => toast.classList.add("hidden"), 280);
  if (toast._warningTimeout) clearTimeout(toast._warningTimeout);
}

/**
 * Update live context bar with current inspection details
 */
function updateLiveContextBar(vin, partName, partIndex, totalParts) {
  const bar = document.getElementById("liveContextBar");
  if (!bar) return;

  const vinEl = document.getElementById("contextVin");
  const partEl = document.getElementById("contextPart");
  const countEl = document.getElementById("contextCount");
  const statusEl = document.getElementById("contextStatus");

  if (vinEl) vinEl.textContent = vin || "—";
  if (partEl) partEl.textContent = partName || "—";
  if (countEl) countEl.textContent = `[${partIndex}/${totalParts}]`;
  if (statusEl) statusEl.textContent = "Ready";

  if (!bar.classList.contains("hidden")) {
    // Already visible
  } else {
    bar.classList.remove("hidden");
  }
}

function hideLiveContextBar() {
  const bar = document.getElementById("liveContextBar");
  if (bar) bar.classList.add("hidden");
}

/**
 * Update progress bar with current progress
 */
function updateProgressBar(completed, total, estimatedSecRemaining) {
  const container = document.getElementById("progressBarContainer");
  const fill = document.getElementById("progressBarFill");
  const label = document.getElementById("progressBarLabel");

  if (!container || !fill || !label) return;

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  fill.style.width = pct + "%";
  fill.setAttribute("aria-valuenow", pct);
  fill.setAttribute("aria-valuemax", 100);

  let timeStr = "0 min";
  if (estimatedSecRemaining) {
    const mins = Math.ceil(estimatedSecRemaining / 60);
    timeStr = mins <= 1 ? "< 1 min" : `${mins} min`;
  }

  label.textContent = `${completed}/${total} Complete · Est. ${timeStr}`;

  if (!container.classList.contains("hidden")) {
    // Already visible
  } else {
    container.classList.remove("hidden");
  }
}

function hideProgressBar() {
  const container = document.getElementById("progressBarContainer");
  if (container) container.classList.add("hidden");
}

/**
 * Animate result confirmation (flash + pulse)
 */
function animateResultConfirmation(isGood) {
  const btn = isGood
    ? document.getElementById("markGoodBtn")
    : document.getElementById("markBadBtn");

  if (!btn) return;

  // Add confirmation class for animation
  btn.classList.add("flash-confirmed", "result-confirmed");

  // Haptic feedback
  if (window.navigator.vibrate) {
    const pattern = isGood ? 20 : [30, 20, 30];
    window.navigator.vibrate(pattern);
  }

  // Remove animation class after it completes
  setTimeout(() => {
    btn.classList.remove("flash-confirmed", "result-confirmed");
  }, 650);
}

// ═══════════════════════════════════════════════════════════════════
// MOBILE INSPECTION WORKFLOW: Parts List → Details → Image Editor
// (Mobile only: max-width 640px)
// ═══════════════════════════════════════════════════════════════════

const inspectionWorkflow = {
  isActive: false,
  currentSequences: [],
  currentPartIndex: 0,
  isMobile: () => window.matchMedia("(max-width: 640px)").matches,
};

function shuffleMobileSequences(sequences) {
  const shuffled = [...sequences];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled;
}

const BARCODE_PART_SPLITS = {
  "1001": {
    priority: ["Left Door Handle", "Front Bumper", "Right Front Fender", "Rear Bumper", "Right Tail Lamp"],
    regular: ["Right Door Trim", "Hood Panel", "Rear Spoiler"],
  },
  "1002": {
    priority: ["Right Door Trim", "Hood Panel", "Rear Bumper", "Rear Spoiler"],
    regular: ["Left Door Handle", "Front Bumper", "Right Front Fender", "Right Tail Lamp"],
  },
  "1003": {
    priority: ["Front Bumper", "Right Tail Lamp", "Left Door Handle"],
    regular: ["Right Door Trim", "Hood Panel", "Right Front Fender", "Rear Bumper", "Rear Spoiler"],
  },
  "2001": {
    priority: ["Left Door Handle", "Right Front Fender", "Rear Spoiler", "Right Tail Lamp"],
    regular: ["Right Door Trim", "Front Bumper", "Hood Panel", "Rear Bumper"],
  },
  "2002": {
    priority: ["Front Bumper", "Rear Bumper"],
    regular: ["Left Door Handle", "Right Door Trim", "Hood Panel", "Right Front Fender", "Rear Spoiler", "Right Tail Lamp"],
  },
  "2003": {
    priority: ["Right Door Trim", "Hood Panel", "Right Front Fender", "Rear Bumper", "Rear Spoiler"],
    regular: ["Left Door Handle", "Front Bumper", "Right Tail Lamp"],
  },
  "3001": {
    priority: ["Left Door Handle", "Hood Panel", "Right Tail Lamp"],
    regular: ["Right Door Trim", "Front Bumper", "Right Front Fender", "Rear Bumper", "Rear Spoiler"],
  },
  "3002": {
    priority: ["Front Bumper", "Right Front Fender", "Rear Bumper", "Right Tail Lamp"],
    regular: ["Left Door Handle", "Right Door Trim", "Hood Panel", "Rear Spoiler"],
  },
  "3003": {
    priority: ["Left Door Handle", "Right Door Trim", "Front Bumper", "Rear Spoiler", "Right Tail Lamp"],
    regular: ["Hood Panel", "Right Front Fender", "Rear Bumper"],
  },
  "4001": {
    priority: ["Right Front Fender", "Right Tail Lamp"],
    regular: ["Left Door Handle", "Right Door Trim", "Front Bumper", "Hood Panel", "Rear Bumper", "Rear Spoiler"],
  },
  "4002": {
    priority: ["Left Door Handle", "Hood Panel", "Rear Bumper", "Right Tail Lamp"],
    regular: ["Right Door Trim", "Front Bumper", "Right Front Fender", "Rear Spoiler"],
  },
  "4003": {
    priority: ["Right Door Trim", "Front Bumper", "Right Front Fender", "Rear Bumper", "Right Tail Lamp"],
    regular: ["Left Door Handle", "Hood Panel", "Rear Spoiler"],
  },
};

function buildMobileInspectionSequences(vehicleModel, stationId, barcode = "") {
  const model = (vehicleModel || "").trim();
  const station = (stationId || "").trim();
  const split = BARCODE_PART_SPLITS[String(barcode || "").trim()];
  const priorityParts = new Set(split?.priority || []);

  const configured = Array.isArray(state?.stationSequences)
    ? state.stationSequences
        .filter((item) => (station ? item.stationId === station : true))
        .map((item) => ({
          sequenceId: item.sequenceId || "",
          partName: item.partName || "Part",
          description: item.sequenceDescription || "Visual inspection",
          qualityCriteria: item.qualityCriteria || "Standard visual inspection",
          imageUrl: item.imageName || "./placeholder.png",
          isPriority: priorityParts.has(item.partName || ""),
          completed: false,
          vehicleModel: model,
          stationId: station,
        }))
    : [];

  if (configured.length > 0) {
    const priority = configured.filter((item) => item.isPriority);
    const regular = configured.filter((item) => !item.isPriority);
    return [...shuffleMobileSequences(priority), ...shuffleMobileSequences(regular)];
  }

  const demoParts = [
    ["PART-001", "Left Door Handle", "left-door-handle.png"],
    ["PART-002", "Right Door Trim", "right-door-trim.png"],
    ["PART-003", "Front Bumper", "front-bumper.png"],
    ["PART-004", "Hood Panel", "hood-panel.png"],
    ["PART-005", "Right Front Fender", "right-front-fender.png"],
    ["PART-006", "Rear Bumper", "rear-bumper.png"],
    ["PART-007", "Rear Spoiler", "rear-spoiler.png"],
    ["PART-008", "Right Tail Lamp", "right-tail-lamp.png"],
  ];

  const sequences = demoParts.map(([sequenceId, partName, imageUrl]) => ({
    sequenceId,
    partName,
    description: `Inspect ${partName} for fit, finish, and defects.`,
    qualityCriteria: "Standard visual inspection",
    imageUrl,
    isPriority: priorityParts.has(partName),
    completed: false,
    vehicleModel: model,
    stationId: station,
  }));
  const priority = sequences.filter((item) => item.isPriority);
  const regular = sequences.filter((item) => !item.isPriority);
  return [...shuffleMobileSequences(priority), ...shuffleMobileSequences(regular)];
}

/**
 * Show Mobile Inspection Entry Screen (Mobile Only)
 * Simplified entry for VIN, Model, and Station before workflow
 */
function showMobileInspectionEntry() {
  if (!isMobileWorkflowMode()) return false;

  // Ensure the mobile workflow class is on body so screens are visible
  document.body.classList.add("force-mobile-workflow");

  const screen = document.getElementById("mobileInspectionEntryScreen");
  const form = document.getElementById("inspectionForm");
  const loginPage = document.getElementById("loginPage");

  if (screen) {
    // Hide login page
    if (loginPage) {
      loginPage.classList.add("hidden");
    }
    // Hide the traditional form
    if (form) {
      form.style.display = "none";
    }
    // Show mobile entry screen
    screen.classList.remove("hidden");

    // Clear input fields for new inspection
    const vinInput = document.getElementById("mobileVinInput");
    const modelSelect = document.getElementById("mobileVehicleModel");
    const stationSelect = document.getElementById("mobileStationId");
    if (vinInput) vinInput.value = "";
    if (modelSelect) modelSelect.value = "";
    if (stationSelect) stationSelect.value = "";

    // Wire up buttons
    const beginBtn = document.getElementById("mobileBeginInspectionBtn");
    const backBtn = document.getElementById("mobileBackBtn");
    const scanBtn = document.getElementById("mobileScanVinBtn");
    const barcodeInput = document.getElementById("mobileBarcodeImageInput");
    const cameraBtn = document.getElementById("mobileCameraVinBtn");
    const entryHomeBtn = document.getElementById("mobileEntryHomeBtn");

    if (entryHomeBtn) {
      entryHomeBtn.onclick = () => {
        showHome();
      };
    }

    // Live camera overlay logic
    if (cameraBtn) {
      cameraBtn.onclick = async function () {
        const overlay = document.getElementById("liveCameraOverlay");
        const video = document.getElementById("liveCameraVideo");
        const canvas = document.getElementById("liveCameraCanvas");
        const captureBtn = document.getElementById("liveCameraCaptureBtn");
        const closeBtn = document.getElementById("liveCameraCloseBtn");
        if (!overlay || !video || !canvas) return;

        let stream = null;

        async function stopCamera() {
          if (stream) {
            stream.getTracks().forEach(function (t) {
              t.stop();
            });
            stream = null;
          }
          video.srcObject = null;
          overlay.classList.add("hidden");
          overlay.style.display = "";
        }

        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
            audio: false,
          });
          video.srcObject = stream;
          overlay.classList.remove("hidden");
          overlay.style.display = "flex";
        } catch (err) {
          showUndoToast(
            "Camera access denied. Please allow camera permission.",
            null,
            3000,
          );
          return;
        }

        closeBtn.onclick = stopCamera;

        // ── Shared state for scan loop ───────────────────────────────────
        let scanStopped = false;
        let scanDetector = null;

        // ── Barcode decode map: 4-digit code → model + station ──────────
        var BARCODE_MAP = {
          1001: { model: "Model S", station: "ST-001" },
          1002: { model: "Model S", station: "ST-002" },
          1003: { model: "Model S", station: "ST-003" },
          2001: { model: "Model 3", station: "ST-001" },
          2002: { model: "Model 3", station: "ST-002" },
          2003: { model: "Model 3", station: "ST-003" },
          3001: { model: "Model X", station: "ST-001" },
          3002: { model: "Model X", station: "ST-002" },
          3003: { model: "Model X", station: "ST-003" },
          4001: { model: "Model Y", station: "ST-001" },
          4002: { model: "Model Y", station: "ST-002" },
          4003: { model: "Model Y", station: "ST-003" },
        };

        // ── Helper: parse scanned value and populate fields ──────────────
        function applyScannedValue(raw) {
          const vinInput = document.getElementById("mobileVinInput");
          const modelSelect = document.getElementById("mobileVehicleModel");
          const stationSelect = document.getElementById("mobileStationId");
          if (!vinInput) return;

          var lookup = BARCODE_MAP[raw.trim()];
          if (lookup) {
            // Short 4-digit barcode code
            if (modelSelect) modelSelect.value = lookup.model;
            if (stationSelect) stationSelect.value = lookup.station;
            vinInput.value = raw;
            [vinInput, modelSelect, stationSelect].forEach(function (el) {
              if (el) {
                el.style.backgroundColor = "rgba(100,200,100,0.2)";
                el.style.borderColor = "#64c864";
              }
            });
            setTimeout(function () {
              [vinInput, modelSelect, stationSelect].forEach(function (el) {
                if (el) {
                  el.style.backgroundColor = "";
                  el.style.borderColor = "";
                }
              });
            }, 2000);
            showUndoToast(
              "&#10003; " + lookup.model + " \u00b7 " + lookup.station,
              null,
              2500,
            );
          } else if (raw.startsWith("AIQI|")) {
            // Legacy long-format payload
            const parts = raw.split("|");
            let parsedModel = "",
              parsedStation = "";
            parts.forEach(function (p) {
              if (p.startsWith("MODEL:")) parsedModel = p.slice(6).trim();
              if (p.startsWith("STATION:")) parsedStation = p.slice(8).trim();
            });
            if (parsedModel && modelSelect) modelSelect.value = parsedModel;
            if (parsedStation && stationSelect)
              stationSelect.value = parsedStation;
            vinInput.value = raw;
            showUndoToast(
              "&#10003; " + parsedModel + " \u00b7 " + parsedStation,
              null,
              2500,
            );
          } else {
            vinInput.value = raw;
            vinInput.style.backgroundColor = "rgba(100,200,100,0.2)";
            vinInput.style.borderColor = "#64c864";
            setTimeout(function () {
              vinInput.style.backgroundColor = "";
              vinInput.style.borderColor = "";
            }, 2000);
            showUndoToast("&#10003; Scanned: " + raw, null, 2500);
          }
          if (window.navigator.vibrate) window.navigator.vibrate([50, 30, 50]);
        }

        // ── Continuous auto-scan loop (QR-first, ~5 fps) ─────────────────
        async function startScanLoop() {
          if (!("BarcodeDetector" in window)) return;
          try {
            // QR code first — most reliable for screen-to-camera scanning
            let supported = [];
            try {
              supported = await BarcodeDetector.getSupportedFormats();
            } catch (e) {}
            const preferred = [
              "qr_code",
              "data_matrix",
              "code_128",
              "code_39",
              "ean_13",
              "upc_a",
            ];
            const formats = supported.length
              ? preferred.filter(function (f) {
                  return supported.includes(f);
                })
              : ["qr_code", "code_128"];
            scanDetector = new BarcodeDetector({
              formats: formats.length ? formats : ["qr_code"],
            });
          } catch (e) {
            return;
          }

          async function scanFrame() {
            if (scanStopped || !stream || video.readyState < 2) return;
            try {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas.getContext("2d").drawImage(video, 0, 0);
              const bitmap = await createImageBitmap(canvas);
              const codes = await scanDetector.detect(bitmap);
              if (codes && codes.length > 0) {
                scanStopped = true;
                applyScannedValue(codes[0].rawValue.trim());
                stopCamera();
                return;
              }
            } catch (e) {
              /* keep looping */
            }
            if (!scanStopped) setTimeout(scanFrame, 250);
          }
          scanFrame();
        }

        // Hook stopCamera to also kill the loop
        var _baseStop = stopCamera;
        stopCamera = function () {
          scanStopped = true;
          return _baseStop();
        };

        // Start auto-scan once video is playing
        video.addEventListener("playing", startScanLoop, { once: true });

        // Capture button = manual fallback for browsers without BarcodeDetector
        captureBtn.onclick = async function () {
          if (scanDetector) {
            // Force one immediate scan attempt
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            try {
              const bitmap = await createImageBitmap(canvas);
              const codes = await scanDetector.detect(bitmap);
              if (codes && codes.length > 0) {
                scanStopped = true;
                applyScannedValue(codes[0].rawValue.trim());
                stopCamera();
              } else {
                showUndoToast(
                  "No code found \u2014 hold steady and try again",
                  null,
                  2000,
                );
              }
            } catch (e) {
              showUndoToast("Scan error: " + e.message, null, 2500);
            }
          } else {
            // No BarcodeDetector: send frame through file-input handler
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            canvas.toBlob(
              function (blob) {
                const file = new File([blob], "capture.jpg", {
                  type: "image/jpeg",
                });
                const dt = new DataTransfer();
                dt.items.add(file);
                barcodeInput.files = dt.files;
                barcodeInput.dispatchEvent(
                  new Event("change", { bubbles: true }),
                );
              },
              "image/jpeg",
              0.92,
            );
            await stopCamera();
          }
        };
      };
    }

    if (scanBtn && barcodeInput) {
      scanBtn.onclick = function () {
        showUndoToast("🔍 Scanning barcode...", null, 1000);

        setTimeout(function () {
          const vinInput = document.getElementById("mobileVinInput");
          const modelSelect = document.getElementById("mobileVehicleModel");
          const stationSelect = document.getElementById("mobileStationId");

          if (!vinInput || !modelSelect || !stationSelect) {
            return;
          }

          // Generate sample VIN
          const prefixes = ["AB", "CD", "EF", "GH"];
          const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
          const middle = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();
          const suffix = Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");
          const vin = prefix + middle + suffix;

          // Determine Model and Station based on VIN first character
          const models = ["Model S", "Model 3", "Model X", "Model Y"];
          const stations = ["ST-001", "ST-002", "ST-003"];
          const modelIndex = vin.charCodeAt(0) % models.length;
          const stationIndex = vin.charCodeAt(1) % stations.length;
          const model = models[modelIndex];
          const station = stations[stationIndex];

          // Populate all three fields
          vinInput.value = vin;
          modelSelect.value = model;
          stationSelect.value = station;

          // Visual feedback
          vinInput.style.backgroundColor = "rgba(100, 200, 100, 0.2)";
          vinInput.style.borderColor = "#64c864";
          modelSelect.style.backgroundColor = "rgba(100, 200, 100, 0.2)";
          stationSelect.style.backgroundColor = "rgba(100, 200, 100, 0.2)";

          // Show success message
          showUndoToast(
            "✓ Barcode scanned: " + vin + " | " + model + " | " + station,
            null,
            2500,
          );

          // Vibrate if available
          if (window.navigator.vibrate) {
            window.navigator.vibrate(16);
          }

          // Remove highlight after 2 seconds
          setTimeout(function () {
            vinInput.style.backgroundColor = "";
            vinInput.style.borderColor = "";
            modelSelect.style.backgroundColor = "";
            stationSelect.style.backgroundColor = "";
          }, 2000);
        }, 1000);
      };

      barcodeInput.onchange = async () => {
        const file = barcodeInput.files?.[0];
        if (!file) {
          return;
        }

        const vinInput = document.getElementById("mobileVinInput");
        if (!vinInput) {
          return;
        }

        showUndoToast("🔍 Scanning barcode...", null, 1500);

        try {
          // Try using BarcodeDetector API if available
          if ("BarcodeDetector" in window) {
            const detector = new BarcodeDetector({
              formats: [
                "code_128",
                "code_39",
                "ean_13",
                "ean_8",
                "upc_a",
                "upc_e",
                "qr_code",
              ],
            });
            const bitmap = await createImageBitmap(file);
            const codes = await detector.detect(bitmap);
            const raw = codes?.[0]?.rawValue?.trim();
            const barcodeFormat = codes?.[0]?.format || "unknown";

            if (raw) {
              vinInput.value = raw;
              // Add visual feedback to show barcode was scanned
              vinInput.style.backgroundColor = "rgba(100, 200, 100, 0.2)";
              vinInput.style.borderColor = "#64c864";
              setTimeout(() => {
                vinInput.style.backgroundColor = "";
                vinInput.style.borderColor = "";
              }, 2000);

              // Show detailed barcode information
              showUndoToast(
                `✓ Barcode detected (${barcodeFormat}): ${raw}`,
                null,
                2200,
              );
              if (window.navigator.vibrate) {
                window.navigator.vibrate(16);
              }
              return;
            }
          }

          // Fallback: Try to extract text from image using canvas
          const img = new Image();
          img.onload = () => {
            try {
              // Create canvas and draw image
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

              // Try to extract simple patterns from image filename or data
              const fileName = file.name || "";
              const simpleExtract = fileName
                .replace(/[^A-Z0-9]/gi, "")
                .substring(0, 20);

              if (simpleExtract && simpleExtract.length > 3) {
                vinInput.value = simpleExtract;
                vinInput.style.backgroundColor = "rgba(100, 150, 255, 0.2)";
                vinInput.style.borderColor = "#6495ff";
                setTimeout(() => {
                  vinInput.style.backgroundColor = "";
                  vinInput.style.borderColor = "";
                }, 2000);

                showUndoToast(`✓ VIN extracted: ${simpleExtract}`, null, 2200);
                if (window.navigator.vibrate) {
                  window.navigator.vibrate([16, 50, 16]);
                }
              } else {
                showUndoToast(
                  "⚠️ Could not read barcode. Please enter VIN manually.",
                  null,
                  2400,
                );
                vinInput.focus();
              }
            } catch (err) {
              showUndoToast(
                "⚠️ Unable to process image. Please enter VIN manually.",
                null,
                2400,
              );
              vinInput.focus();
            }
          };

          img.onerror = () => {
            showUndoToast(
              "⚠️ Invalid image format. Please enter VIN manually.",
              null,
              2400,
            );
            vinInput.focus();
          };

          // Load image from file
          img.src = URL.createObjectURL(file);
        } catch (_error) {
          showUndoToast(
            "⚠️ Scanner not available. Please enter VIN manually.",
            null,
            2400,
          );
          vinInput.focus();
        }
      };
    }

    if (beginBtn) {
      beginBtn.onclick = () => {
        const safeSetInputValue = (id, value) => {
          const el = document.getElementById(id);
          if (el) {
            el.value = value;
          }
        };

        const vin = document.getElementById("mobileVinInput")?.value?.trim();
        const model = document
          .getElementById("mobileVehicleModel")
          ?.value?.trim();
        const station = document
          .getElementById("mobileStationId")
          ?.value?.trim();

        if (!vin || !model || !station) {
          showUndoToast("📋 Please enter all fields", null, 2000);
          return;
        }

        // Store mobile entry data
        safeSetInputValue("inspectionVin", vin);
        safeSetInputValue("inspectionVehicleModel", model);
        safeSetInputValue("inspectionStationId", station);

        // Auto-fill required fields to pass validation
        safeSetInputValue("inspectionRegion", "NA");
        safeSetInputValue("inspectionPlant", "TNAP");
        safeSetInputValue("inspectionArea", "GA");
        safeSetInputValue("inspectionSubArea", "Trim");
        safeSetInputValue("inspectionStationName", station);

        // Build mobile workflow sequences without depending on module-local functions
        const sequences = buildMobileInspectionSequences(model, station, vin);

        if (sequences.length === 0) {
          showUndoToast("No sequences available for this station.", null, 2200);
          return;
        }

        // Hide mobile entry screen
        screen.classList.add("hidden");
        // Keep traditional form hidden in mobile role flow
        if (form) {
          form.style.display = "none";
        }
        // Start mobile workflow
        initializeMobileWorkflow(sequences);
      };
    }

    if (backBtn) {
      backBtn.onclick = () => {
        // Return to login
        screen.classList.add("hidden");
        if (loginPage) {
          loginPage.classList.remove("hidden");
        }
        // Reset form
        document.getElementById("mobileVinInput").value = "";
        document.getElementById("mobileVehicleModel").value = "";
        document.getElementById("mobileStationId").value = "";
      };
    }

    return true;
  }

  return false;
}

/**
 * Initialize the mobile inspection workflow
 * Called when opening part inspection on mobile devices
 */
function initializeMobileWorkflow(sequences) {
  if (!isMobileWorkflowMode()) {
    // Desktop: use traditional form
    return false;
  }

  inspectionWorkflow.currentSequences = sequences || [];
  inspectionWorkflow.currentPartIndex = 0;
  inspectionWorkflow.isActive = true;

  // Get VIN, Model, and Station from form fields
  // Check if we're in mobile workflow mode
  const mobileVinInput = document.getElementById("mobileVinInput");
  const mobileModelSelect = document.getElementById("mobileVehicleModel");
  const mobileStationSelect = document.getElementById("mobileStationId");

  let vin = "";
  let model = "";
  let station = "";

  if (mobileVinInput && mobileModelSelect && mobileStationSelect) {
    // Mobile workflow
    vin = mobileVinInput.value || "";
    model = mobileModelSelect.value || "";
    station = mobileStationSelect.value || "";
  } else {
    // Desktop workflow
    vin = document.getElementById("inspectionVin")?.value || "";
    model = document.getElementById("inspectionVehicleModel")?.value || "";
    station = document.getElementById("inspectionStationId")?.value || "";
  }

  // Show initialization screen instead of parts list
  showInitializationScreen(sequences, vin, model, station);
  return true;
}

/**
 * Show the Initialization Screen - displays priority vs regular defects
 */
function showInitializationScreen(sequences, vin, model, station) {
  console.log(
    "[INIT_SCREEN] showInitializationScreen called with sequences:",
    sequences?.length,
    "vin:",
    vin,
  );

  const screen = document.getElementById("inspectionInitScreen");
  console.log("[INIT_SCREEN] screen element found:", !!screen);
  console.log("[INIT_SCREEN] screen classes before:", screen?.className);
  if (!screen) {
    console.error("[INIT_SCREEN] ERROR: inspectionInitScreen not found!");
    return;
  }

  // Style and show the heading
  const heading = screen.querySelector(".init-main-heading");
  if (heading) {
    heading.style.color = "#ffffff";
    heading.style.fontSize = "1.6rem";
    heading.style.fontWeight = "900";
    heading.style.textShadow = "0 2px 8px rgba(0, 0, 0, 1)";
  }

  // Style description text
  const descText = screen.querySelector(".init-description-text");
  if (descText) {
    descText.style.color = "#ffffff";
    descText.style.fontSize = "0.95rem";
    descText.style.fontWeight = "500";
    descText.style.opacity = "1";
  }

  // Hide the status badge completely
  const statusBadge = document.getElementById("initStatus");
  if (statusBadge) {
    statusBadge.style.display = "none";
  }

  // Separate sequences into priority and regular
  const prioritySequences = sequences.filter((seq) => seq.isPriority);
  const regularSequences = sequences.filter((seq) => !seq.isPriority);
  console.log(
    "[INIT_SCREEN] priority sequences:",
    prioritySequences.length,
    "regular sequences:",
    regularSequences.length,
  );

  // Update vehicle info
  const vinEl = document.getElementById("initVin");
  const modelEl = document.getElementById("initModel");
  const stationEl = document.getElementById("initStation");

  // Style and populate VIN
  if (vinEl) {
    vinEl.textContent = sanitize(vin || "—");
    vinEl.style.color = "#ffff00";
    vinEl.style.fontWeight = "700";
    vinEl.style.textShadow =
      "0 3px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 0, 0.6)";
    vinEl.style.fontSize = "1.3rem";

    // Style the label
    const vinLabel = vinEl.parentElement?.querySelector(".vehicle-info-label");
    if (vinLabel) {
      vinLabel.style.color = "#ffffff";
      vinLabel.style.fontSize = "0.85rem";
      vinLabel.style.fontWeight = "700";
      vinLabel.style.textTransform = "uppercase";
      vinLabel.style.letterSpacing = "1.5px";
      vinLabel.style.display = "block";
    }
  }

  // Style and populate Model
  if (modelEl) {
    modelEl.textContent = sanitize(model || "—");
    modelEl.style.color = "#ffff00";
    modelEl.style.fontWeight = "700";
    modelEl.style.textShadow =
      "0 3px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 0, 0.6)";
    modelEl.style.fontSize = "1.3rem";

    // Style the label
    const modelLabel = modelEl.parentElement?.querySelector(
      ".vehicle-info-label",
    );
    if (modelLabel) {
      modelLabel.style.color = "#ffffff";
      modelLabel.style.fontSize = "0.85rem";
      modelLabel.style.fontWeight = "700";
      modelLabel.style.textTransform = "uppercase";
      modelLabel.style.letterSpacing = "1.5px";
      modelLabel.style.display = "block";
    }
  }

  // Style and populate Station
  if (stationEl) {
    stationEl.textContent = sanitize(station || "—");
    stationEl.style.color = "#ffff00";
    stationEl.style.fontWeight = "700";
    stationEl.style.textShadow =
      "0 3px 12px rgba(0, 0, 0, 0.9), 0 0 8px rgba(255, 255, 0, 0.6)";
    stationEl.style.fontSize = "1.3rem";

    // Style the label
    const stationLabel = stationEl.parentElement?.querySelector(
      ".vehicle-info-label",
    );
    if (stationLabel) {
      stationLabel.style.color = "#ffffff";
      stationLabel.style.fontSize = "0.85rem";
      stationLabel.style.fontWeight = "700";
      stationLabel.style.textTransform = "uppercase";
      stationLabel.style.letterSpacing = "1.5px";
      stationLabel.style.display = "block";
    }
  }

  // Update Priority Section
  const prioritySection = document.getElementById("prioritySection");
  const priorityCountEl = document.getElementById("priorityCount");
  const priorityPartsList = document.getElementById("priorityPartsList");

  if (prioritySection) {
    if (prioritySequences.length > 0) {
      prioritySection.classList.remove("hidden");
      if (priorityCountEl) {
        priorityCountEl.textContent = prioritySequences.length;
        // Apply inline styles to section count
        priorityCountEl.style.color = "#000000";
        priorityCountEl.style.fontWeight = "900";
        priorityCountEl.style.fontSize = "1.2rem";
        priorityCountEl.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
        priorityCountEl.style.padding = "0.5rem 0.75rem";
        priorityCountEl.style.borderRadius = "6px";
      }

      // Style section header
      const priorityHeader = prioritySection.querySelector(".section-header");
      if (priorityHeader) {
        priorityHeader.style.backgroundColor = "#ffffff";
        priorityHeader.style.padding = "1rem";
        priorityHeader.style.borderRadius = "8px";
        priorityHeader.style.marginBottom = "1rem";
        priorityHeader.style.display = "flex";
        priorityHeader.style.alignItems = "center";
        priorityHeader.style.gap = "0.75rem";
        priorityHeader.style.border = "2px solid #1d4ed8";
      }

      // Style section title
      const priorityTitle = prioritySection.querySelector(".section-title");
      if (priorityTitle) {
        priorityTitle.style.color = "#172554";
        priorityTitle.style.fontWeight = "900";
        priorityTitle.style.fontSize = "1.5rem";
        priorityTitle.style.textShadow = "none";
        priorityTitle.style.webkitTextStroke = "0.6px #172554";
        priorityTitle.style.flex = "1";
      }

      // Populate priority parts list
      if (priorityPartsList) {
        priorityPartsList.innerHTML = "";
        prioritySequences.forEach((seq, index) => {
          const item = document.createElement("li");
          item.className = "part-item";
          item.textContent = sanitize(seq.partName);
          item.style.color = "#ffffff";
          item.style.fontWeight = "600";
          item.style.fontSize = "0.95rem";
          item.style.lineHeight = "1.6";
          item.style.paddingBottom = "0.4rem";
          priorityPartsList.appendChild(item);
        });
      }
    } else {
      prioritySection.classList.add("hidden");
    }
  }

  // Update Regular Section
  const regularSection = document.getElementById("regularSection");
  const regularCountEl = document.getElementById("regularCount");
  const regularPartsList = document.getElementById("regularPartsList");

  if (regularSection) {
    regularSection.classList.remove("hidden");
    if (regularCountEl) {
      regularCountEl.textContent = regularSequences.length;
      // Apply inline styles to section count
      regularCountEl.style.color = "#000000";
      regularCountEl.style.fontWeight = "900";
      regularCountEl.style.fontSize = "1.2rem";
      regularCountEl.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      regularCountEl.style.padding = "0.5rem 0.75rem";
      regularCountEl.style.borderRadius = "6px";
    }

    // Style section header
    const regularHeader = regularSection.querySelector(".section-header");
    if (regularHeader) {
      regularHeader.style.backgroundColor = "#ffffff";
      regularHeader.style.padding = "1rem";
      regularHeader.style.borderRadius = "8px";
      regularHeader.style.marginBottom = "1rem";
      regularHeader.style.display = "flex";
      regularHeader.style.alignItems = "center";
      regularHeader.style.gap = "0.75rem";
      regularHeader.style.border = "2px solid #1d4ed8";
    }

    // Style section title
    const regularTitle = regularSection.querySelector(".section-title");
    if (regularTitle) {
      regularTitle.style.color = "#172554";
      regularTitle.style.fontWeight = "900";
      regularTitle.style.fontSize = "1.5rem";
      regularTitle.style.textShadow = "none";
      regularTitle.style.webkitTextStroke = "0.6px #172554";
      regularTitle.style.flex = "1";
    }

    // Populate regular parts list
    if (regularPartsList) {
      regularPartsList.innerHTML = "";
      regularSequences.forEach((seq, index) => {
        const item = document.createElement("li");
        item.className = "part-item";
        item.textContent = sanitize(seq.partName);
        item.style.color = "#ffffff";
        item.style.fontWeight = "600";
        item.style.fontSize = "0.95rem";
        item.style.lineHeight = "1.6";
        item.style.paddingBottom = "0.4rem";
        regularPartsList.appendChild(item);
      });
    }
  }

  // Show screen and hide others
  console.log("[INIT_SCREEN] About to remove hidden class");
  console.log(
    "[INIT_SCREEN] screen.classList before:",
    Array.from(screen.classList),
  );
  screen.classList.remove("hidden");
  console.log(
    "[INIT_SCREEN] screen.classList after:",
    Array.from(screen.classList),
  );
  console.log(
    "[INIT_SCREEN] screen.style.display after removal:",
    window.getComputedStyle(screen).display,
  );

  document.getElementById("partsListScreen")?.classList.add("hidden");
  document.getElementById("partDetailsScreen")?.classList.add("hidden");
  document.getElementById("imageEditorScreen")?.classList.add("hidden");
  document
    .getElementById("mobileInspectionEntryScreen")
    ?.classList.add("hidden");

  // Wire up buttons
  const startBtn = document.getElementById("startInspectionBtn");
  const backBtn = document.getElementById("initBackBtn");
  const cancelBtn = document.getElementById("initCancelBtn");

  if (startBtn) {
    startBtn.onclick = () => {
      screen.classList.add("hidden");
      showPartsListScreen(sequences);
    };
  }

  if (backBtn) {
    backBtn.onclick = () => {
      screen.classList.add("hidden");
      document
        .getElementById("mobileInspectionEntryScreen")
        ?.classList.remove("hidden");
      inspectionWorkflow.isActive = false;
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      screen.classList.add("hidden");
      document
        .getElementById("mobileInspectionEntryScreen")
        ?.classList.remove("hidden");
      inspectionWorkflow.isActive = false;
    };
  }
}

const VOICE_RECORDINGS_DB = "ai-quality-voice-recordings";
const VOICE_RECORDINGS_STORE = "recordings";

function openVoiceRecordingsDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(VOICE_RECORDINGS_DB, 1);
    request.addEventListener("upgradeneeded", () => {
      if (!request.result.objectStoreNames.contains(VOICE_RECORDINGS_STORE)) {
        request.result.createObjectStore(VOICE_RECORDINGS_STORE);
      }
    });
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
  });
}

async function saveVoiceRecording(blob) {
  const database = await openVoiceRecordingsDb();
  const recordingId = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VOICE_RECORDINGS_STORE, "readwrite");
    transaction.objectStore(VOICE_RECORDINGS_STORE).put(blob, recordingId);
    transaction.addEventListener("complete", () => {
      database.close();
      resolve(recordingId);
    });
    transaction.addEventListener("error", () => reject(transaction.error));
  });
}

async function getVoiceRecording(recordingId) {
  const database = await openVoiceRecordingsDb();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(VOICE_RECORDINGS_STORE, "readonly");
    const request = transaction.objectStore(VOICE_RECORDINGS_STORE).get(recordingId);
    request.addEventListener("success", () => resolve(request.result));
    request.addEventListener("error", () => reject(request.error));
    transaction.addEventListener("complete", () => database.close());
  });
}

function encodePcmAsWav(chunks, sampleRate) {
  const sampleCount = chunks.reduce((total, chunk) => total + chunk.length, 0);
  const wavBuffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(wavBuffer);
  const writeText = (offset, text) => {
    for (let index = 0; index < text.length; index += 1) {
      view.setUint8(offset + index, text.charCodeAt(index));
    }
  };

  writeText(0, "RIFF");
  view.setUint32(4, wavBuffer.byteLength - 8, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, sampleCount * 2, true);

  let offset = 44;
  chunks.forEach((chunk) => {
    chunk.forEach((value) => {
      const sample = Math.max(-1, Math.min(1, value));
      view.setInt16(
        offset,
        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
        true,
      );
      offset += 2;
    });
  });

  return {
    blob: new Blob([wavBuffer], { type: "audio/wav" }),
    durationMs: (sampleCount / sampleRate) * 1000,
  };
}

/**
 * Show the Parts List Overview Screen (Screen 1)
 */
function showPartsListScreen(sequences) {
  const screen = document.getElementById("partsListScreen");
  if (!screen) return;

  const container = document.getElementById("partsListContainer");
  if (!container) return;

  let activeVoiceRecorder = null;

  const formatVoiceDuration = (durationMs) => {
    const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const isPartSelected = (part) =>
    Boolean(part?.completed || part?.resultGood || part?.resultBad);

  const updateSubmitButtonState = () => {
    const submitBtn = document.getElementById("partsListSubmitBtn");
    if (!submitBtn) return;

    const total = sequences.length;
    const completed = sequences.filter(isPartSelected).length;
    const allSelected = total > 0 && completed === total;

    submitBtn.disabled = !allSelected;
    submitBtn.setAttribute("aria-disabled", String(!allSelected));
    submitBtn.textContent = allSelected
      ? "✓ Submit Inspection"
      : `Complete all parts (${completed}/${total})`;
  };

  // Build parts grid using DocumentFragment for better performance
  const fragment = document.createDocumentFragment();
  sequences.forEach((seq, index) => {
    let status, statusText;
    if (seq.resultGood) {
      status = "good";
      statusText = "✓ Good";
    } else if (seq.resultBad) {
      status = "bad";
      statusText = "✗ Bad";
    } else if (seq.completed) {
      status = "completed";
      statusText = "✓ Done";
    } else {
      status = "pending";
      statusText = "Pending";
    }
    const imageUrl = seq.imageUrl || "./placeholder.png";

    const item = document.createElement("div");
    item.className = seq.isPriority
      ? "parts-list-item priority-part"
      : "parts-list-item";
    item.setAttribute("data-part-index", index);
    item.style.position = "relative";

    // Image wrapper to allow positioning the focus button
    const imgWrap = document.createElement("div");
    imgWrap.className = "parts-list-image-wrap";

    const img = document.createElement("img");
    img.src = sanitize(imageUrl);
    img.alt = sanitize(seq.partName);
    img.className = "parts-list-item-image";
    img.loading = "lazy";
    img.onerror = () => {
      img.style.display = "none";
    };
    // Image click disabled — use Detail button to view details
    imgWrap.appendChild(img);

    // Focus/expand button — top-right corner of image
    const focusBtn = document.createElement("button");
    focusBtn.type = "button";
    focusBtn.className = "parts-list-focus-btn";
    focusBtn.setAttribute("aria-label", "Expand image");
    focusBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1h4v4M5 13H1V9M13 1L8 6M1 13l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

    let focusHandledByTouch = false;
    focusBtn.style.touchAction = "manipulation";
    focusBtn.style.webkitTapHighlightColor = "transparent";
    focusBtn.style.cursor = "pointer";

    focusBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        focusHandledByTouch = true;
        openFocusLightbox(img.src, `Enlarged: ${sanitize(seq.partName)}`);
        setTimeout(() => {
          focusHandledByTouch = false;
        }, 700);
      },
      { passive: false },
    );

    focusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (focusHandledByTouch) return;
      openFocusLightbox(img.src, `Enlarged: ${sanitize(seq.partName)}`);
    });
    imgWrap.appendChild(focusBtn);
    item.appendChild(imgWrap);

    // Row 1: Sequence No + Priority/Regular badge
    const seqRow = document.createElement("div");
    seqRow.className = "parts-list-seq-row";
    const seqNo = document.createElement("span");
    seqNo.className = "parts-list-seq-no";
    seqNo.textContent = `Seq ${String(index + 1).padStart(3, "0")}`;
    seqRow.appendChild(seqNo);
    const defectBadge = document.createElement("span");
    defectBadge.className = seq.isPriority
      ? "parts-list-defect-badge priority"
      : "parts-list-defect-badge regular";
    defectBadge.textContent = seq.isPriority ? "⚠ Priority" : "Regular";
    seqRow.appendChild(defectBadge);

    // Detail button — inline beside priority badge
    const detailBtn = document.createElement("button");
    detailBtn.type = "button";
    detailBtn.className = "parts-list-detail-btn";
    detailBtn.textContent = "Detail";
    detailBtn.setAttribute("aria-label", "View part details");
    detailBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPartDetailsScreen(inspectionWorkflow.currentSequences, index);
    });
    seqRow.appendChild(detailBtn);
    item.appendChild(seqRow);

    // Row 2: Part Name
    const name = document.createElement("p");
    name.className = "parts-list-item-name";
    name.style.color = "#ffffff";
    name.textContent = sanitize(seq.partName);
    item.appendChild(name);

    // Row 3: Part ID + Ok / Not Ok / Mic buttons
    const idRow = document.createElement("div");
    idRow.className = "parts-list-id-row";
    const meta = document.createElement("span");
    meta.className = "parts-list-item-meta";
    meta.textContent = sanitize(seq.sequenceId || "");
    idRow.appendChild(meta);

    const btnOk = document.createElement("button");
    btnOk.type = "button";
    btnOk.className = "parts-action-btn ok" + (seq.resultGood ? " active" : "");
    btnOk.textContent = "✓ Ok";
    btnOk.setAttribute("aria-label", "Mark OK");
    btnOk.addEventListener("click", (e) => {
      e.stopPropagation();
      recordPartResult(seq, index, false);
      btnOk.classList.add("active");
      btnNotOk.classList.remove("active");
      const s = item.querySelector(".parts-list-item-status");
      if (s) {
        s.className = "parts-list-item-status good";
        s.textContent = "✓ Good";
      }
      updateSubmitButtonState();
    });

    const btnNotOk = document.createElement("button");
    btnNotOk.type = "button";
    btnNotOk.className =
      "parts-action-btn notok" + (seq.resultBad ? " active red" : "");
    btnNotOk.textContent = "✗ Not Ok";
    btnNotOk.setAttribute("aria-label", "Mark Not OK");

    // Defect details dropdown panel — generated dynamically from past trends
    const defectPanel = document.createElement("div");
    defectPanel.className = "defect-details-panel hidden";
    
    // Get past defect trends for this part
    const trends = extractDefectTrendsForPart(seq.partName);
    const metadata = DEFECT_METADATA[seq.partName] || {
      operationCodes: [],
      operationLabels: [],
      errorCodes: [],
      localisations: [],
      familyNatures: [],
    };

    // Helper to create select with options prioritized by past trends
    const buildSelectOptions = (field, trendValues, metaValues) => {
      let html = '<option value="">— Select —</option>';
      const seen = new Set();
      
      // Add trend values first (most common)
      trendValues.forEach((val) => {
        if (val && !seen.has(val)) {
          html += `<option value="${sanitize(val)}">${sanitize(val)} ★</option>`;
          seen.add(val);
        }
      });
      
      // Then add predefined metadata values
      metaValues.forEach((val) => {
        if (val && !seen.has(val)) {
          html += `<option value="${sanitize(val)}">${sanitize(val)}</option>`;
          seen.add(val);
        }
      });
      
      return html;
    };

    defectPanel.innerHTML = `
      <div class="defect-details-form">
        <div class="defect-field">
          <label>Operation Code ${trends.operationCodes.length > 0 ? '(with trends)' : ''}</label>
          <select class="defect-select" data-field="operationCode">
            ${buildSelectOptions('operationCode', trends.operationCodes, metadata.operationCodes)}
          </select>
        </div>
        <div class="defect-field">
          <label>Error Code ${trends.errorCodes.length > 0 ? '(with trends)' : ''}</label>
          <select class="defect-select" data-field="errorCode">
            ${buildSelectOptions('errorCode', trends.errorCodes, metadata.errorCodes)}
          </select>
        </div>
        <div class="defect-field voice-recording-field">
          <label>Voice Recording</label>
          <span class="voice-recording-status">Tap the microphone to record the defect</span>
          <audio class="voice-recording-preview hidden" controls preload="metadata"></audio>
        </div>
        <button type="button" class="defect-save-btn">✓ Save Defect</button>
      </div>
    `;

    const recordingStatus = defectPanel.querySelector(".voice-recording-status");
    const recordingPreview = defectPanel.querySelector(".voice-recording-preview");
    const existingResult = state.inspections?.find(
      (inspection) => inspection.partIndex === index && inspection.resultBad,
    );
    const existingRecordingId = existingResult?.defectDetails?.voiceRecordingId;
    const existingRecordingDuration = Number(
      existingResult?.defectDetails?.voiceRecordingDurationMs || 0,
    );
    if (existingRecordingId) {
      defectPanel.dataset.voiceRecordingId = existingRecordingId;
      defectPanel.dataset.voiceRecordingDurationMs = String(existingRecordingDuration);
      getVoiceRecording(existingRecordingId)
        .then((blob) => {
          if (!blob) return;
          recordingPreview.src = URL.createObjectURL(blob);
          recordingPreview.classList.remove("hidden");
          recordingStatus.textContent = existingRecordingDuration
            ? `Recording attached (${formatVoiceDuration(existingRecordingDuration)})`
            : "Recording attached";
        })
        .catch(() => {
          recordingStatus.textContent = "Saved recording is unavailable";
        });
    }

    // Save button — saves selections and closes panel
    defectPanel
      .querySelector(".defect-save-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Collect defect details from form
        const defectDetails = {};
        defectPanel.querySelectorAll("[data-field]").forEach((field) => {
          defectDetails[field.dataset.field] = field.value.trim();
        });
        if (defectPanel.dataset.voiceRecordingId) {
          defectDetails.voiceRecordingId = defectPanel.dataset.voiceRecordingId;
          defectDetails.voiceRecordingDurationMs = Number(
            defectPanel.dataset.voiceRecordingDurationMs || 0,
          );
        }
        
        // Mark this part as NOT OK and store defect metadata
        recordPartResult(seq, index, true, null, defectDetails);
        defectPanel.classList.add("hidden");
        btnNotOk.classList.remove("red");
        btnNotOk.classList.add("active");
        btnOk.classList.remove("active");
        updateSubmitButtonState();
      });

    btnNotOk.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = !defectPanel.classList.contains("hidden");
      if (isOpen) {
        defectPanel.classList.add("hidden");
        btnNotOk.classList.remove("red");
      } else {
        defectPanel.classList.remove("hidden");
        btnNotOk.classList.add("active", "red");
        btnOk.classList.remove("active");
        const s = item.querySelector(".parts-list-item-status");
        if (s) {
          s.className = "parts-list-item-status bad";
          s.textContent = "✗ Not Ok";
        }
        // Focus first input
        requestAnimationFrame(() =>
          defectPanel.querySelector(".defect-input")?.focus(),
        );
      }
    });

    const btnMic = document.createElement("button");
    btnMic.type = "button";
    btnMic.className = "parts-action-btn mic";
    btnMic.innerHTML = "🎤";
    btnMic.setAttribute("aria-label", "Voice note");
    btnMic.setAttribute("aria-pressed", "false");
    btnMic.addEventListener("click", async (e) => {
      e.stopPropagation();

      if (activeVoiceRecorder) {
        if (activeVoiceRecorder.button === btnMic) {
          await activeVoiceRecorder.stop();
        } else {
          showUndoToast("Finish the current voice recording first", null, 2500);
        }
        return;
      }

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!navigator.mediaDevices?.getUserMedia || !AudioContextClass) {
        showUndoToast("Audio recording is not supported in this browser", null, 3000);
        return;
      }

      if (!window.isSecureContext) {
        showUndoToast("Microphone access requires HTTPS or localhost", null, 3500);
        return;
      }

      defectPanel.classList.remove("hidden");
      btnNotOk.classList.add("active", "red");
      btnOk.classList.remove("active");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        const audioContext = new AudioContextClass();
        const source = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        const chunks = [];
        const startedAt = Date.now();
        const sampleRate = audioContext.sampleRate;

        const captureHandler = (event) => {
          chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
        };
        processor.addEventListener("audioprocess", captureHandler);
        source.connect(processor);
        processor.connect(audioContext.destination);
        await audioContext.resume();

        recordingStatus.textContent = "Recording 0:00 · Tap stop when finished";
        recordingPreview.pause();
        recordingPreview.classList.add("hidden");
        if (recordingPreview.src) URL.revokeObjectURL(recordingPreview.src);
        recordingPreview.removeAttribute("src");
        btnMic.classList.add("recording");
        btnMic.innerHTML = "■";
        btnMic.setAttribute("aria-label", "Stop voice recording");
        btnMic.setAttribute("aria-pressed", "true");

        const stopRecording = async () => {
          const currentRecorder = activeVoiceRecorder;
          if (!currentRecorder || currentRecorder.stopping) return;
          currentRecorder.stopping = true;
          if (currentRecorder) {
            clearInterval(currentRecorder.intervalId);
            clearTimeout(currentRecorder.timeoutId);
          }
          processor.disconnect();
          source.disconnect();
          processor.removeEventListener("audioprocess", captureHandler);
          stream.getTracks().forEach((track) => track.stop());
          await audioContext.close();
          activeVoiceRecorder = null;
          btnMic.classList.remove("recording");
          btnMic.innerHTML = "🎤";
          btnMic.setAttribute("aria-label", "Record voice note");
          btnMic.setAttribute("aria-pressed", "false");

          if (!chunks.length) {
            recordingStatus.textContent = "No audio was captured";
            return;
          }

          recordingStatus.textContent = "Preparing recording…";
          try {
            const recording = encodePcmAsWav(chunks, sampleRate);
            const recordingId = await saveVoiceRecording(recording.blob);
            defectPanel.dataset.voiceRecordingId = recordingId;
            defectPanel.dataset.voiceRecordingDurationMs = String(recording.durationMs);
            recordingPreview.src = URL.createObjectURL(recording.blob);
            recordingPreview.classList.remove("hidden");
            recordingStatus.textContent = `Recording attached (${formatVoiceDuration(recording.durationMs)})`;
            showUndoToast("Voice recording attached", null, 2000);
          } catch (error) {
            console.error("Voice recording preparation failed", error);
            recordingStatus.textContent = "Recording could not be prepared";
            showUndoToast("Audio processing failed. Please record again", null, 3000);
          }
        };

        activeVoiceRecorder = {
          button: btnMic,
          stop: stopRecording,
          stopping: false,
          intervalId: setInterval(() => {
            recordingStatus.textContent = `Recording ${formatVoiceDuration(Date.now() - startedAt)} · Tap stop when finished`;
          }, 500),
          timeoutId: setTimeout(stopRecording, 60000),
        };
      } catch (error) {
        const message = error?.name === "NotAllowedError"
          ? "Microphone permission was denied"
          : "Microphone could not be started";
        showUndoToast(message, null, 3000);
      }
    });

    idRow.appendChild(btnOk);
    idRow.appendChild(btnNotOk);
    idRow.appendChild(btnMic);
    item.appendChild(idRow);
    item.appendChild(defectPanel);

    fragment.appendChild(item);
  });

  container.innerHTML = "";
  container.appendChild(fragment);

  // Update badge
  const badge = document.getElementById("partsCountBadge");
  if (badge) {
    badge.textContent = `${sequences.length} parts`;
  }

  // Card click disabled — Detail button handles navigation to Part Details

  // Show screen
  screen.classList.remove("hidden");

  // Hide other screens
  document.getElementById("partDetailsScreen")?.classList.add("hidden");
  document.getElementById("imageEditorScreen")?.classList.add("hidden");

  // Add back button handler
  const backBtn = document.getElementById("partsListBackBtn");
  if (backBtn) {
    backBtn.onclick = () => {
      screen.classList.add("hidden");
      document
        .getElementById("inspectionInitScreen")
        ?.classList.remove("hidden");
    };
  }

  // Submit button — complete inspection and show summary
  const submitBtn = document.getElementById("partsListSubmitBtn");
  if (submitBtn) {
    updateSubmitButtonState();
    submitBtn.onclick = () => {
      const total = sequences.length;
      const completed = sequences.filter(isPartSelected).length;
      if (completed < total) {
        showUndoToast(
          `Please complete all parts before submitting (${completed}/${total}).`,
          null,
          2500,
        );
        updateSubmitButtonState();
        return;
      }
      completeInspectionWorkflow();
    };
  }
}

/**
 * Show Part Info Overlay when image is tapped
 */
function showPartInfoOverlay(seq) {
  const overlay = document.getElementById("partInfoOverlay");
  if (!overlay) return;

  const img = document.getElementById("partInfoImage");
  const name = document.getElementById("partInfoName");
  const desc = document.getElementById("partInfoDesc");
  const criteria = document.getElementById("partInfoCriteria");
  const statusEl = document.getElementById("partInfoStatus");
  const priorityBadge = document.getElementById("partInfoPriorityBadge");
  const closeBtn = document.getElementById("partInfoCloseBtn");

  if (img) {
    img.src = sanitize(seq.imageUrl || "./placeholder.png");
    img.alt = sanitize(seq.partName);
  }
  if (name) name.textContent = sanitize(seq.partName);
  if (desc)
    desc.textContent = sanitize(
      seq.description ||
        `Inspect ${seq.partName} for fit, finish, and defects.`,
    );
  if (criteria)
    criteria.textContent = sanitize(
      seq.qualityCriteria || "Standard visual inspection",
    );
  if (statusEl)
    statusEl.textContent = seq.completed ? "✓ Completed" : "Pending inspection";
  if (priorityBadge) {
    if (seq.isPriority) {
      priorityBadge.classList.remove("hidden");
    } else {
      priorityBadge.classList.add("hidden");
    }
  }

  overlay.classList.remove("hidden");

  const close = () => overlay.classList.add("hidden");
  if (closeBtn) closeBtn.onclick = close;
  overlay.onclick = (e) => {
    if (e.target === overlay) close();
  };
}

/**
 * Show Part Details Screen (Screen 2)
 */
function showPartDetailsScreen(sequences, partIndex) {
  const screen = document.getElementById("partDetailsScreen");
  if (!screen) return;

  const seq = sequences[partIndex];
  if (!seq) return;

  inspectionWorkflow.currentPartIndex = partIndex;

  // Cache DOM elements to avoid repeated queries
  const count = document.getElementById("partDetailsCount");
  const img = document.getElementById("partDetailsImage");
  const partName = document.getElementById("partDetailsPartName");
  const partId = document.getElementById("partDetailsPartId");
  const description = document.getElementById("partDetailsDescription");
  const criteria = document.getElementById("partDetailsQualityCriteria");
  const checkType = document.getElementById("partDetailsCheckType");
  const partsScreen = document.getElementById("partsListScreen");
  const editorScreen = document.getElementById("imageEditorScreen");

  // Update content in batch using requestAnimationFrame
  requestAnimationFrame(() => {
    if (count) count.textContent = `${partIndex + 1} of ${sequences.length}`;
    if (img) {
      img.src = seq.imageUrl || "./placeholder.png";
      img.alt = `Reference for ${sanitize(seq.partName)}`;
      img.loading = "lazy";
      img.onerror = () => {
        img.style.opacity = "0.3";
      };
    }

    // Title above image — style it clearly
    if (partName) {
      partName.textContent = sanitize(seq.partName);
      partName.style.color = "#ffffff";
      partName.style.fontSize = "1.3rem";
      partName.style.fontWeight = "800";
      partName.style.margin = "0";
    }

    // Part ID
    if (partId) {
      partId.textContent = sanitize(seq.sequenceId || "—");
      partId.style.color = "#ffffff";
      partId.style.fontWeight = "600";
    }

    // Description
    if (description) {
      description.textContent = sanitize(seq.description || "—");
      description.style.color = "#ffffff";
      description.style.fontWeight = "500";
      description.style.lineHeight = "1.5";
    }

    // Quality Criteria
    if (criteria) {
      criteria.textContent = sanitize(
        seq.qualityCriteria || "Standard visual inspection",
      );
      criteria.style.color = "#ffffff";
      criteria.style.fontWeight = "500";
    }

    // Check Type badge
    if (checkType) {
      checkType.textContent = seq.isPriority
        ? "⚠ Priority Check"
        : "✓ Standard Check";
      checkType.style.color = seq.isPriority ? "#fca5a5" : "#86efac";
      checkType.style.background = seq.isPriority
        ? "rgba(220,38,38,0.2)"
        : "rgba(34,197,94,0.15)";
      checkType.style.border = seq.isPriority
        ? "1px solid rgba(220,38,38,0.4)"
        : "1px solid rgba(34,197,94,0.3)";
      checkType.style.borderRadius = "20px";
      checkType.style.padding = "3px 10px";
      checkType.style.fontSize = "0.75rem";
      checkType.style.fontWeight = "700";
    }

    // Style DT labels
    const dts = screen.querySelectorAll(".part-details-list dt");
    dts.forEach((dt) => {
      dt.style.color = "rgba(100,168,255,0.85)";
      dt.style.fontSize = "0.72rem";
      dt.style.fontWeight = "700";
      dt.style.textTransform = "uppercase";
      dt.style.letterSpacing = "0.8px";
      dt.style.marginTop = "10px";
    });

    // Show screen
    screen.classList.remove("hidden");
    if (partsScreen) partsScreen.classList.add("hidden");
    if (editorScreen) editorScreen.classList.add("hidden");
  });

  // Wire up buttons
  let isProcessing = false;
  const markDefectsBtn = document.getElementById("startDefectMarkingBtn");
  const skipBtn = document.getElementById("skipDefectMarkingBtn");
  const backBtn = document.getElementById("partDetailsBackBtn");

  if (markDefectsBtn) {
    markDefectsBtn.onclick = () => {
      if (isProcessing) return;
      isProcessing = true;
      requestAnimationFrame(() => {
        showImageEditorScreen(seq, partIndex, "partDetails");
        isProcessing = false;
      });
    };
  }

  if (skipBtn) {
    skipBtn.onclick = () => {
      if (isProcessing) return;
      // Show warning that inspection is being skipped
      showMissedInspectionWarning(seq.partName);
      isProcessing = true;
      recordPartResult(seq, partIndex, false);
      setTimeout(() => {
        moveToNextPart(sequences, partIndex);
        isProcessing = false;
      }, 500);
    };
  }

  if (backBtn) {
    backBtn.onclick = () => {
      if (isProcessing) return;
      isProcessing = true;
      requestAnimationFrame(() => {
        showPartsListScreen(sequences);
      });
    };
  }

  // Zoom button — open lightbox
  const zoomBtn = document.getElementById("partDetailsImageZoom");
  if (zoomBtn) {
    const openDetailsLightbox = () => {
      const src = document.getElementById("partDetailsImage")?.src;
      if (!src) return;
      openFocusLightbox(src, `Enlarged: ${sanitize(seq.partName)}`);
    };

    zoomBtn.onclick = openDetailsLightbox;
    zoomBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        openDetailsLightbox();
      },
      { passive: false },
    );
  }
}

/**
 * Show Image Editor / Defect Marking Screen (Screen 3)
 */
function showImageEditorScreen(seq, partIndex, origin) {
  const screen = document.getElementById("imageEditorScreen");
  if (!screen) return;

  // Cache button elements
  const backBtn = document.getElementById("imageEditorBackBtn");
  const markBadBtn = document.getElementById("saveDefectMarkBtn");
  const clearBtn = document.getElementById("clearCanvasBtn");
  const cancelBtn = document.getElementById("cancelMarkingBtn");
  const title = screen.querySelector("h2");

  // Update header and show screen
  requestAnimationFrame(() => {
    screen.classList.remove("hidden");
  });

  // Initialize canvas
  initializeDefectCanvas(seq);

  // Prevent duplicate event listeners by using a single click handler
  let isProcessing = false;

  if (backBtn) {
    backBtn.onclick = () => {
      if (isProcessing) return;
      isProcessing = true;
      requestAnimationFrame(() => {
        screen.classList.add("hidden");
        if (origin === "partsList") {
          showPartsListScreen(inspectionWorkflow.currentSequences);
        } else {
          showPartDetailsScreen(inspectionWorkflow.currentSequences, partIndex);
        }
        isProcessing = false;
      });
    };
  }

  if (markBadBtn) {
    markBadBtn.onclick = () => {
      if (isProcessing) return;
      
      // Show quick defect form before saving
      const defectForm = document.createElement("div");
      defectForm.id = "quickDefectForm";
      defectForm.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(10, 17, 40, 0.98);
        border: 2px solid rgba(220, 38, 38, 0.6);
        border-radius: 12px;
        padding: 20px;
        z-index: 9999;
        max-width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      `;
      
      // Get past defect trends for this part
      const trends = extractDefectTrendsForPart(seq.partName);
      const metadata = DEFECT_METADATA[seq.partName] || {
        operationCodes: [],
        operationLabels: [],
        errorCodes: [],
        localisations: [],
        familyNatures: [],
      };

      // Helper to create select with options
      const buildSelectOptions = (field, trendValues, metaValues) => {
        let html = '<option value="">— Select —</option>';
        const seen = new Set();
        
        trendValues.forEach((val) => {
          if (val && !seen.has(val)) {
            html += `<option value="${sanitize(val)}">${sanitize(val)} ★</option>`;
            seen.add(val);
          }
        });
        
        metaValues.forEach((val) => {
          if (val && !seen.has(val)) {
            html += `<option value="${sanitize(val)}">${sanitize(val)}</option>`;
            seen.add(val);
          }
        });
        
        return html;
      };

      defectForm.innerHTML = `
        <style>
          #quickDefectForm h3 {
            color: #ffffff;
            margin-top: 0;
            margin-bottom: 16px;
            font-size: 1.1rem;
          }
          #quickDefectForm .qf-fields {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
          }
          #quickDefectForm .qf-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          #quickDefectForm .qf-field label {
            font-size: 0.75rem;
            font-weight: 700;
            color: rgba(220, 38, 38, 0.9);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
          #quickDefectForm .qf-field select {
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 6px;
            color: #ffffff;
            font-size: 0.85rem;
            padding: 8px 10px;
            outline: none;
          }
          #quickDefectForm .qf-field select:focus {
            border-color: rgba(220, 38, 38, 0.6);
            background-color: rgba(255, 255, 255, 0.1);
          }
          #quickDefectForm .qf-field select option {
            background: #1a2550;
            color: #ffffff;
          }
          #quickDefectForm .qf-buttons {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
          }
          #quickDefectForm button {
            padding: 10px 16px;
            border: none;
            border-radius: 6px;
            font-weight: 700;
            cursor: pointer;
            font-size: 0.9rem;
          }
          #quickDefectForm .qf-save {
            background: rgba(34, 197, 94, 0.8);
            color: #ffffff;
          }
          #quickDefectForm .qf-cancel {
            background: rgba(100, 100, 100, 0.6);
            color: #ffffff;
          }
        </style>
        <h3>📋 Record Defect Details for ${sanitize(seq.partName)}</h3>
        <div class="qf-fields">
          <div class="qf-field">
            <label>Operation Code ${trends.operationCodes.length > 0 ? '(trending)' : ''}</label>
            <select id="qf-operationCode">
              ${buildSelectOptions('operationCode', trends.operationCodes, metadata.operationCodes)}
            </select>
          </div>
          <div class="qf-field">
            <label>Error Code ${trends.errorCodes.length > 0 ? '(trending)' : ''}</label>
            <select id="qf-errorCode">
              ${buildSelectOptions('errorCode', trends.errorCodes, metadata.errorCodes)}
            </select>
          </div>
        </div>
        <div class="qf-buttons">
          <button class="qf-cancel">Cancel</button>
          <button class="qf-save">✓ Save Defect</button>
        </div>
      `;
      
      document.body.appendChild(defectForm);
      
      // Wire up buttons
      const saveBtn = defectForm.querySelector(".qf-save");
      const cancelBtn = defectForm.querySelector(".qf-cancel");
      
      saveBtn.onclick = () => {
        isProcessing = true;
        
        // Collect defect details
        const defectDetails = {
          operationCode: document.getElementById("qf-operationCode").value,
          errorCode: document.getElementById("qf-errorCode").value,
        };
        
        // Remove form and save
        document.body.removeChild(defectForm);
        const imageData = getCanvasImageData();
        recordPartResult(seq, partIndex, true, imageData, defectDetails);
        moveToNextPart(inspectionWorkflow.currentSequences, partIndex);
      };
      
      cancelBtn.onclick = () => {
        document.body.removeChild(defectForm);
        isProcessing = false;
      };
    };
  }

  if (clearBtn) {
    clearBtn.onclick = clearDefectCanvas;
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      if (isProcessing) return;
      isProcessing = true;
      requestAnimationFrame(() => {
        screen.classList.add("hidden");
        if (origin === "partsList") {
          showPartsListScreen(inspectionWorkflow.currentSequences);
        } else {
          showPartDetailsScreen(inspectionWorkflow.currentSequences, partIndex);
        }
        isProcessing = false;
      });
    };
  }
}

/**
 * Initialize drawing canvas for defect marking
 */
function initializeDefectCanvas(seq) {
  const canvas = document.getElementById("defectCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Load image onto canvas
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    // Store base image for clear/reset
    canvas._baseImage = img;
  };
  img.onerror = () => {
    // Draw a placeholder if image fails to load
    canvas.width = 800;
    canvas.height = 450;
    ctx.fillStyle = "rgba(15,27,64,0.9)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(100,168,255,0.5)";
    ctx.font = "bold 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Image not available", canvas.width / 2, canvas.height / 2);
  };
  img.src = seq.imageUrl || "./placeholder.png";

  // Setup drawing tools
  setupDrawingTools(canvas);
}

/**
 * Setup drawing tools on canvas (pen, circle, arrow)
 */
function setupDrawingTools(canvas) {
  const ctx = canvas.getContext("2d");
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let startX = 0;
  let startY = 0;
  let dragSnapshot = null; // canvas image captured at drag-start, used to preview shapes while dragging
  let drawHistory = [];

  const penColorInput = document.getElementById("penColorPicker");
  const penSizeInput = document.getElementById("penSizeSlider");
  const penSizeValue = document.getElementById("penSizeValue");
  const drawToolBtn = document.getElementById("drawToolBtn");
  const rectToolBtn = document.getElementById("rectToolBtn");
  const squareToolBtn = document.getElementById("squareToolBtn");
  const circleToolBtn = document.getElementById("circleToolBtn");
  const undoBtn = document.getElementById("undoDrawBtn");
  const toolStatus = document.getElementById("imageEditorToolStatus");

  let currentTool = "draw";
  let currentColor = "#ff0000";
  let currentSize = 4;

  // Update pen size display
  penSizeInput?.addEventListener("input", (e) => {
    currentSize = parseInt(e.target.value);
    if (penSizeValue) penSizeValue.textContent = `${currentSize}px`;
  });

  // Color picker
  penColorInput?.addEventListener("input", (e) => {
    currentColor = e.target.value;
  });

  const setTool = (tool, label, activeBtn) => {
    currentTool = tool;
    updateToolButtons(
      activeBtn,
      ...[drawToolBtn, rectToolBtn, squareToolBtn, circleToolBtn].filter(
        (btn) => btn !== activeBtn,
      ),
    );
    if (toolStatus) toolStatus.textContent = `Drawing: ${label}`;
  };

  // Draw tool active by default
  drawToolBtn?.classList.add("active");
  drawToolBtn?.addEventListener("click", () => setTool("draw", "Pen", drawToolBtn));
  rectToolBtn?.addEventListener("click", () =>
    setTool("rectangle", "Rectangle", rectToolBtn),
  );
  squareToolBtn?.addEventListener("click", () =>
    setTool("square", "Square", squareToolBtn),
  );
  circleToolBtn?.addEventListener("click", () =>
    setTool("circle", "Circle", circleToolBtn),
  );

  // Undo
  undoBtn?.addEventListener("click", () => {
    if (drawHistory.length > 0) {
      drawHistory.pop();
      redrawCanvas(canvas, ctx, drawHistory);
    }
  });

  // Canvas drawing
  // Prevent page scroll while drawing on canvas
  canvas.style.touchAction = "none";

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - rect.left) * (canvas.width / rect.width),
      y: (src.clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function drawShapePreview(x0, y0, x1, y1) {
    let width = x1 - x0;
    let height = y1 - y0;
    if (currentTool === "square") {
      const side = Math.max(Math.abs(width), Math.abs(height));
      width = width < 0 ? -side : side;
      height = height < 0 ? -side : side;
    }
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentSize;
    if (currentTool === "circle") {
      const radiusX = Math.abs(width) / 2;
      const radiusY = Math.abs(height) / 2;
      const centerX = x0 + width / 2;
      const centerY = y0 + height / 2;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    ctx.strokeRect(x0, y0, width, height);
  }

  function restoreSnapshot() {
    if (!dragSnapshot) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dragSnapshot, 0, 0);
  }

  function startDraw(e) {
    e.preventDefault();
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
    startX = pos.x;
    startY = pos.y;

    if (currentTool !== "draw") {
      const snap = new Image();
      snap.src = canvas.toDataURL();
      dragSnapshot = snap;
    }
  }

  function draw(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);

    if (currentTool === "draw") {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
      return;
    }

    // Rectangle / Square: redraw the pre-drag snapshot then preview the live shape
    restoreSnapshot();
    drawShapePreview(startX, startY, pos.x, pos.y);
  }

  function endDraw(e) {
    if (isDrawing) {
      isDrawing = false;
      dragSnapshot = null;
      drawHistory.push(canvas.toDataURL());
    }
  }

  // Mouse events
  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", endDraw);
  canvas.addEventListener("mouseleave", () => {
    isDrawing = false;
  });

  // Touch events
  canvas.addEventListener("touchstart", startDraw, { passive: false });
  canvas.addEventListener("touchmove", draw, { passive: false });
  canvas.addEventListener("touchend", endDraw, { passive: false });
}

/**
 * Update active tool button appearance
 */
function updateToolButtons(active, ...inactive) {
  active?.classList.add("active");
  inactive.forEach((btn) => btn?.classList.remove("active"));
}

/**
 * Clear defect canvas — erases all marks and restores the original base image
 */
function clearDefectCanvas() {
  const canvas = document.getElementById("defectCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (canvas._baseImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvas._baseImage, 0, 0);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/**
 * Get canvas drawing as image data
 */
function getCanvasImageData() {
  const canvas = document.getElementById("defectCanvas");
  return canvas ? canvas.toDataURL("image/png") : null;
}

/**
 * Redraw canvas from history
 */
function redrawCanvas(canvas, ctx, history) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (history.length === 0) {
    // No marks left — restore the original base image
    if (canvas._baseImage) ctx.drawImage(canvas._baseImage, 0, 0);
    return;
  }
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
  img.src = history[history.length - 1];
}

/**
 * Record part inspection result
 */
/**
 * Extract defect trends from past inspections for a specific part
 * Returns the most common operation codes, error codes, localisations, and family/nature values
 */
function extractDefectTrendsForPart(partName) {
  if (!state.inspections) {
    return {
      operationCodes: [],
      operationLabels: [],
      errorCodes: [],
      localisations: [],
      familyNatures: [],
    };
  }

  // Filter inspections for this part that had defects
  const defectRecords = state.inspections.filter(
    (item) => item.partName === partName && item.resultBad && item.defectDetails,
  );

  if (defectRecords.length === 0) {
    return {
      operationCodes: [],
      operationLabels: [],
      errorCodes: [],
      localisations: [],
      familyNatures: [],
    };
  }

  // Collect all values and count frequencies
  const collect = (field) => {
    const counts = {};
    defectRecords.forEach((rec) => {
      const value = rec.defectDetails[field];
      if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });
    // Return sorted by frequency (descending)
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0]);
  };

  return {
    operationCodes: collect("operationCode"),
    operationLabels: collect("operationLabel"),
    errorCodes: collect("errorCode"),
    localisations: collect("localisation"),
    familyNatures: collect("familyNature"),
  };
}

function recordPartResult(seq, partIndex, hasDefects, imageData = null, defectDetails = null) {
  // Update the sequence object so parts list reflects the result
  seq.completed = true;
  seq.resultGood = !hasDefects;
  seq.resultBad = hasDefects;

  // Store result
  const result = {
    partName: seq.partName,
    sequenceId: seq.sequenceId,
    vehicleModel: seq.vehicleModel || "",
    stationId: seq.stationId || "",
    inspectionBarcode:
      document.getElementById("mobileVinInput")?.value?.trim() ||
      document.getElementById("inspectionVin")?.value?.trim() ||
      "",
    partIndex: partIndex,
    resultGood: !hasDefects,
    resultBad: hasDefects,
    defectImage: imageData,
    defectDetails: defectDetails || {}, // Store defect metadata
    timestamp: Date.now(),
  };

  // Save to state
  if (!state.inspections) state.inspections = [];
  const existingIndex = state.inspections.findIndex(
    (item) => item.partIndex === partIndex,
  );
  if (existingIndex >= 0) {
    state.inspections[existingIndex] = result;
  } else {
    state.inspections.push(result);
  }
  localStorage.setItem(
    STORAGE_KEYS.inspections,
    JSON.stringify(state.inspections),
  );

  // Show toast with defect summary
  if (hasDefects) {
    let message = "⚠️ Marked as BAD";
    if (defectDetails) {
      const code = defectDetails.errorCode || "";
      const nature = defectDetails.familyNature || "";
      if (code || nature) {
        const details = [code, nature].filter(Boolean).slice(0, 2).join(" · ");
        message = `⚠️ ${seq.partName}: ${details}`;
      }
    }
    showUndoToast(message, () => {
      state.inspections.pop();
      localStorage.setItem(
        STORAGE_KEYS.inspections,
        JSON.stringify(state.inspections),
      );
    });
  } else {
    showUndoToast("✓ Marked as GOOD", () => {
      state.inspections.pop();
      localStorage.setItem(
        STORAGE_KEYS.inspections,
        JSON.stringify(state.inspections),
      );
    });
  }
}

/**
 * Move to next part in sequence
 */
function moveToNextPart(sequences, currentIndex) {
  const nextIndex = currentIndex + 1;

  if (nextIndex < sequences.length) {
    // Show next part details
    setTimeout(() => {
      showPartDetailsScreen(sequences, nextIndex);
    }, 500);
  } else {
    // Inspection complete
    completeInspectionWorkflow();
  }
}

/**
 * Complete the inspection workflow and show summary
 */
function completeInspectionWorkflow() {
  // Hide editor screen
  document.getElementById("imageEditorScreen")?.classList.add("hidden");
  document.getElementById("partDetailsScreen")?.classList.add("hidden");
  document.getElementById("partsListScreen")?.classList.add("hidden");

  // Show summary screen
  showInspectionSummary();
}

/**
 * Show Inspection Summary & Submit Screen (Screen 4)
 */
function showInspectionSummary() {
  const screen = document.getElementById("inspectionSummaryScreen");
  if (!screen) return;

  const sequences = inspectionWorkflow.currentSequences;
  if (!sequences || sequences.length === 0) return;

  // Count results
  let goodCount = 0;
  let badCount = 0;

  // Build results list HTML
  let resultsHtml = "";
  sequences.forEach((seq, index) => {
    const inspection = state.inspections?.find(
      (insp) => insp.partIndex === index,
    );

    let isGood = false;
    if (inspection) {
      isGood = inspection.resultGood && !inspection.resultBad;
      if (isGood) goodCount++;
      if (inspection.resultBad) badCount++;
    } else {
      // Not yet inspected - shouldn't happen at summary
    }

    const badgeClass = isGood ? "" : "bad";
    const badgeText = isGood ? "✓ OK" : "⚠️ Defect";

    resultsHtml += `
      <div class="summary-result-item">
        <span class="summary-result-item-name">${index + 1}. ${sanitize(seq.partName)}</span>
        <span class="summary-result-item-badge ${badgeClass}">${badgeText}</span>
      </div>
    `;
  });

  // Update stats
  const totalCount = sequences.length;
  document.getElementById("goodCount").textContent = goodCount;
  document.getElementById("badCount").textContent = badCount;
  document.getElementById("totalCount").textContent = totalCount;

  // Update results list
  document.getElementById("summaryResultsList").innerHTML = resultsHtml;

  // Update status badge
  const statusBadge = document.getElementById("summaryStatus");
  if (statusBadge) {
    if (badCount === 0) {
      statusBadge.textContent = "All Clear";
      statusBadge.style.background =
        "linear-gradient(135deg, rgba(30, 138, 69, 0.3) 0%, rgba(74, 222, 128, 0.2) 100%)";
      statusBadge.style.borderColor = "rgba(74, 222, 128, 0.5)";
      statusBadge.style.color = "#4ade80";
    } else {
      statusBadge.textContent = "Issues Found";
      statusBadge.style.background =
        "linear-gradient(135deg, rgba(212, 107, 0, 0.3) 0%, rgba(251, 146, 60, 0.2) 100%)";
      statusBadge.style.borderColor = "rgba(251, 146, 60, 0.5)";
      statusBadge.style.color = "#fb923c";
    }
  }

  // Show screen
  screen.classList.remove("hidden");

  // Wire up buttons
  const submitBtn = document.getElementById("submitInspectionWorkflowBtn");
  const editBtn = document.getElementById("editInspectionBtn");
  const backBtn = document.getElementById("summaryBackBtn");

  if (submitBtn) {
    submitBtn.onclick = () => submitInspectionWorkflow();
  }

  if (editBtn) {
    editBtn.onclick = () => {
      screen.classList.add("hidden");
      showPartsListScreen(sequences);
    };
  }

  if (backBtn) {
    backBtn.onclick = () => {
      screen.classList.add("hidden");
      showPartsListScreen(sequences);
    };
  }
}

/**
 * Submit the inspection workflow and finalize
 */
function submitInspectionWorkflow() {
  const screen = document.getElementById("inspectionSummaryScreen");

  // Mark inspection as submitted in state
  const inspection = {
    vin: document.getElementById("inspectionVin")?.value || "Unknown",
    stationId:
      document.getElementById("inspectionStationId")?.value || "Unknown",
    sequenceId:
      document.getElementById("inspectionSequenceName")?.value || "sequence-1",
    inspectionStatus: "Submitted",
    submittedAt: Date.now(),
    totalPartsInspected: inspectionWorkflow.currentSequences.length,
    resultsSummary: {
      totalGood: parseInt(
        document.getElementById("goodCount")?.textContent || 0,
      ),
      totalBad: parseInt(document.getElementById("badCount")?.textContent || 0),
    },
  };

  // Save to state
  if (!state.submittedInspections) state.submittedInspections = [];
  state.submittedInspections.push(inspection);
  localStorage.setItem(
    STORAGE_KEYS.inspections,
    JSON.stringify(state.submittedInspections),
  );

  // Hide screen
  if (screen) {
    screen.classList.add("hidden");
  }

  // Reset workflow
  inspectionWorkflow.isActive = false;

  // Show success notification
  showUndoToast("✅ Inspection Submitted Successfully!", null, 3000);

  // Return to barcode entry page after 1.5 seconds
  setTimeout(() => {
    showMobileInspectionEntry();
  }, 1500);
}
const DEMO_PARTS = [
  "Left Door Handle",
  "Right Door Trim",
  "Front Bumper",
  "Right Front Fender",
  "Hood Panel",
  "Rear Bumper",
  "Rear Spoiler",
  "Right Tail Lamp",
  "Windshield Frame",
  "Side Mirror Mount",
  "Door Hinge Bracket",
  "Roof Rail",
  "Tailgate Seal",
];
const DEMO_STATIONS = ["ST-001", "ST-002", "ST-003"];
const DEMO_MODELS = ["B SUV", "C SUV", "D SUV", "SEDAN", "HATCHBACK"];
const DEMO_REGIONS = ["IAP", "MEA", "NA", "EE"];
const DEMO_PLANTS = ["Tiruvallur", "SVAP", "SHAP", "CAEN"];
const BUILTIN_REFERENCE_IMAGE_META = {
  "left door handle": {
    title: "Left Door Handle",
    accent: "#234789",
    detail: "Scratch edge reference",
  },
  "right door trim": {
    title: "Right Door Trim",
    accent: "#2c4fbf",
    detail: "Surface finish reference",
  },
  "front bumper": {
    title: "Front Bumper",
    accent: "#0f766e",
    detail: "Gap alignment reference",
  },
  "hood panel": {
    title: "Hood Panel",
    accent: "#92400e",
    detail: "Paint finish reference",
  },
  "right front fender": {
    title: "Right Front Fender",
    accent: "#166534",
    detail: "Panel gap and paint reference",
  },
  "rear spoiler": {
    title: "Rear Spoiler",
    accent: "#0f766e",
    detail: "Alignment and finish reference",
  },
  "right tail lamp": {
    title: "Right Tail Lamp",
    accent: "#be123c",
    detail: "Fitment and seal reference",
  },
  "rear bumper": {
    title: "Rear Bumper",
    accent: "#7c3aed",
    detail: "Clip lock reference",
  },
  "windshield frame": {
    title: "Windshield Frame",
    accent: "#be123c",
    detail: "Seal line reference",
  },
  "side mirror mount": {
    title: "Side Mirror Mount",
    accent: "#0369a1",
    detail: "Bracket fitment reference",
  },
  "door hinge bracket": {
    title: "Door Hinge Bracket",
    accent: "#4f46e5",
    detail: "Fastener position reference",
  },
  "roof rail": {
    title: "Roof Rail",
    accent: "#166534",
    detail: "Contour reference",
  },
  "tailgate seal": {
    title: "Tailgate Seal",
    accent: "#9a3412",
    detail: "Seal seating reference",
  },
};

function svgToDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildBuiltinReferenceImage(partName, sequenceId) {
  const meta = BUILTIN_REFERENCE_IMAGE_META[normalizeName(partName)];
  if (!meta) {
    return "";
  }

  if (normalizeName(partName) === "left door handle") {
    const leftDoorHandleSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
        <defs>
          <linearGradient id="factoryBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#d2dee8" />
            <stop offset="40%" stop-color="#c5d4e2" />
            <stop offset="100%" stop-color="#b9cadb" />
          </linearGradient>
          <linearGradient id="windowGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#30435d" />
            <stop offset="100%" stop-color="#111a2a" />
          </linearGradient>
          <linearGradient id="bodyPaint" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="100%" stop-color="#e8edf3" />
          </linearGradient>
          <linearGradient id="mirrorShell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0f1420" />
            <stop offset="100%" stop-color="#2a3447" />
          </linearGradient>
        </defs>
        <rect width="960" height="540" fill="url(#factoryBg)" />
        <g opacity="0.35" fill="#8fa3b8">
          <rect x="54" y="92" width="110" height="72" rx="6" />
          <rect x="754" y="100" width="82" height="208" rx="4" />
          <rect x="848" y="96" width="54" height="226" rx="4" />
        </g>
        <rect x="0" y="500" width="960" height="40" fill="#0b162c" />
        <path d="M22 490 L78 490 L110 194 L640 194 L732 264 L936 276 L936 500 L22 500 Z" fill="url(#bodyPaint)" stroke="#ced6e0" stroke-width="4" />
        <path d="M114 202 L620 202 L700 266 L502 266 L318 226 L160 218 Z" fill="url(#windowGlass)" stroke="#131b2b" stroke-width="4" />
        <path d="M500 206 L614 206 L686 262 L548 262 Z" fill="#23344d" stroke="#0e1626" stroke-width="3" />
        <path d="M324 226 L498 266" stroke="#0d1626" stroke-width="5" opacity="0.9" />
        <path d="M318 226 L160 218" stroke="#0d1626" stroke-width="5" opacity="0.9" />
        <path d="M194 274 L194 500" stroke="#bcc6d3" stroke-width="4" />
        <path d="M684 264 L684 500" stroke="#c6cfda" stroke-width="4" />
        <path d="M156 374 C300 362 480 362 666 374" stroke="#dfe6ee" stroke-width="3" fill="none" />
        <rect x="568" y="352" width="96" height="30" rx="15" fill="#e6ebf2" stroke="#9aa7b6" stroke-width="3" />
        <rect x="576" y="360" width="62" height="12" rx="6" fill="#ced6e0" />
        <circle cx="652" cy="366" r="4" fill="#6c7683" />
        <g>
          <path d="M98 288 C82 256 96 222 136 204 C164 192 198 198 216 226 C232 252 224 286 194 302 C160 320 114 316 98 288 Z" fill="url(#mirrorShell)" />
          <path d="M116 274 C130 252 150 240 176 240 C192 240 206 246 216 260 C202 272 184 282 164 286 C144 292 128 288 116 274 Z" fill="#0d1524" />
          <rect x="136" y="278" width="58" height="11" rx="5" fill="#d7dde6" opacity="0.72" />
        </g>
        <path d="M6 492 L24 492" stroke="#111827" stroke-width="8" />
        <path d="M936 492 L956 492" stroke="#111827" stroke-width="8" />
      </svg>`;

    return svgToDataUrl(leftDoorHandleSvg.replace(/\s+/g, " ").trim());
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#eef4ff" />
          <stop offset="100%" stop-color="#dbe7ff" />
        </linearGradient>
      </defs>
      <rect width="960" height="540" fill="url(#bg)" />
      <rect x="48" y="48" width="864" height="444" rx="28" fill="#ffffff" stroke="${meta.accent}" stroke-width="8" />
      <rect x="88" y="104" width="280" height="280" rx="24" fill="${meta.accent}" opacity="0.12" />
      <path d="M138 288c28-74 94-116 182-116 63 0 118 22 166 70" fill="none" stroke="${meta.accent}" stroke-width="18" stroke-linecap="round" />
      <circle cx="218" cy="252" r="36" fill="${meta.accent}" opacity="0.85" />
      <circle cx="320" cy="214" r="18" fill="${meta.accent}" opacity="0.55" />
      <rect x="432" y="126" width="400" height="34" rx="10" fill="${meta.accent}" opacity="0.18" />
      <text x="432" y="212" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#0f1b40">${meta.title}</text>
      <text x="432" y="266" font-family="Segoe UI, Arial, sans-serif" font-size="24" fill="#334155">${meta.detail}</text>
      <text x="432" y="314" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#475569">${sequenceId || "Reference Image"}</text>
      <text x="88" y="450" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="#64748b">Prefilled demo image for simulation and walkthroughs</text>
    </svg>`;

  return svgToDataUrl(svg.replace(/\s+/g, " ").trim());
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function makeDemoInspection(minutesAgo) {
  const ts = new Date(Date.now() - minutesAgo * 60 * 1000);
  const partName = pickRandom(DEMO_PARTS);
  const isReservedRegularDemoPart = partName === "Hood Panel";
  const isGood = isReservedRegularDemoPart ? true : Math.random() < 0.78; // ~78% pass rate
  const isBad = isReservedRegularDemoPart
    ? false
    : !isGood || Math.random() < 0.08; // ~22% defect rate with occasional both-checked
  return {
    inspectionKey: `DEMO_${ts.getTime()}_${Math.random().toString(36).slice(2)}`,
    region: pickRandom(DEMO_REGIONS),
    plant: pickRandom(DEMO_PLANTS),
    area: pickRandom(AREA_OPTIONS),
    subArea: "Demo",
    stationId: pickRandom(DEMO_STATIONS),
    stationName: `Station ${pickRandom(DEMO_STATIONS)}`,
    vehicleModel: pickRandom(DEMO_MODELS),
    vin: `VIN${ts.getTime().toString().slice(-10)}`,
    sequenceId: `PART-${String(Math.ceil(Math.random() * 99)).padStart(3, "0")}`,
    sequenceName: `${partName} Check`,
    partName,
    imageName: `${partName.toLowerCase().replaceAll(" ", "-")}.jpg`,
    imagePreviewUrl: "",
    resultGood: isGood,
    resultBad: isBad,
    comments: "",
    inspectionStatus: "Demo",
    timestamp: ts.toISOString(),
    sequenceSourceStatus: "Demo",
    _isDemo: true,
  };
}

function seedDemoData() {
  // Remove stale demo records from previous sessions
  state.inspections = state.inspections.filter((r) => !r._isDemo);

  const guaranteedPriorityParts = [
    {
      sequenceId: "PART-001",
      sequenceName: "Left Door Handle Scratch Check",
      sequenceDescription:
        "Verify scratch depth and edge quality on left door handle.",
      partName: "Left Door Handle",
      imageName: "left-door-handle.jpg",
    },
    {
      sequenceId: "PART-002",
      sequenceName: "Right Door Trim Surface Check",
      sequenceDescription:
        "Inspect right door trim for dents and paint mismatch.",
      partName: "Right Door Trim",
      imageName: "right-door-trim.jpg",
    },
    {
      sequenceId: "PART-003",
      sequenceName: "Front Bumper Gap Alignment",
      sequenceDescription: "Check front bumper gap and clip locking condition.",
      partName: "Front Bumper",
      imageName: "front-bumper.jpg",
    },
    {
      sequenceId: "PART-005",
      sequenceName: "Right Front Fender Panel Check",
      sequenceDescription:
        "Check right front fender for panel gaps, paint consistency, and dents.",
      partName: "Right Front Fender",
      imageName: "right-front-fender.png",
    },
  ];

  // Seed ~35 records: 3 guaranteed priority defects + 4 additional records per model.
  const targetsPerModel = 7;

  for (const model of DEMO_MODELS) {
    for (let i = 0; i < targetsPerModel; i++) {
      const minsAgo = Math.floor(Math.random() * 420) + 1; // 1 – 420 min ago
      const ts = new Date(Date.now() - minsAgo * 60 * 1000);
      const forcedPriorityPart = guaranteedPriorityParts[i];
      const partName = forcedPriorityPart?.partName || pickRandom(DEMO_PARTS);
      const sequenceId =
        forcedPriorityPart?.sequenceId ||
        `PART-${String(Math.ceil(Math.random() * 99)).padStart(3, "0")}`;
      const sequenceName =
        forcedPriorityPart?.sequenceName || `${partName} Check`;
      const sequenceDescription = forcedPriorityPart?.sequenceDescription || "";
      const imageName =
        forcedPriorityPart?.imageName ||
        `${partName.toLowerCase().replaceAll(" ", "-")}.jpg`;
      const forceDefect = i < guaranteedPriorityParts.length;
      const isReservedRegularDemoPart = partName === "Hood Panel";
      const isGood = forceDefect
        ? false
        : isReservedRegularDemoPart
          ? true
          : Math.random() < 0.78;
      const isBad = forceDefect
        ? true
        : isReservedRegularDemoPart
          ? false
          : !isGood || Math.random() < 0.08;

      state.inspections.push({
        inspectionKey: `DEMO_${ts.getTime()}_${Math.random().toString(36).slice(2)}`,
        region: pickRandom(DEMO_REGIONS),
        plant: pickRandom(DEMO_PLANTS),
        area: pickRandom(AREA_OPTIONS),
        subArea: "Demo",
        stationId: pickRandom(DEMO_STATIONS),
        stationName: `Station ${pickRandom(DEMO_STATIONS)}`,
        vehicleModel: model,
        vin: `VIN${ts.getTime().toString().slice(-10)}`,
        sequenceId,
        sequenceName,
        sequenceDescription,
        partName,
        imageName,
        imagePreviewUrl: "",
        resultGood: isGood,
        resultBad: isBad,
        comments: "",
        inspectionStatus: "Demo",
        timestamp: ts.toISOString(),
        sequenceSourceStatus: "Demo",
        _isDemo: true,
      });
    }
  }
}

function tickDemoRecord() {
  // Add one fresh demo record every 5 s to simulate live activity
  const rec = makeDemoInspection(0);
  state.inspections.push(rec);
  refreshWidgetGrid();
  refreshReportGraphs();
}

function refreshWidgetGrid() {
  const widgetGrid = document.getElementById("homeWidgetGrid");
  if (widgetGrid && homePanel && !homePanel.classList.contains("hidden")) {
    widgetGrid.innerHTML = buildHomeWidgets();
  }
}

function startDemoSim() {
  stopDemoSim();
  seedDemoData();
  // Trickle a new record every 5 seconds
  demoSimTimer = setInterval(tickDemoRecord, 5000);
  // Refresh widget display every 3 seconds
  liveWidgetTimer = setInterval(refreshWidgetGrid, 3000);
}

function stopDemoSim() {
  if (demoSimTimer) {
    clearInterval(demoSimTimer);
    demoSimTimer = null;
  }
  if (liveWidgetTimer) {
    clearInterval(liveWidgetTimer);
    liveWidgetTimer = null;
  }
  // Clean up demo records on logout
  state.inspections = state.inspections.filter((r) => !r._isDemo);
}
// ────────────────────────────────────────────────────────────────────────────

function formatDashboardDateTime(value) {
  return value.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function updateDashboardDateTime() {
  if (!dateTimeText) {
    return;
  }

  dateTimeText.textContent = formatDashboardDateTime(new Date());
}

function loadList(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}

function loadObject(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "null");
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (_error) {
    return null;
  }
}

function saveState(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (err.name === "QuotaExceededError" || err.code === 22) {
      // Storage full — remove the oldest inspection records and retry once
      if (key === "aiqi_inspections") {
        const trimmed = Array.isArray(value) ? value.slice(-20) : value;
        try {
          localStorage.setItem(key, JSON.stringify(trimmed));
          const notice = document.getElementById("moduleNotice");
          if (notice) {
            notice.className = "notice success";
            notice.textContent =
              "Storage was full. Older records were trimmed. Inspection saved.";
            notice.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
          return;
        } catch (_) {
          // ignore second failure
        }
      }
      const notice = document.getElementById("moduleNotice");
      if (notice) {
        notice.className = "notice error";
        notice.textContent =
          "Storage is full. Please export and delete old inspection records to free up space.";
        notice.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
    console.error("saveState failed:", key, err);
  }
}

function csvEscape(value) {
  const text = String(value || "");
  if (/[,"\n\r]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function normalizeHeader(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function toRecordStatus(value) {
  return String(value || "").toLowerCase() === "draft" ? "Draft" : "Saved";
}

function buildCsv(columns, records) {
  const headerLine = columns
    .map((column) => csvEscape(column.header))
    .join(",");
  const lines = records.map((record) =>
    columns.map((column) => csvEscape(record[column.key] || "")).join(","),
  );
  return [headerLine, ...lines].join("\n");
}

function buildExcelHtmlTable(columns, records) {
  const header = columns
    .map((column) => `<th>${sanitize(column.header)}</th>`)
    .join("");
  const rows = records
    .map(
      (record) =>
        `<tr>${columns.map((column) => `<td>${sanitize(record[column.key] || "")}</td>`).join("")}</tr>`,
    )
    .join("");

  return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <table border="1">
      <thead><tr>${header}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </body>
</html>`;
}

function downloadBlobFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Unable to read selected file."));
    reader.readAsText(file);
  });
}

function parseDelimited(text, delimiter) {
  const rows = [];
  let row = [];
  let value = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === delimiter) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }
      row.push(value.trim());
      if (row.some((cell) => cell !== "")) {
        rows.push(row);
      }
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value.trim());
  if (row.some((cell) => cell !== "")) {
    rows.push(row);
  }

  return rows;
}

function parseTableRows(rawText) {
  const text = String(rawText || "").trim();
  if (!text) {
    return [];
  }

  if (/<table[\s>]/i.test(text)) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    return [...doc.querySelectorAll("tr")]
      .map((tr) =>
        [...tr.querySelectorAll("th,td")].map((cell) =>
          (cell.textContent || "").trim(),
        ),
      )
      .filter((row) => row.some((cell) => cell !== ""));
  }

  const firstLine = text.split(/\r?\n/).find((line) => line.trim()) || "";
  const commaCount = (firstLine.match(/,/g) || []).length;
  const tabCount = (firstLine.match(/\t/g) || []).length;
  const delimiter = tabCount > commaCount ? "\t" : ",";
  return parseDelimited(text, delimiter);
}

function rowsToRecords(rows, columns, keyField) {
  if (!rows.length) {
    return [];
  }

  const headerRow = rows[0];
  const normalizedHeaders = headerRow.map((header) => normalizeHeader(header));
  const lookup = new Map();
  normalizedHeaders.forEach((header, index) => {
    if (!lookup.has(header)) {
      lookup.set(header, index);
    }
  });

  const indices = {};
  columns.forEach((column) => {
    const names = [column.header, column.key, ...(column.aliases || [])].map(
      (name) => normalizeHeader(name),
    );
    const found = names.find((name) => lookup.has(name));
    indices[column.key] = found ? lookup.get(found) : -1;
  });

  return rows
    .slice(1)
    .map((row) => {
      const record = {};
      columns.forEach((column) => {
        const idx = indices[column.key];
        record[column.key] = idx >= 0 ? String(row[idx] || "").trim() : "";
      });
      record.recordStatus = toRecordStatus(record.recordStatus);
      return record;
    })
    .filter((record) => record[keyField]);
}

function upsertByKey(existing, incoming, keyField) {
  const map = new Map();
  existing.forEach((item) => {
    map.set(item[keyField], item);
  });
  incoming.forEach((item) => {
    map.set(item[keyField], {
      ...map.get(item[keyField]),
      ...item,
    });
  });
  return [...map.values()];
}

function normalizeImageStem(value) {
  return normalizeName(String(value || "").replace(/\.[^.]+$/, ""));
}

function normalizeReferenceToken(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "");
}

function buildReferenceImageKey(record) {
  return (
    normalizeReferenceToken(record.sequenceId) ||
    normalizeReferenceToken(record.partName) ||
    normalizeReferenceToken(record.imageName) ||
    normalizeImageStem(record.imageName)
  );
}

function upsertReferenceImages(existing, incoming) {
  const map = new Map();
  existing.forEach((item) => {
    const key = buildReferenceImageKey(item);
    if (key) {
      map.set(key, item);
    }
  });
  incoming.forEach((item) => {
    const key = buildReferenceImageKey(item);
    if (key) {
      map.set(key, {
        ...map.get(key),
        ...item,
      });
    }
  });
  return [...map.values()];
}

function matchesReferenceImage(item, imageName, partName, sequenceId) {
  const queryTokens = [sequenceId, partName, imageName]
    .map((value) => normalizeReferenceToken(value))
    .filter(Boolean);
  const recordTokens = [item.sequenceId, item.partName, item.imageName]
    .map((value) => normalizeReferenceToken(value))
    .filter(Boolean);

  return queryTokens.some((queryToken) =>
    recordTokens.some(
      (recordToken) =>
        recordToken === queryToken ||
        recordToken.includes(queryToken) ||
        queryToken.includes(recordToken),
    ),
  );
}

function isSvgPlaceholderPreview(url) {
  return String(url || "")
    .trim()
    .toLowerCase()
    .startsWith("data:image/svg+xml");
}

function resolveStoredImagePreview(imageName, partName = "", sequenceId = "") {
  if (!imageName && !partName && !sequenceId) {
    return "";
  }

  const referenceMatch = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        matchesReferenceImage(item, imageName, partName, sequenceId),
    );
  if (referenceMatch?.previewUrl) {
    return referenceMatch.previewUrl;
  }

  const sequenceMatch = state.stationSequences.find(
    (item) =>
      item.imagePreviewUrl &&
      !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
      matchesReferenceImage(item, imageName, partName, sequenceId),
  );
  if (sequenceMatch?.imagePreviewUrl) {
    return sequenceMatch.imagePreviewUrl;
  }

  const inspectionMatch = [...state.inspections]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        matchesReferenceImage(item, imageName, partName, sequenceId),
    );
  if (inspectionMatch?.imagePreviewUrl) {
    return inspectionMatch.imagePreviewUrl;
  }

  return "";
}

function isLeftDoorHandleToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "leftdoorhandle" ||
    token.includes("leftdoorhandle") ||
    token === "part001"
  );
}

function isRightDoorTrimToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "rightdoortrim" ||
    token.includes("rightdoortrim") ||
    token === "part002"
  );
}

function isFrontBumperToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "frontbumper" ||
    token.includes("frontbumper") ||
    token === "part003"
  );
}

function isHoodPanelToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "hoodpanel" || token.includes("hoodpanel") || token === "part004"
  );
}

function isRightFrontFenderToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "rightfrontfender" ||
    token.includes("rightfrontfender") ||
    token.includes("frontfender") ||
    token === "part005"
  );
}

function isRearBumperToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "rearbumper" ||
    token.includes("rearbumper") ||
    token === "part006"
  );
}

function isRearSpoilerToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "rearspoiler" ||
    token.includes("rearspoiler") ||
    token === "part007"
  );
}

function isRightTailLampToken(value) {
  const token = normalizeReferenceToken(value);
  return (
    token === "righttaillamp" ||
    token.includes("righttaillamp") ||
    token.includes("taillamp") ||
    token === "part008"
  );
}

function resolveLeftDoorImagePreview() {
  const referenceMatch = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isLeftDoorHandleToken(item.sequenceId) ||
          isLeftDoorHandleToken(item.partName) ||
          isLeftDoorHandleToken(item.imageName)),
    );
  if (referenceMatch?.previewUrl) {
    return referenceMatch.previewUrl;
  }

  const sequenceMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isLeftDoorHandleToken(item.sequenceId) ||
          isLeftDoorHandleToken(item.partName) ||
          isLeftDoorHandleToken(item.imageName)),
    );
  if (sequenceMatch?.imagePreviewUrl) {
    return sequenceMatch.imagePreviewUrl;
  }

  const inspectionMatch = [...state.inspections]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isLeftDoorHandleToken(item.sequenceId) ||
          isLeftDoorHandleToken(item.partName) ||
          isLeftDoorHandleToken(item.imageName)),
    );
  if (inspectionMatch?.imagePreviewUrl) {
    return inspectionMatch.imagePreviewUrl;
  }

  return LEFT_DOOR_HANDLE_PREVIEW_CANDIDATES[0] || "";
}

function resolveLeftDoorImagePreviewCandidates(preferred = "", imageName = "") {
  const candidates = [
    preferred,
    ...buildDownloadsImageCandidates(imageName),
    ...LEFT_DOOR_HANDLE_PREVIEW_CANDIDATES,
  ].filter(Boolean);
  return [...new Set(candidates)];
}

function resolveRightDoorTrimImagePreview() {
  const referenceMatch = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isRightDoorTrimToken(item.sequenceId) ||
          isRightDoorTrimToken(item.partName) ||
          isRightDoorTrimToken(item.imageName)),
    );
  if (referenceMatch?.previewUrl) {
    return referenceMatch.previewUrl;
  }

  const sequenceMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRightDoorTrimToken(item.sequenceId) ||
          isRightDoorTrimToken(item.partName) ||
          isRightDoorTrimToken(item.imageName)),
    );
  if (sequenceMatch?.imagePreviewUrl) {
    return sequenceMatch.imagePreviewUrl;
  }

  const inspectionMatch = [...state.inspections]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRightDoorTrimToken(item.sequenceId) ||
          isRightDoorTrimToken(item.partName) ||
          isRightDoorTrimToken(item.imageName)),
    );
  if (inspectionMatch?.imagePreviewUrl) {
    return inspectionMatch.imagePreviewUrl;
  }

  return RIGHT_DOOR_TRIM_PREVIEW_CANDIDATES[0] || "";
}

function resolveRightDoorTrimImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  const candidates = [
    preferred,
    ...buildDownloadsImageCandidates(imageName),
    ...RIGHT_DOOR_TRIM_PREVIEW_CANDIDATES,
  ].filter(Boolean);
  return [...new Set(candidates)];
}

function resolveFrontBumperImagePreview() {
  const referenceMatch = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isFrontBumperToken(item.sequenceId) ||
          isFrontBumperToken(item.partName) ||
          isFrontBumperToken(item.imageName)),
    );
  if (referenceMatch?.previewUrl) {
    return referenceMatch.previewUrl;
  }

  const sequenceMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isFrontBumperToken(item.sequenceId) ||
          isFrontBumperToken(item.partName) ||
          isFrontBumperToken(item.imageName)),
    );
  if (sequenceMatch?.imagePreviewUrl) {
    return sequenceMatch.imagePreviewUrl;
  }

  const inspectionMatch = [...state.inspections]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isFrontBumperToken(item.sequenceId) ||
          isFrontBumperToken(item.partName) ||
          isFrontBumperToken(item.imageName)),
    );
  if (inspectionMatch?.imagePreviewUrl) {
    return inspectionMatch.imagePreviewUrl;
  }

  return FRONT_BUMPER_PREVIEW_CANDIDATES[0] || "";
}

function resolveFrontBumperImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  const candidates = [
    preferred,
    ...buildDownloadsImageCandidates(imageName),
    ...FRONT_BUMPER_PREVIEW_CANDIDATES,
  ].filter(Boolean);
  return [...new Set(candidates)];
}

function resolveHoodPanelImagePreview() {
  const referenceMatch = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isHoodPanelToken(item.sequenceId) ||
          isHoodPanelToken(item.partName) ||
          isHoodPanelToken(item.imageName)),
    );
  if (referenceMatch?.previewUrl) {
    return referenceMatch.previewUrl;
  }

  const sequenceMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isHoodPanelToken(item.sequenceId) ||
          isHoodPanelToken(item.partName) ||
          isHoodPanelToken(item.imageName)),
    );
  if (sequenceMatch?.imagePreviewUrl) {
    return sequenceMatch.imagePreviewUrl;
  }

  const inspectionMatch = [...state.inspections]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isHoodPanelToken(item.sequenceId) ||
          isHoodPanelToken(item.partName) ||
          isHoodPanelToken(item.imageName)),
    );
  if (inspectionMatch?.imagePreviewUrl) {
    return inspectionMatch.imagePreviewUrl;
  }

  return HOOD_PANEL_PREVIEW_CANDIDATES[0] || "";
}

function resolveHoodPanelImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  const candidates = [
    preferred,
    ...buildDownloadsImageCandidates(imageName),
    ...HOOD_PANEL_PREVIEW_CANDIDATES,
  ].filter(Boolean);
  return [...new Set(candidates)];
}

function resolveRightFrontFenderImagePreview() {
  const match = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isRightFrontFenderToken(item.sequenceId) ||
          isRightFrontFenderToken(item.partName) ||
          isRightFrontFenderToken(item.imageName)),
    );
  if (match?.previewUrl) return match.previewUrl;
  const seqMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRightFrontFenderToken(item.sequenceId) ||
          isRightFrontFenderToken(item.partName) ||
          isRightFrontFenderToken(item.imageName)),
    );
  if (seqMatch?.imagePreviewUrl) return seqMatch.imagePreviewUrl;
  return RIGHT_FRONT_FENDER_PREVIEW_CANDIDATES[0] || "";
}

function resolveRightFrontFenderImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  return [
    ...new Set(
      [
        preferred,
        ...buildDownloadsImageCandidates(imageName),
        ...RIGHT_FRONT_FENDER_PREVIEW_CANDIDATES,
      ].filter(Boolean),
    ),
  ];
}

function resolveRearBumperImagePreview() {
  const match = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isRearBumperToken(item.sequenceId) ||
          isRearBumperToken(item.partName) ||
          isRearBumperToken(item.imageName)),
    );
  if (match?.previewUrl) return match.previewUrl;
  const seqMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRearBumperToken(item.sequenceId) ||
          isRearBumperToken(item.partName) ||
          isRearBumperToken(item.imageName)),
    );
  if (seqMatch?.imagePreviewUrl) return seqMatch.imagePreviewUrl;
  return REAR_BUMPER_PREVIEW_CANDIDATES[0] || "";
}

function resolveRearBumperImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  return [
    ...new Set(
      [
        preferred,
        ...buildDownloadsImageCandidates(imageName),
        ...REAR_BUMPER_PREVIEW_CANDIDATES,
      ].filter(Boolean),
    ),
  ];
}

function resolveRearSpoilerImagePreview() {
  const match = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isRearSpoilerToken(item.sequenceId) ||
          isRearSpoilerToken(item.partName) ||
          isRearSpoilerToken(item.imageName)),
    );
  if (match?.previewUrl) return match.previewUrl;
  const seqMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRearSpoilerToken(item.sequenceId) ||
          isRearSpoilerToken(item.partName) ||
          isRearSpoilerToken(item.imageName)),
    );
  if (seqMatch?.imagePreviewUrl) return seqMatch.imagePreviewUrl;
  return REAR_SPOILER_PREVIEW_CANDIDATES[0] || "";
}

function resolveRearSpoilerImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  return [
    ...new Set(
      [
        preferred,
        ...buildDownloadsImageCandidates(imageName),
        ...REAR_SPOILER_PREVIEW_CANDIDATES,
      ].filter(Boolean),
    ),
  ];
}

function resolveRightTailLampImagePreview() {
  const match = [...state.referenceImages]
    .reverse()
    .find(
      (item) =>
        item.previewUrl &&
        !isSvgPlaceholderPreview(item.previewUrl) &&
        (isRightTailLampToken(item.sequenceId) ||
          isRightTailLampToken(item.partName) ||
          isRightTailLampToken(item.imageName)),
    );
  if (match?.previewUrl) return match.previewUrl;
  const seqMatch = [...state.stationSequences]
    .reverse()
    .find(
      (item) =>
        item.imagePreviewUrl &&
        !isSvgPlaceholderPreview(item.imagePreviewUrl) &&
        (isRightTailLampToken(item.sequenceId) ||
          isRightTailLampToken(item.partName) ||
          isRightTailLampToken(item.imageName)),
    );
  if (seqMatch?.imagePreviewUrl) return seqMatch.imagePreviewUrl;
  return RIGHT_TAIL_LAMP_PREVIEW_CANDIDATES[0] || "";
}

function resolveRightTailLampImagePreviewCandidates(
  preferred = "",
  imageName = "",
) {
  return [
    ...new Set(
      [
        preferred,
        ...buildDownloadsImageCandidates(imageName),
        ...RIGHT_TAIL_LAMP_PREVIEW_CANDIDATES,
      ].filter(Boolean),
    ),
  ];
}

function sanitize(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function ensureFocusLightbox() {
  let overlay = document.getElementById("mobileFocusLightbox");
  let image = document.getElementById("mobileFocusLightboxImg");
  let closeBtn = document.getElementById("mobileFocusLightboxClose");

  if (overlay && image && closeBtn) {
    return { overlay, image, closeBtn };
  }

  overlay = document.createElement("div");
  overlay.id = "mobileFocusLightbox";
  overlay.className = "image-lightbox hidden";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <button id="mobileFocusLightboxClose" class="lightbox-close" aria-label="Close">&times;</button>
    <img id="mobileFocusLightboxImg" class="lightbox-img" alt="Enlarged image" />
  `;

  document.body.appendChild(overlay);

  image = document.getElementById("mobileFocusLightboxImg");
  closeBtn = document.getElementById("mobileFocusLightboxClose");

  const close = () => overlay.classList.add("hidden");
  closeBtn.onclick = (e) => {
    e.stopPropagation();
    close();
  };
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  return { overlay, image, closeBtn };
}

function openFocusLightbox(imageSrc, imageAlt) {
  if (!imageSrc) return;
  const { overlay, image } = ensureFocusLightbox();
  image.src = imageSrc;
  image.alt = imageAlt || "Enlarged image";
  overlay.classList.remove("hidden");
}

function normalizeName(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function toLocalDateTime(raw) {
  const date = new Date(raw);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function getDateFilteredReportRecords() {
  const fromTime = reportFilters.fromDate
    ? new Date(`${reportFilters.fromDate}T00:00:00`).getTime()
    : Number.NEGATIVE_INFINITY;
  const toTime = reportFilters.toDate
    ? new Date(`${reportFilters.toDate}T23:59:59.999`).getTime()
    : Number.POSITIVE_INFINITY;

  return state.inspections.filter((item) => {
    const timestamp = new Date(item.timestamp).getTime();
    return Number.isFinite(timestamp) && timestamp >= fromTime && timestamp <= toTime;
  });
}

function reportSummary(records = state.inspections) {
  const total = records.length;
  const pass = records.filter(
    (item) => item.result === "Pass" || item.resultGood,
  ).length;
  const fail = records.filter(
    (item) => item.result === "Fail" || item.result === "Bad" || item.resultBad,
  ).length;
  const review = records.filter(
    (item) => item.result === "Manual Review",
  ).length;
  const passRate = total ? ((pass / total) * 100).toFixed(1) : "0.0";

  return {
    total,
    pass,
    fail,
    review,
    passRate,
  };
}

function buildDefectTrendCharts(selectedModel = "", records = state.inspections) {
  const modelRecords = records.filter(
    (item) => !selectedModel || (item.vehicleModel || "") === selectedModel,
  );
  const badRecords = modelRecords.filter(
    (item) => item.resultBad || item.result === "Fail" || item.result === "Bad",
  );
  const partCounts = new Map();
  badRecords.forEach((item) => {
    const partName = item.partName || item.partDescription || "Unspecified part";
    partCounts.set(partName, (partCounts.get(partName) || 0) + 1);
  });

  const partTrends = [...partCounts.entries()].sort((left, right) => right[1] - left[1]);
  const maxPartDefects = Math.max(1, ...partTrends.map(([, count]) => count));
  const partBars = partTrends.length
    ? partTrends
        .map(
          ([partName, count]) => `
            <div class="report-bar-row">
              <span class="report-bar-label">${sanitize(partName)}</span>
              <div class="report-bar-track"><span class="report-bar-fill defect" style="width:${(count / maxPartDefects) * 100}%"></span></div>
              <strong>${count}</strong>
            </div>`,
        )
        .join("")
    : '<p class="muted report-empty">No defects recorded for this model.</p>';

  return `
    <div class="report-trend-grid single-chart">
      <section class="report-chart" aria-labelledby="defectsByPartTitle">
        <h4 id="defectsByPartTitle">Defects by Part</h4>
        <p class="muted">Ordered from the most frequently reported defect.</p>
        <div class="report-bars">${partBars}</div>
      </section>
    </div>`;
}

function buildTopFiveReportSummaries(records = state.inspections) {
  const badRecords = records.filter(
    (item) => item.resultBad || item.result === "Fail" || item.result === "Bad",
  );
  const countBy = (getLabel) => {
    const counts = new Map();
    badRecords.forEach((item) => {
      const label = getLabel(item);
      if (label) counts.set(label, (counts.get(label) || 0) + 1);
    });
    return [...counts.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .slice(0, 5);
  };

  const modelRanking = countBy((item) => item.vehicleModel || "Unknown model");
  const defectRanking = countBy((item) => {
    const details = item.defectDetails || {};
    if (details.familyNature) return details.familyNature;
    if (item.defectCategory) return item.defectCategory;
    if (details.errorCode) {
      return `${item.partName || "Part"} · Error ${details.errorCode}`;
    }
    return item.partName || item.partDescription || "Unspecified defect";
  });

  const renderRanking = (items, fillClass, emptyMessage) => {
    if (!items.length) return `<p class="muted report-empty">${emptyMessage}</p>`;
    const maximum = Math.max(1, ...items.map(([, count]) => count));
    return items
      .map(
        ([label, count], index) => `
          <div class="report-ranking-row">
            <span class="report-rank">${index + 1}</span>
            <span class="report-ranking-label">${sanitize(label)}</span>
            <div class="report-bar-track"><span class="report-bar-fill ${fillClass}" style="width:${(count / maximum) * 100}%"></span></div>
            <strong>${count}</strong>
          </div>`,
      )
      .join("");
  };

  return `
    <div class="report-ranking-grid">
      <section class="report-chart" aria-labelledby="topVehicleModelsTitle">
        <h4 id="topVehicleModelsTitle">Top 5 Vehicle Models with Highest Defects</h4>
        <p class="muted">Ranked by total failed part inspections.</p>
        <div class="report-bars">${renderRanking(modelRanking, "vehicle", "No vehicle-model defects recorded.")}</div>
      </section>
      <section class="report-chart" aria-labelledby="topDefectsTitle">
        <h4 id="topDefectsTitle">Top 5 Defects</h4>
        <p class="muted">Most frequently reported defect types.</p>
        <div class="report-bars">${renderRanking(defectRanking, "defect", "No defects recorded.")}</div>
      </section>
    </div>`;
}

function refreshReportGraphs() {
  if (activeModuleId !== "ai-report") return;
  const reportRecords = getDateFilteredReportRecords();
  const topFiveCharts = document.getElementById("reportTopFiveCharts");
  const modelFilter = document.getElementById("reportVehicleModel");
  const trendCharts = document.getElementById("reportTrendCharts");
  if (topFiveCharts) {
    topFiveCharts.innerHTML = buildTopFiveReportSummaries(reportRecords);
  }
  if (trendCharts) {
    trendCharts.innerHTML = buildDefectTrendCharts(
      modelFilter?.value || reportFilters.vehicleModel,
      reportRecords,
    );
  }
}

function mapQualiffDefectRecord(item) {
  return {
    Plant: item.plant || "",
    area: item.area || "",
    "sub area": item.subArea || "",
    station: item.stationId || "",
    "part id": item.partId || item.sequenceId || "",
    "part description": item.partDescription || item.partName || "",
    result: item.result || "Bad",
    comments: item.comments || "",
    "inspection time stamp": item.timestamp || "",
  };
}

function buildQualiffDefectPayload(records) {
  return {
    qualityDefectData: records.map((item) => mapQualiffDefectRecord(item)),
    totalDefects: records.length,
    source: "AI Quality Inspection App",
    sentAt: new Date().toISOString(),
  };
}

async function sendQualiffDefectData(records) {
  const endpoint = state.reportConfig?.qualiffEndpoint?.trim() || "";
  if (!endpoint) {
    return { skipped: true, reason: "endpoint-missing" };
  }

  if (!records.length) {
    return { skipped: true, reason: "no-records" };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildQualiffDefectPayload(records)),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return { skipped: false, sent: records.length };
}

function openModule(moduleId, notice) {
  const module = modules.find((item) => item.id === moduleId);
  if (!module) {
    return;
  }

  if (reportRefreshTimer) {
    clearInterval(reportRefreshTimer);
    reportRefreshTimer = null;
  }

  if (document.body.classList.contains("force-mobile-workflow")) {
    document
      .getElementById("mobileInspectionEntryScreen")
      ?.classList.add("hidden");
    document.getElementById("inspectionInitScreen")?.classList.add("hidden");
    document.getElementById("partsListScreen")?.classList.add("hidden");
    document.getElementById("partDetailsScreen")?.classList.add("hidden");
    document.getElementById("imageEditorScreen")?.classList.add("hidden");
    document.getElementById("inspectionSummaryScreen")?.classList.add("hidden");
    document.getElementById("inspectionForm")?.style.removeProperty("display");
    document.body.classList.remove("force-mobile-workflow");
    document.getElementById("dashboardPage")?.classList.remove("hidden");
  }

  activeModuleId = moduleId;
  if (homeBtn) {
    homeBtn.classList.remove("active");
  }
  if (homePanel) {
    homePanel.classList.add("hidden");
  }
  setMenuVisible(true);
  modulePanel.classList.remove("hidden");
  modulePanel.innerHTML = module.render();
  bindModuleEvents(moduleId);
  updateMenuSelection();
  updateMobileTabBar();

  if (notice) {
    setModuleNotice(notice.message, notice.type || "success");
  }
}

function setModuleNotice(message, type) {
  const notice = document.getElementById("moduleNotice");
  if (!notice) {
    return;
  }

  notice.className = `notice ${type || "success"}`;
  notice.textContent = message;
  notice.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderStationConfig() {
  const rows = state.stationConfigs.length
    ? state.stationConfigs
        .map(
          (item) => `
            <tr>
              <td>${sanitize(item.region)}</td>
              <td>${sanitize(item.plant)}</td>
              <td>${sanitize(item.area)}</td>
              <td>${sanitize(item.subArea)}</td>
              <td>${sanitize(item.stationId)}</td>
              <td>${sanitize(item.stationName)}</td>
              <td>${sanitize(item.recordStatus || "Saved")}</td>
              <td>
                <button type="button" class="btn-ghost btn-row" data-row-action="edit" data-station-id="${sanitize(item.stationId)}">Edit</button>
                <button type="button" class="btn-ghost btn-row" data-row-action="delete" data-station-id="${sanitize(item.stationId)}">Delete</button>
              </td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="8" class="muted">No station configured yet.</td></tr>`;

  return `
    <h3>1. Station Configuration (Admin)</h3>
    <p class="muted">Initial setup with plant hierarchy and station identity fields.</p>
    <div id="moduleNotice" class="notice hidden"></div>

    <form class="form-grid section-grid" id="stationConfigForm">
      <label>Region<input name="region" type="text" placeholder="Enter region" /></label>
      <label>Plant<input name="plant" type="text" placeholder="Enter plant" /></label>
      <label>Area<input name="area" type="text" placeholder="Enter area" /></label>
      <label>Sub Area<input name="subArea" type="text" placeholder="Enter sub area" /></label>
      <label>Station ID<input name="stationId" type="text" placeholder="e.g. STN-101" /></label>
      <label>Station Name<input name="stationName" type="text" placeholder="Enter station name" /></label>
      <div class="module-actions">
        <button type="button" id="saveStationBtn" class="btn-primary">Save</button>
        <button type="button" id="draftStationBtn" class="btn-ghost">Draft</button>
        <button type="button" id="cancelStationBtn" class="btn-ghost">Cancel</button>
        <button type="button" id="editStationBtn" class="btn-ghost">Edit</button>
        <button type="button" id="deleteStationBtn" class="btn-ghost">Delete</button>
        <button type="button" id="importStationBtn" class="btn-ghost">Import CSV/XLS</button>
        <button type="button" id="downloadStationCsvBtn" class="btn-ghost">Download CSV</button>
        <button type="button" id="downloadStationExcelBtn" class="btn-ghost">Download Excel</button>
        <input id="importStationFile" type="file" accept=".csv,.xls,text/csv,application/vnd.ms-excel,text/plain" hidden />
      </div>
    </form>

    <div class="table-wrap">
      <table id="stationConfigTable">
        <thead>
          <tr><th>Region</th><th>Plant</th><th>Area</th><th>Sub Area</th><th>Station ID</th><th>Station Name</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderStationSequence() {
  const regionOptions = Object.keys(REGION_PLANT_OPTIONS)
    .map(
      (region) =>
        `<option value="${sanitize(region)}">${sanitize(region)}</option>`,
    )
    .join("");

  const areaOptions = AREA_OPTIONS.map(
    (area) => `<option value="${sanitize(area)}">${sanitize(area)}</option>`,
  ).join("");

  const vehicleModelOptions = [
    "B SUV",
    "C SUV",
    "D SUV",
    "ELECTRIC SUV",
    "SEDAN",
    "HATCHBACK",
    "MUV",
  ]
    .map(
      (model) =>
        `<option value="${sanitize(model)}">${sanitize(model)}</option>`,
    )
    .join("");

  const rows = state.stationSequences.length
    ? [...state.stationSequences]
        .map(
          (item) => `
            <tr>
              <td>${sanitize(item.sequenceId)}</td>
              <td>${sanitize(item.sequenceName)}</td>
              <td>${sanitize(item.region)}</td>
              <td>${sanitize(item.plant)}</td>
              <td>${sanitize(item.stationId)}</td>
              <td>${sanitize(item.stationName)}</td>
              <td>${sanitize(item.vehicleModel)}</td>
              <td>${sanitize(item.recordStatus || "Saved")}</td>
              <td>
                <button type="button" class="btn-ghost btn-row" data-row-action="edit" data-sequence-id="${sanitize(item.sequenceId)}">Edit</button>
                <button type="button" class="btn-ghost btn-row" data-row-action="delete" data-sequence-id="${sanitize(item.sequenceId)}">Delete</button>
              </td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="9" class="muted">No sequence configured yet.</td></tr>`;

  return `
    <h3>2. Station Sequence Configuration (Admin)</h3>
    <p class="muted">Configure sequence details with plant hierarchy, station mapping, and image.</p>
    <div id="moduleNotice" class="notice hidden"></div>

    <form class="form-grid section-grid" id="stationSequenceForm">
      <label>Region
        <select name="region" id="seqRegion">
          <option value="" selected>Select Region</option>
          ${regionOptions}
        </select>
      </label>
      <label>Plant
        <select name="plant" id="seqPlant">
          <option value="" selected>Select Plant</option>
        </select>
      </label>
      <label>Area
        <select name="area" id="seqArea">
          <option value="" selected>Select Area</option>
          ${areaOptions}
        </select>
      </label>
      <label>Sub Area
        <select name="subArea" id="seqSubArea">
          <option value="" selected>Select Sub Area</option>
        </select>
      </label>
      <label>Station ID
        <select name="stationId" id="seqStationId">
          <option value="" selected>Select Station ID</option>
        </select>
      </label>
      <label>Station Name
        <select name="stationNameDisplay" id="seqStationName" disabled>
          <option value="" selected>Select station to preview name</option>
        </select>
      </label>
      <label>Vehicle Model
        <select name="vehicleModel">
          <option value="" selected>Select Vehicle Model</option>
          ${vehicleModelOptions}
        </select>
      </label>
      <label>Sequence ID<input name="sequenceId" type="text" placeholder="Enter sequence ID" /></label>
      <label>Sequence Name<input name="sequenceName" type="text" placeholder="Enter sequence name" /></label>
      <label>Sequence Description<input name="sequenceDescription" type="text" placeholder="Enter sequence description" /></label>
      <label>Part Name<input name="partName" type="text" placeholder="Enter part name" /></label>
      <label>Image (jpg, jpeg, png)
        <input name="image" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" />
      </label>
      <label>Status
        <input name="recordStatusDisplay" id="seqRecordStatus" type="text" value="Saved" readonly />
      </label>
      <div class="seq-inline-actions">
        <button type="button" id="editSequenceBtn" class="btn-ghost">Edit</button>
        <button type="button" id="deleteSequenceBtn" class="btn-ghost">Delete</button>
      </div>
      <div class="full-span seq-image-preview-wrap">
        <label>Uploaded Image Preview</label>
        <img id="seqImagePreview" class="seq-image-preview hidden" alt="Uploaded sequence preview" />
        <p id="seqImagePreviewNote" class="muted">No image uploaded yet.</p>
      </div>
      <div id="imageLightbox" class="image-lightbox hidden" role="dialog" aria-modal="true" aria-label="Image preview">
        <div id="imageLightboxBackdrop" class="image-lightbox-backdrop"></div>
        <div class="image-lightbox-content">
          <button type="button" id="imageLightboxClose" class="btn-ghost btn-row">Close</button>
          <img id="imageLightboxImage" class="image-lightbox-image" alt="Enlarged preview" />
        </div>
      </div>
      <div class="module-actions full-span">
        <button type="button" id="addSequenceBtn" class="btn-primary">Add Sequence ++</button>
        <button type="button" id="saveSequenceBtn" class="btn-primary">Save</button>
        <button type="button" id="draftSequenceBtn" class="btn-ghost">Draft</button>
        <button type="button" id="cancelSequenceBtn" class="btn-ghost">Cancel</button>
        <button type="button" id="importSequenceBtn" class="btn-ghost">Import CSV/XLS</button>
        <button type="button" id="downloadSequenceCsvBtn" class="btn-ghost">Download CSV</button>
        <button type="button" id="downloadSequenceExcelBtn" class="btn-ghost">Download Excel</button>
        <input id="importSequenceFile" type="file" accept=".csv,.xls,text/csv,application/vnd.ms-excel,text/plain" hidden />
      </div>
    </form>

    <div class="table-wrap">
      <table id="stationSequenceTable">
        <thead>
          <tr><th>Sequence ID</th><th>Sequence Name</th><th>Region</th><th>Plant</th><th>Station ID</th><th>Station Name</th><th>Vehicle Model</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

function renderStationInspection() {
  const regionOptions = Object.keys(REGION_PLANT_OPTIONS)
    .map(
      (region) =>
        `<option value="${sanitize(region)}">${sanitize(region)}</option>`,
    )
    .join("");

  const plantOptions = ALL_PLANT_OPTIONS.map(
    (plant) => `<option value="${sanitize(plant)}">${sanitize(plant)}</option>`,
  ).join("");

  const areaOptions = AREA_OPTIONS.map(
    (area) => `<option value="${sanitize(area)}">${sanitize(area)}</option>`,
  ).join("");

  const stationOptions = STATION_OPTIONS.map(
    (stationId) =>
      `<option value="${sanitize(stationId)}">${sanitize(stationId)}</option>`,
  ).join("");

  const recent = state.inspections
    .slice(-8)
    .reverse()
    .map(
      (item) => `
        <tr>
          <td>${sanitize(item.vin)}</td>
          <td>${sanitize(item.stationId)}</td>
          <td>${sanitize(item.partName || "-")}</td>
          <td>${sanitize(item.sequenceId || "-")}</td>
          <td>${item.resultGood && item.resultBad ? '<span class="badge-alert">Good / Bad</span>' : item.resultGood ? '<span class="badge-ok">Good</span>' : item.resultBad ? '<span class="badge-alert">Bad</span>' : '<span class="badge-alert">Pending</span>'}</td>
          <td>${sanitize(item.inspectionStatus || "Saved")}</td>
          <td>${toLocalDateTime(item.timestamp)}</td>
          <td class="history-actions">
            <button type="button" class="btn-ghost btn-row" data-inspection-action="edit" data-inspection-key="${sanitize(item.inspectionKey)}">Edit</button>
            <button type="button" class="btn-ghost btn-row" data-inspection-action="delete" data-inspection-key="${sanitize(item.inspectionKey)}">Delete</button>
          </td>
        </tr>
      `,
    )
    .join("");

  return `
    <h3>1. Station Quality Inspection (User)</h3>
    <p class="muted">Inspect parts for a station. Start from the detected part (for example Left Door Handle Scratch), proceed part by part, and submit at the final part. Saved records appear below with timestamp.</p>
    <div id="moduleNotice" class="notice hidden"></div>
    <div id="mobileSyncBadge" class="mobile-sync-badge hidden" aria-live="polite"></div>

    <form class="form-grid section-grid" id="inspectionForm">
      <input id="inspectionEditKey" type="hidden" />
      <p id="inspectionPageLabel" class="muted full-span">Page 1 of 2: Vehicle Details</p>
      <label>Region
        <select name="region" id="inspectionRegion">
          <option value="" selected>Select Region</option>
          ${regionOptions}
        </select>
      </label>
      <label>Plant
        <select name="plant" id="inspectionPlant">
          <option value="" selected>Select Plant</option>
          ${plantOptions}
        </select>
      </label>
      <label>Area
        <select name="area" id="inspectionArea">
          <option value="" selected>Select Area</option>
          ${areaOptions}
        </select>
      </label>
      <label>Sub Area
        <select name="subArea" id="inspectionSubArea">
          <option value="" selected>Select Sub Area</option>
        </select>
      </label>
      <label>Station ID
        <select name="stationId" id="inspectionStationId">
          <option value="" selected>Select Station ID</option>
          ${stationOptions}
        </select>
      </label>
      <label>Station Name
        <input name="stationNameDisplay" id="inspectionStationName" type="text" placeholder="Enter station name or keep auto-filled" />
      </label>
      <div class="module-actions full-span">
        <button type="button" id="scanBarcodeBtn" class="btn-primary">Scan the Bar Code</button>
        <button type="button" id="openPartPageBtn" class="btn-ghost">Next Page</button>
      </div>
      <label>Vehicle Model<input name="vehicleModel" id="inspectionVehicleModel" type="text" placeholder="Display or enter manually" /></label>
      <label>VIN Number<input name="vin" id="inspectionVin" type="text" placeholder="Display or enter manually" /></label>
      <div id="mobileContextBar" class="mobile-context-bar hidden full-span">
        <span id="mobileContextSummary" class="mobile-context-summary">Inspection context locked for rapid flow.</span>
        <button type="button" id="toggleContextBtn" class="btn-ghost btn-row">Edit Context</button>
      </div>
      <div id="inspectionPartPage" class="form-grid section-grid full-span hidden">
        <!-- Initialize Checks Overlay (shown first after opening part page) -->
        <div id="initChecksOverlay" class="init-checks-overlay full-span hidden">
          <h4 class="init-checks-title">Initialize Sequence</h4>
          <p id="initChecksSubtitle" class="muted">Review the inspection plan for this vehicle before starting.</p>
          <div id="initPrioritySection" class="hidden">
            <p class="init-checks-phase-header priority-header">🔴 Priority Quality Checks — Parts with Defect History</p>
            <ol id="initPriorityList" class="init-checks-list"></ol>
          </div>
          <div id="initRegularSection" class="hidden">
            <p class="init-checks-phase-header regular-header">🟢 Regular Quality Checks — Standard Inspection</p>
            <ol id="initRegularList" class="init-checks-list"></ol>
          </div>
          <div class="module-actions">
            <button type="button" id="beginInspectionBtn" class="btn-primary">Begin Inspection →</button>
          </div>
        </div>
        <!-- Inspection Form Body (hidden until Begin Inspection is clicked) -->
        <div id="inspectionFormBody" class="form-grid section-grid full-span hidden">
          <p class="muted full-span">Page 2 of 2: Part / Sequence Details</p>
          <div id="mobileOperatorHeader" class="mobile-operator-header hidden full-span">
            <span id="mobileHeaderVin">VIN: -</span>
            <span id="mobileHeaderStation">Station: -</span>
            <span id="mobileHeaderPhase">Phase: -</span>
            <span id="mobileHeaderStep">Step: -</span>
          </div>
          <div class="full-span">
            <label id="inspectionPhaseTitle">Priority Quality Checks</label>
            <div id="inspectionSequenceTracker" class="notice success"></div>
            <div id="mobileTrackerCompact" class="mobile-tracker-compact hidden"></div>
            <div id="inspectionSequenceProgress" class="inspection-sequence-progress hidden">
              <span id="inspectionSequenceProgressBar"></span>
            </div>
            <div id="mobileKpiRow" class="mobile-kpi-row hidden">
              <span id="vehicleElapsedKpi">Vehicle 00:00</span>
              <span id="partElapsedKpi">Part 00:00</span>
            </div>
          </div>
          <label class="full-span inspection-part-name-field">
            <span class="inspection-part-name-label-row">
              <span>Part Name</span>
              <span id="inspectionCheckType" class="inspection-check-type-badge">Priority Check</span>
            </span>
            <input name="partNameDisplay" id="inspectionPartName" type="text" placeholder="e.g. Left Door Handle" />
          </label>
          <label class="full-span">Part ID<input name="sequenceIdDisplay" id="inspectionSequenceId" type="text" placeholder="e.g. PART-001" /></label>
          <label class="full-span">Part Description<textarea name="sequenceDescriptionDisplay" id="inspectionSequenceDescription" rows="2" placeholder="e.g. Verify scratch depth and edge quality"></textarea></label>
          <input name="sequenceNameDisplay" id="inspectionSequenceName" type="hidden" />
          <div class="full-span">
            <label>Part Sequence Flow
              <select name="partFilter" id="inspectionPartFilter">
                <option value="" selected>All Parts (Sequential)</option>
              </select>
            </label>
          </div>
          <label>Part Step<input name="processStepDisplay" id="inspectionProcessStep" type="text" placeholder="e.g. 1 / 4" /></label>
          <label>Image Display<input name="imageDisplay" id="inspectionImage" type="text" placeholder="e.g. left-door-handle.jpg" readonly /></label>
          <div class="full-span inspection-image-preview-wrap">
            <img id="inspectionImagePreview" class="inspection-image-preview hidden" alt="Inspection sequence preview" />
            <p id="inspectionImagePreviewNote" class="muted">No image available for this part.</p>
          </div>
          <div id="imageLightbox" class="image-lightbox hidden" role="dialog" aria-modal="true" aria-label="Image preview">
            <div id="imageLightboxBackdrop" class="image-lightbox-backdrop"></div>
            <div class="image-lightbox-content">
              <button type="button" id="imageLightboxClose" class="btn-ghost btn-row">Close</button>
              <img id="imageLightboxImage" class="image-lightbox-image" alt="Enlarged preview" />
            </div>
          </div>
          <div class="full-span">
            <label>Result</label>
            <div id="mobileResultToggle" class="mobile-result-toggle hidden">
              <button type="button" id="markGoodBtn" class="btn-primary">GOOD</button>
              <button type="button" id="markBadBtn" class="btn-ghost">BAD</button>
            </div>
            <div class="result-options">
              <label class="checkbox-row"><input name="resultGood" type="checkbox" /> Good</label>
              <label class="checkbox-row"><input name="resultBad" type="checkbox" /> Bad</label>
            </div>
          </div>
          <label class="full-span">Comments (max 500 words)
            <textarea name="comments" rows="4" placeholder="Enter comments"></textarea>
          </label>
          <div class="full-span">
            <button type="button" id="switchPhaseBtn" class="btn-ghost btn-row hidden">Switch Phase</button>
          </div>
          <div id="inspectionActionBar" class="module-actions full-span">
            <button type="button" id="backToVehiclePageBtn" class="btn-ghost">Back</button>
            <button type="button" id="saveInspectionBtn" class="btn-primary">Save</button>
            <button type="button" id="nextInspectionBtn" class="btn-ghost btn-row hidden">Next</button>
            <button type="button" id="submitInspectionBtn" class="btn-primary">Submit</button>
            <button type="button" id="cancelInspectionBtn" class="btn-ghost">Cancel</button>
          </div>
        </div>
      </div>
    </form>

    <div class="table-wrap">
      <table id="inspectionHistoryTable">
        <thead>
          <tr><th>VIN</th><th>Station</th><th>Part Name</th><th>Part ID</th><th>Result</th><th>Status</th><th>Timestamp</th><th>Actions</th></tr>
        </thead>
        <tbody>
          ${recent || '<tr><td colspan="8" class="muted">No inspection record available.</td></tr>'}
        </tbody>
      </table>
    </div>
  `;
}

function renderAiReport() {
  const reportRecords = getDateFilteredReportRecords();
  const summary = reportSummary(reportRecords);
  const config = state.reportConfig || {};
  const vehicleModels = [...new Set(
    reportRecords.map((item) => item.vehicleModel).filter(Boolean),
  )].sort((left, right) => left.localeCompare(right));

  if (reportFilters.vehicleModel && !vehicleModels.includes(reportFilters.vehicleModel)) {
    reportFilters.vehicleModel = "";
  }

  const badParts = reportRecords.filter(
    (item) => item.resultBad && !item.resultGood,
  );
  const badPartsRows = badParts.length
    ? badParts
        .map(
          (item) => `
        <tr>
          <td>${sanitize(item.plant || "-")}</td>
          <td>${sanitize(item.area || "-")}</td>
          <td>${sanitize(item.subArea || "-")}</td>
          <td>${sanitize(item.stationId || "-")}</td>
          <td>${sanitize(item.partName || "-")}</td>
          <td>${sanitize(item.sequenceId || "-")}</td>
          <td>${sanitize(item.inspectionStatus || "-")}</td>
          <td>${sanitize(item.comments || "-")}</td>
          <td>${toLocalDateTime(item.timestamp)}</td>
        </tr>`,
        )
        .join("")
    : `<tr><td colspan="9" class="muted">No bad-result parts found.</td></tr>`;

  return `
    <h3>2. Report</h3>
    <p class="muted">Review defect trends for each vehicle model.</p>
    <div id="moduleNotice" class="notice hidden"></div>

    <div class="report-date-filter" aria-label="Report timestamp range">
      <label for="reportFromDate">From
        <input id="reportFromDate" type="date" value="${sanitize(reportFilters.fromDate)}" max="${sanitize(reportFilters.toDate)}" />
      </label>
      <label for="reportToDate">To
        <input id="reportToDate" type="date" value="${sanitize(reportFilters.toDate)}" min="${sanitize(reportFilters.fromDate)}" />
      </label>
      <button type="button" id="clearReportDatesBtn" class="btn-ghost">Clear Dates</button>
    </div>

    <div id="reportTopFiveCharts">${buildTopFiveReportSummaries(reportRecords)}</div>

    <div class="report-filter-row">
      <label for="reportVehicleModel">Vehicle Model</label>
      <select id="reportVehicleModel">
        <option value="">All Vehicle Models</option>
        ${vehicleModels.map((model) => `<option value="${sanitize(model)}" ${reportFilters.vehicleModel === model ? "selected" : ""}>${sanitize(model)}</option>`).join("")}
      </select>
    </div>
    <div id="reportTrendCharts">${buildDefectTrendCharts(reportFilters.vehicleModel, reportRecords)}</div>

    <form class="form-grid section-grid" id="reportConfigForm">
      <label>Report Name<input name="reportName" type="text" placeholder="e.g. Daily Shift Summary" value="${sanitize(config.reportName || "")}" required /></label>
      <label>Email Recipients<input name="recipients" type="text" placeholder="qa@company.com, lead@company.com" value="${sanitize(config.recipients || "")}" /></label>
      <label class="full-span">Qualiff API Endpoint
        <input
          name="qualiffEndpoint"
          type="url"
          placeholder="https://qualiff.yourcompany.com/api/quality-defects"
          value="${sanitize(config.qualiffEndpoint || "")}"
        />
      </label>
      <label class="checkbox-row"><input name="failedOnly" type="checkbox" ${config.failedOnly ? "checked" : ""} /> Notify only for failed inspections</label>
      <div class="module-actions">
        <button type="submit" class="btn-primary">Save Report Configuration</button>
        <button type="button" id="exportCsvBtn" class="btn-ghost">Export Inspection CSV</button>
      </div>
    </form>

    <div class="stat-grid">
      <article class="stat-card"><p class="muted">Total Inspections</p><h3>${summary.total}</h3></article>
      <article class="stat-card"><p class="muted">Pass Rate</p><h3>${summary.passRate}%</h3></article>
      <article class="stat-card"><p class="muted">Failed Units</p><h3>${summary.fail}</h3></article>
      <article class="stat-card"><p class="muted">Manual Review</p><h3>${summary.review}</h3></article>
    </div>

    <hr style="margin:1.5rem 0" />
    <h4>Bad Parts Report</h4>
    <p class="muted">All inspection records where the result is <strong>Bad</strong>. Export as JSON or send via API.</p>

    <div class="module-actions" style="margin-top:0.5rem;margin-bottom:0.25rem">
      <button type="button" id="jumpBadPartsBtn" class="btn-ghost">View Bad Parts Report Table</button>
    </div>

    <div class="module-actions" style="margin-bottom:0.75rem">
      <button type="button" id="exportBadPartsJsonBtn" class="btn-primary">Download Bad Parts JSON</button>
      <button type="button" id="copyApiSnippetBtn" class="btn-ghost">Copy API Fetch Snippet</button>
      <button type="button" id="sendQualiffApiBtn" class="btn-primary">Send Defect Data to Qualiff</button>
    </div>

    <div id="apiSnippetBox" class="hidden" style="margin-bottom:1rem">
      <label style="font-size:0.8rem;font-weight:600;">API Fetch Snippet (POST bad parts JSON to your endpoint)</label>
      <pre id="apiSnippetPre" style="background:#f4f6fa;border:1px solid #d0d6e2;border-radius:6px;padding:0.75rem;font-size:0.73rem;overflow-x:auto;white-space:pre-wrap;"></pre>
      <button type="button" id="copySnippetCloseBtn" class="btn-ghost btn-row" style="margin-top:0.4rem">Close</button>
    </div>

    <div id="badPartsSection" class="table-wrap">
      <table id="badPartsTable">
        <thead>
          <tr><th>Plant</th><th>Area</th><th>Sub Area</th><th>Station</th><th>Part Name</th><th>Part ID</th><th>Status</th><th>Comments</th><th>Timestamp</th></tr>
        </thead>
        <tbody>
          ${badPartsRows}
        </tbody>
      </table>
    </div>
  `;
}

function bindModuleEvents(moduleId) {
  if (moduleId === "station-config") {
    const form = document.getElementById("stationConfigForm");
    const stationTable = document.getElementById("stationConfigTable");
    const saveBtn = document.getElementById("saveStationBtn");
    const draftBtn = document.getElementById("draftStationBtn");
    const cancelBtn = document.getElementById("cancelStationBtn");
    const editBtn = document.getElementById("editStationBtn");
    const deleteBtn = document.getElementById("deleteStationBtn");
    const importBtn = document.getElementById("importStationBtn");
    const importInput = document.getElementById("importStationFile");
    const downloadCsvBtn = document.getElementById("downloadStationCsvBtn");
    const downloadExcelBtn = document.getElementById("downloadStationExcelBtn");

    if (
      !form ||
      !saveBtn ||
      !draftBtn ||
      !cancelBtn ||
      !editBtn ||
      !deleteBtn ||
      !importBtn ||
      !importInput ||
      !downloadCsvBtn ||
      !downloadExcelBtn ||
      !stationTable
    ) {
      return;
    }

    const toRecord = (data, recordStatus) => ({
      region: data.get("region").toString().trim(),
      plant: data.get("plant").toString().trim(),
      area: data.get("area").toString().trim(),
      subArea: data.get("subArea").toString().trim(),
      stationId: data.get("stationId").toString().trim(),
      stationName: data.get("stationName").toString().trim(),
      recordStatus,
    });

    const fillForm = (record) => {
      form.elements.region.value = record.region || "";
      form.elements.plant.value = record.plant || "";
      form.elements.area.value = record.area || "";
      form.elements.subArea.value = record.subArea || "";
      form.elements.stationId.value = record.stationId || "";
      form.elements.stationName.value = record.stationName || "";
    };

    const saveRecord = (record, allowDraft) => {
      if (!record.stationId) {
        setModuleNotice("Station ID is required.", "error");
        return;
      }

      if (!allowDraft) {
        if (
          !record.region ||
          !record.plant ||
          !record.area ||
          !record.subArea ||
          !record.stationName
        ) {
          setModuleNotice(
            "Region, Plant, Area, Sub Area, Station ID, and Station Name are required for Save.",
            "error",
          );
          return;
        }
      }

      const existingIndex = state.stationConfigs.findIndex(
        (item) => item.stationId === record.stationId,
      );

      if (existingIndex >= 0) {
        state.stationConfigs[existingIndex] = {
          ...state.stationConfigs[existingIndex],
          ...record,
        };
      } else {
        state.stationConfigs.push(record);
      }

      saveState(STORAGE_KEYS.stationConfigs, state.stationConfigs);
      openModule("station-config", {
        message:
          record.recordStatus === "Draft"
            ? "Station draft saved successfully."
            : "Station saved successfully.",
      });
    };

    saveBtn.addEventListener("click", () => {
      const data = new FormData(form);
      const record = toRecord(data, "Saved");
      saveRecord(record, false);
    });

    draftBtn.addEventListener("click", () => {
      const data = new FormData(form);
      const record = toRecord(data, "Draft");
      saveRecord(record, true);
    });

    cancelBtn.addEventListener("click", () => {
      form.reset();
      setModuleNotice("Entry cleared.", "success");
    });

    editBtn.addEventListener("click", () => {
      const stationId = form.elements.stationId.value.trim();
      if (!stationId) {
        setModuleNotice("Enter Station ID to edit.", "error");
        return;
      }

      const record = state.stationConfigs.find(
        (item) => item.stationId === stationId,
      );
      if (!record) {
        setModuleNotice("Station ID not found.", "error");
        return;
      }

      fillForm(record);
      setModuleNotice(
        "Station loaded. Update fields and click Save.",
        "success",
      );
    });

    deleteBtn.addEventListener("click", () => {
      const stationId = form.elements.stationId.value.trim();
      if (!stationId) {
        setModuleNotice("Enter Station ID to delete.", "error");
        return;
      }

      const confirmed = window.confirm(
        `Delete station ${stationId}? This action cannot be undone.`,
      );
      if (!confirmed) {
        setModuleNotice("Delete cancelled.", "success");
        return;
      }

      const next = state.stationConfigs.filter(
        (item) => item.stationId !== stationId,
      );
      if (next.length === state.stationConfigs.length) {
        setModuleNotice("Station ID not found.", "error");
        return;
      }

      state.stationConfigs = next;
      saveState(STORAGE_KEYS.stationConfigs, state.stationConfigs);
      openModule("station-config", {
        message: "Station deleted successfully.",
      });
    });

    stationTable.addEventListener("click", (event) => {
      const actionButton = event.target.closest("button[data-row-action]");
      if (!actionButton) {
        return;
      }

      const action = actionButton.dataset.rowAction;
      const stationId = actionButton.dataset.stationId;
      if (!stationId) {
        return;
      }

      const record = state.stationConfigs.find(
        (item) => item.stationId === stationId,
      );
      if (!record) {
        setModuleNotice("Station ID not found.", "error");
        return;
      }

      if (action === "edit") {
        fillForm(record);
        setModuleNotice(
          "Station loaded from table. Update fields and click Save.",
          "success",
        );
      }

      if (action === "delete") {
        const confirmed = window.confirm(
          `Delete station ${stationId}? This action cannot be undone.`,
        );
        if (!confirmed) {
          setModuleNotice("Delete cancelled.", "success");
          return;
        }

        state.stationConfigs = state.stationConfigs.filter(
          (item) => item.stationId !== stationId,
        );
        saveState(STORAGE_KEYS.stationConfigs, state.stationConfigs);
        openModule("station-config", {
          message: "Station deleted from table successfully.",
        });
      }
    });

    importBtn.addEventListener("click", () => {
      importInput.click();
    });

    importInput.addEventListener("change", async () => {
      const file = importInput.files && importInput.files[0];
      if (!file) {
        return;
      }

      try {
        const text = await readFileAsText(file);
        const rows = parseTableRows(text);
        const imported = rowsToRecords(
          rows,
          STATION_CONFIG_COLUMNS,
          "stationId",
        ).map((record) => ({
          region: record.region,
          plant: record.plant,
          area: record.area,
          subArea: record.subArea,
          stationId: record.stationId,
          stationName: record.stationName,
          recordStatus: toRecordStatus(record.recordStatus),
        }));

        if (!imported.length) {
          setModuleNotice(
            "No valid station records found. Ensure Station ID column has values.",
            "error",
          );
          return;
        }

        state.stationConfigs = upsertByKey(
          state.stationConfigs,
          imported,
          "stationId",
        );
        saveState(STORAGE_KEYS.stationConfigs, state.stationConfigs);
        openModule("station-config", {
          message: `${imported.length} station records imported successfully.`,
        });
      } catch (_error) {
        setModuleNotice(
          "Import failed. Use CSV or XLS generated from this app format.",
          "error",
        );
      } finally {
        importInput.value = "";
      }
    });

    downloadCsvBtn.addEventListener("click", () => {
      if (!state.stationConfigs.length) {
        setModuleNotice("No station data available for export.", "error");
        return;
      }

      const csv = buildCsv(STATION_CONFIG_COLUMNS, state.stationConfigs);
      downloadBlobFile(
        csv,
        "station_configuration.csv",
        "text/csv;charset=utf-8;",
      );
      setModuleNotice("Station configuration CSV downloaded.", "success");
    });

    downloadExcelBtn.addEventListener("click", () => {
      if (!state.stationConfigs.length) {
        setModuleNotice("No station data available for export.", "error");
        return;
      }

      const html = buildExcelHtmlTable(
        STATION_CONFIG_COLUMNS,
        state.stationConfigs,
      );
      downloadBlobFile(
        html,
        "station_configuration.xls",
        "application/vnd.ms-excel;charset=utf-8;",
      );
      setModuleNotice("Station configuration Excel downloaded.", "success");
    });
  }

  if (moduleId === "station-seq") {
    const form = document.getElementById("stationSequenceForm");
    const regionSelect = document.getElementById("seqRegion");
    const plantSelect = document.getElementById("seqPlant");
    const areaSelect = document.getElementById("seqArea");
    const subAreaSelect = document.getElementById("seqSubArea");
    const stationIdSelect = document.getElementById("seqStationId");
    const stationNameSelect = document.getElementById("seqStationName");
    const seqStatusInput = document.getElementById("seqRecordStatus");
    const stationTable = document.getElementById("stationSequenceTable");
    const imageInput = form?.elements?.image;
    const imagePreview = document.getElementById("seqImagePreview");
    const imagePreviewNote = document.getElementById("seqImagePreviewNote");
    const imageLightbox = document.getElementById("imageLightbox");
    const imageLightboxBackdrop = document.getElementById(
      "imageLightboxBackdrop",
    );
    const imageLightboxClose = document.getElementById("imageLightboxClose");
    const imageLightboxImage = document.getElementById("imageLightboxImage");
    const addSequenceBtn = document.getElementById("addSequenceBtn");
    const saveBtn = document.getElementById("saveSequenceBtn");
    const draftBtn = document.getElementById("draftSequenceBtn");
    const cancelBtn = document.getElementById("cancelSequenceBtn");
    const editBtn = document.getElementById("editSequenceBtn");
    const deleteBtn = document.getElementById("deleteSequenceBtn");
    const importBtn = document.getElementById("importSequenceBtn");
    const importInput = document.getElementById("importSequenceFile");
    const downloadCsvBtn = document.getElementById("downloadSequenceCsvBtn");
    const downloadExcelBtn = document.getElementById(
      "downloadSequenceExcelBtn",
    );

    if (
      !form ||
      !regionSelect ||
      !plantSelect ||
      !areaSelect ||
      !subAreaSelect ||
      !stationIdSelect ||
      !stationNameSelect ||
      !seqStatusInput ||
      !stationTable ||
      !imageInput ||
      !imagePreview ||
      !imagePreviewNote ||
      !imageLightbox ||
      !imageLightboxBackdrop ||
      !imageLightboxClose ||
      !imageLightboxImage ||
      !addSequenceBtn ||
      !saveBtn ||
      !draftBtn ||
      !cancelBtn ||
      !editBtn ||
      !deleteBtn ||
      !importBtn ||
      !importInput ||
      !downloadCsvBtn ||
      !downloadExcelBtn
    ) {
      return;
    }

    const resetSelect = (select, text) => {
      select.innerHTML = `<option value="" selected>${text}</option>`;
    };

    const rapidMobileMode = isMobileRapidMode();
    let contextLocked = false;
    let vehicleStartMs = 0;
    let partStartMs = 0;
    let kpiTimer = null;
    let autoAdvanceTimer = null;
    let touchStartX = 0;
    let touchStartY = 0;

    const formatElapsed = (elapsedMs) => {
      const safe = Math.max(0, Math.floor((elapsedMs || 0) / 1000));
      const mins = String(Math.floor(safe / 60)).padStart(2, "0");
      const secs = String(safe % 60).padStart(2, "0");
      return `${mins}:${secs}`;
    };

    const updateMobileSyncBadge = () => {
      if (!mobileSyncBadge) {
        return;
      }

      if (!rapidMobileMode) {
        mobileSyncBadge.classList.add("hidden");
        return;
      }

      const badgeClass = `mobile-sync-badge ${mobileSyncState.status}`;
      mobileSyncBadge.className = badgeClass;
      mobileSyncBadge.textContent = mobileSyncState.message || "";
      mobileSyncBadge.classList.toggle("hidden", !mobileSyncState.message);
    };

    const setMobileSyncState = (status, message) => {
      mobileSyncState.status = status;
      mobileSyncState.message = message;
      updateMobileSyncBadge();
    };

    const setContextLocked = (locked) => {
      contextLocked = Boolean(locked);
      if (!rapidMobileMode || !form) {
        return;
      }

      form.classList.toggle("mobile-context-collapsed", contextLocked);
      [
        regionSelect,
        plantSelect,
        areaSelect,
        subAreaSelect,
        stationIdSelect,
      ].forEach((field) => {
        field.disabled = contextLocked;
      });
      if (stationNameInput) {
        stationNameInput.readOnly = contextLocked;
      }
      if (toggleContextBtn) {
        toggleContextBtn.textContent = contextLocked
          ? "Edit Context"
          : "Lock Context";
      }
    };

    const updateContextSummary = () => {
      if (!mobileContextSummary) {
        return;
      }
      mobileContextSummary.textContent = `VIN ${vinInput.value || "-"} | ${stationIdSelect.value || "-"} | ${inspectionUiState.currentPhase === "priority" ? "Priority" : "Regular"}`;
    };

    const updateMobileHeader = (sequenceCount = 0) => {
      if (!rapidMobileMode) {
        mobileOperatorHeader?.classList.add("hidden");
        mobileContextBar?.classList.add("hidden");
        mobileResultToggle?.classList.add("hidden");
        mobileTrackerCompact?.classList.add("hidden");
        sequenceProgress?.classList.add("hidden");
        mobileKpiRow?.classList.add("hidden");
        return;
      }

      mobileOperatorHeader?.classList.remove("hidden");
      mobileContextBar?.classList.remove("hidden");
      mobileResultToggle?.classList.remove("hidden");
      mobileTrackerCompact?.classList.remove("hidden");
      sequenceProgress?.classList.remove("hidden");
      mobileKpiRow?.classList.remove("hidden");

      if (mobileHeaderVin) {
        mobileHeaderVin.textContent = `VIN: ${vinInput.value || "-"}`;
      }
      if (mobileHeaderStation) {
        mobileHeaderStation.textContent = `Station: ${stationIdSelect.value || "-"}`;
      }
      if (mobileHeaderPhase) {
        mobileHeaderPhase.textContent = `Phase: ${inspectionUiState.currentPhase === "priority" ? "Priority" : "Regular"}`;
      }
      if (mobileHeaderStep) {
        const step = sequenceCount
          ? `${inspectionUiState.currentSequenceIndex + 1}/${sequenceCount}`
          : "-";
        mobileHeaderStep.textContent = `Step: ${step}`;
      }
      updateContextSummary();
    };

    const updateKpis = () => {
      if (!rapidMobileMode) {
        return;
      }
      if (vehicleElapsedKpi) {
        vehicleElapsedKpi.textContent = `Vehicle ${formatElapsed(Date.now() - vehicleStartMs)}`;
      }
      if (partElapsedKpi) {
        partElapsedKpi.textContent = `Part ${formatElapsed(Date.now() - partStartMs)}`;
      }
    };

    const startKpiTimer = () => {
      if (!rapidMobileMode) {
        return;
      }
      if (!vehicleStartMs) {
        vehicleStartMs = Date.now();
      }
      if (!partStartMs) {
        partStartMs = Date.now();
      }
      if (kpiTimer) {
        window.clearInterval(kpiTimer);
      }
      updateKpis();
      kpiTimer = window.setInterval(updateKpis, 1000);
    };

    const stopKpiTimer = () => {
      if (kpiTimer) {
        window.clearInterval(kpiTimer);
        kpiTimer = null;
      }
    };

    const queueBackgroundSync = (badRecordsToSync) => {
      if (!rapidMobileMode) {
        return null;
      }
      setMobileSyncState("pending", "Sync pending...");
      return sendQualiffDefectData(badRecordsToSync)
        .then((cloudResult) => {
          if (
            cloudResult?.skipped &&
            cloudResult.reason === "endpoint-missing"
          ) {
            setMobileSyncState("failed", "Set API endpoint for cloud sync.");
            return;
          }
          if (cloudResult?.skipped) {
            setMobileSyncState("synced", "No defects to sync.");
            return;
          }
          setMobileSyncState("synced", "Synced to cloud.");
          window.setTimeout(() => {
            setMobileSyncState("idle", "");
          }, 2500);
        })
        .catch((cloudError) => {
          setMobileSyncState(
            "failed",
            `Sync failed: ${cloudError?.message || "Unknown error"}`,
          );
        });
    };

    const scheduleAutoAdvance = () => {
      if (!rapidMobileMode || !hasCurrentResolution()) {
        return;
      }

      if (autoAdvanceTimer) {
        window.clearTimeout(autoAdvanceTimer);
      }
      autoAdvanceTimer = window.setTimeout(() => {
        if (!nextBtn.classList.contains("hidden") && !nextBtn.disabled) {
          nextBtn.click();
        }
      }, 380);
    };

    let seqImageObjectUrl = null;

    const clearObjectPreview = () => {
      if (seqImageObjectUrl) {
        URL.revokeObjectURL(seqImageObjectUrl);
        seqImageObjectUrl = null;
      }
    };

    const updateImagePreview = (url, fileName) => {
      if (!url) {
        clearObjectPreview();
        imagePreview.classList.add("hidden");
        imagePreview.removeAttribute("src");
        imagePreviewNote.textContent = "No image uploaded yet.";
        form.dataset.currentImagePreview = "";
        return;
      }

      imagePreview.src = url;
      imagePreview.classList.remove("hidden");
      imagePreviewNote.textContent = "Click image to enlarge.";
      form.dataset.currentImagePreview = url;
    };

    const closeImageLightbox = () => {
      imageLightbox.classList.add("hidden");
      imageLightboxImage.removeAttribute("src");
    };

    const openImageLightbox = (src) => {
      if (!src) {
        return;
      }
      imageLightboxImage.src = src;
      imageLightbox.classList.remove("hidden");
    };

    const fileToDataUrl = (file) =>
      new Promise((resolve, reject) => {
        if (!file || !file.name) {
          resolve("");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Unable to read image file."));
        reader.readAsDataURL(file);
      });

    const refreshPlants = () => {
      resetSelect(plantSelect, "Select Plant");
      (REGION_PLANT_OPTIONS[regionSelect.value] || []).forEach((plant) => {
        plantSelect.innerHTML += `<option value="${sanitize(plant)}">${sanitize(plant)}</option>`;
      });

      areaSelect.value = "";
      resetSelect(subAreaSelect, "Select Sub Area");
      resetSelect(stationIdSelect, "Select Station ID");
      stationNameSelect.innerHTML =
        '<option value="" selected>Select station to preview name</option>';
    };

    const refreshAreas = () => {
      resetSelect(subAreaSelect, "Select Sub Area");
      resetSelect(stationIdSelect, "Select Station ID");
      stationNameSelect.innerHTML =
        '<option value="" selected>Select station to preview name</option>';
    };

    const refreshSubAreas = () => {
      resetSelect(subAreaSelect, "Select Sub Area");
      (SUBAREA_OPTIONS[areaSelect.value] || []).forEach((subArea) => {
        subAreaSelect.innerHTML += `<option value="${sanitize(subArea)}">${sanitize(subArea)}</option>`;
      });

      resetSelect(stationIdSelect, "Select Station ID");
      stationNameSelect.innerHTML =
        '<option value="" selected>Select station to preview name</option>';
    };

    const refreshStations = () => {
      resetSelect(stationIdSelect, "Select Station ID");
      STATION_OPTIONS.forEach((stationId) => {
        stationIdSelect.innerHTML += `<option value="${sanitize(stationId)}">${sanitize(stationId)}</option>`;
      });
      stationNameSelect.innerHTML =
        '<option value="" selected>Select station to preview name</option>';
    };

    const updateStationName = () => {
      const selected = state.stationConfigs.find(
        (item) =>
          item.region === regionSelect.value &&
          item.plant === plantSelect.value &&
          item.area === areaSelect.value &&
          item.subArea === subAreaSelect.value &&
          item.stationId === stationIdSelect.value,
      );
      const stationName = selected?.stationName || stationIdSelect.value;
      stationNameSelect.innerHTML = stationName
        ? `<option value="${sanitize(stationName)}" selected>${sanitize(stationName)}</option>`
        : '<option value="" selected>Select station to preview name</option>';
    };

    const autoFillSequenceContext = () => {
      const existing = state.stationSequences.find(
        (item) =>
          item.region === regionSelect.value &&
          item.plant === plantSelect.value &&
          item.area === areaSelect.value &&
          item.subArea === subAreaSelect.value &&
          item.stationId === stationIdSelect.value,
      );

      if (existing) {
        form.elements.sequenceId.value = existing.sequenceId || "";
        form.elements.sequenceName.value = existing.sequenceName || "";
        form.elements.sequenceDescription.value =
          existing.sequenceDescription || "";
        form.elements.partName.value = existing.partName || "";
        updateImagePreview(
          existing.imagePreviewUrl || "",
          existing.imageName || "",
        );
        if (form.elements.vehicleModel) {
          form.elements.vehicleModel.value = existing.vehicleModel || "";
        }
        setModuleNotice(
          `Existing sequence "${existing.sequenceId}" matched for this station. You can update or save as a new sequence ID.`,
          "success",
        );
      } else {
        form.elements.sequenceId.value = `SEQ-${state.stationSequences.length + 1}`;
        form.elements.sequenceName.value = "";
        form.elements.sequenceDescription.value = "";
        form.elements.partName.value = "";
        updateImagePreview("", "");
        setModuleNotice(
          "No existing sequence for this station. Fill in the details manually.",
          "success",
        );
      }
    };

    const validateImage = (file) => {
      if (!file) {
        return true;
      }

      const okType = /\.(jpg|jpeg|png)$/i.test(file.name);
      if (!okType) {
        setModuleNotice("Image must be jpg, jpeg, or png.", "error");
      }
      return okType;
    };

    const toRecord = async (data, status) => {
      const imageFile = data.get("image");
      const imagePreviewUrl =
        imageFile && imageFile.name
          ? await fileToDataUrl(imageFile)
          : form.dataset.currentImagePreview || "";
      return {
        region: data.get("region").toString().trim(),
        plant: data.get("plant").toString().trim(),
        area: data.get("area").toString().trim(),
        subArea: data.get("subArea").toString().trim(),
        stationId: data.get("stationId").toString().trim(),
        stationName:
          stationNameSelect.value.trim() || stationIdSelect.value.trim(),
        vehicleModel: data.get("vehicleModel").toString().trim(),
        sequenceId: data.get("sequenceId").toString().trim(),
        sequenceName: data.get("sequenceName").toString().trim(),
        sequenceDescription: data.get("sequenceDescription").toString().trim(),
        partName: data.get("partName").toString().trim(),
        imageName: imageFile && imageFile.name ? imageFile.name : "",
        imagePreviewUrl,
        comments: "",
        recordStatus: status,
      };
    };

    const saveSequence = (record, isDraft) => {
      if (!record.sequenceId) {
        setModuleNotice("Sequence ID is required.", "error");
        return;
      }

      const duplicateIndex = state.stationSequences.findIndex(
        (item) => item.sequenceId === record.sequenceId,
      );

      const sameStationCount = state.stationSequences.filter((item) => {
        if (item.sequenceId === record.sequenceId) {
          return false;
        }

        return (
          item.region === record.region &&
          item.plant === record.plant &&
          item.area === record.area &&
          item.subArea === record.subArea &&
          item.stationId === record.stationId
        );
      }).length;

      if (sameStationCount >= 4) {
        setModuleNotice(
          "Maximum 4 parts are allowed for the same station.",
          "error",
        );
        return;
      }

      if (!isDraft) {
        const required =
          record.region &&
          record.plant &&
          record.area &&
          record.subArea &&
          record.stationId &&
          record.stationName &&
          record.vehicleModel &&
          record.sequenceName &&
          record.sequenceDescription &&
          record.partName;

        if (!required) {
          setModuleNotice(
            "Please fill all mandatory sequence fields before Save.",
            "error",
          );
          return;
        }
      }

      if (duplicateIndex >= 0) {
        state.stationSequences[duplicateIndex] = {
          ...state.stationSequences[duplicateIndex],
          ...record,
        };
      } else {
        state.stationSequences.push(record);
      }

      saveState(STORAGE_KEYS.stationSequences, state.stationSequences);
      if (record.imagePreviewUrl) {
        state.referenceImages = upsertReferenceImages(state.referenceImages, [
          {
            sequenceId: record.sequenceId,
            partName: record.partName,
            imageName: record.imageName,
            previewUrl: record.imagePreviewUrl,
          },
        ]);
        saveState(STORAGE_KEYS.referenceImages, state.referenceImages);
      }
      openModule("station-seq", {
        message:
          record.recordStatus === "Draft"
            ? "Sequence draft saved successfully."
            : "Sequence saved successfully.",
      });
    };

    const fillForm = (record) => {
      form.elements.region.value = record.region || "";
      refreshPlants();
      form.elements.plant.value = record.plant || "";
      refreshAreas();
      form.elements.area.value = record.area || "";
      refreshSubAreas();
      form.elements.subArea.value = record.subArea || "";
      refreshStations();
      form.elements.stationId.value = record.stationId || "";
      updateStationName();
      form.elements.vehicleModel.value = record.vehicleModel || "";
      form.elements.sequenceId.value = record.sequenceId || "";
      form.elements.sequenceName.value = record.sequenceName || "";
      form.elements.sequenceDescription.value =
        record.sequenceDescription || "";
      form.elements.partName.value = record.partName || "";
      updateImagePreview(record.imagePreviewUrl || "", record.imageName || "");
      seqStatusInput.value = record.recordStatus || "Saved";
    };

    const deleteSequenceById = (sequenceId, source = "form") => {
      const next = state.stationSequences.filter(
        (item) => item.sequenceId !== sequenceId,
      );
      if (next.length === state.stationSequences.length) {
        setModuleNotice("Sequence ID not found.", "error");
        return;
      }

      state.stationSequences = next;
      saveState(STORAGE_KEYS.stationSequences, state.stationSequences);
      openModule("station-seq", {
        message:
          source === "table"
            ? "Sequence deleted from table successfully."
            : "Sequence deleted successfully.",
      });
    };

    regionSelect.addEventListener("change", refreshPlants);
    plantSelect.addEventListener("change", refreshAreas);
    areaSelect.addEventListener("change", refreshSubAreas);
    subAreaSelect.addEventListener("change", refreshStations);
    stationIdSelect.addEventListener("change", () => {
      updateStationName();
      autoFillSequenceContext();
    });

    imageInput.addEventListener("change", () => {
      const picked = imageInput.files && imageInput.files[0];
      if (!picked) {
        updateImagePreview("", "");
        return;
      }

      if (!validateImage(picked)) {
        imageInput.value = "";
        updateImagePreview("", "");
        return;
      }

      clearObjectPreview();
      seqImageObjectUrl = URL.createObjectURL(picked);
      updateImagePreview(seqImageObjectUrl, picked.name);
    });

    imagePreview.addEventListener("click", () => {
      if (
        imageLightbox &&
        imageLightboxImage &&
        !imagePreview.classList.contains("hidden") &&
        imagePreview.src
      ) {
        openImageLightbox(imagePreview.src);
      }
    });

    imageLightboxBackdrop?.addEventListener("click", closeImageLightbox);
    imageLightboxClose?.addEventListener("click", closeImageLightbox);

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        imageLightbox &&
        !imageLightbox.classList.contains("hidden")
      ) {
        closeImageLightbox();
      }
    });

    addSequenceBtn.addEventListener("click", () => {
      // Use last-saved context (survives re-render) or current dropdown values
      const ctx = lastSeqStationContext || {
        region: regionSelect.value,
        plant: plantSelect.value,
        area: areaSelect.value,
        subArea: subAreaSelect.value,
        stationId: stationIdSelect.value,
      };

      form.reset();
      refreshPlants();

      // Restore station context dropdowns
      if (ctx.region) {
        regionSelect.value = ctx.region;
        refreshPlants();
        plantSelect.value = ctx.plant;
        refreshAreas();
        areaSelect.value = ctx.area;
        refreshSubAreas();
        subAreaSelect.value = ctx.subArea;
        refreshStations();
        stationIdSelect.value = ctx.stationId;
        updateStationName();
      }

      const nextId = `SEQ-${state.stationSequences.length + 1}`;
      form.elements.sequenceId.value = nextId;
      form.elements.sequenceName.value = "";
      form.elements.sequenceDescription.value = "";
      form.elements.partName.value = "";
      seqStatusInput.value = "Saved";
      updateImagePreview("", "");
      setModuleNotice(
        "New sequence form ready. Station context preserved.",
        "success",
      );
    });

    saveBtn.addEventListener("click", async () => {
      const data = new FormData(form);
      const imageFile = data.get("image");
      if (!validateImage(imageFile)) {
        return;
      }
      // Capture station context before save re-renders the module
      lastSeqStationContext = {
        region: regionSelect.value,
        plant: plantSelect.value,
        area: areaSelect.value,
        subArea: subAreaSelect.value,
        stationId: stationIdSelect.value,
      };
      const record = await toRecord(data, "Saved");
      seqStatusInput.value = "Saved";
      saveSequence(record, false);
    });

    draftBtn.addEventListener("click", async () => {
      const data = new FormData(form);
      const imageFile = data.get("image");
      if (!validateImage(imageFile)) {
        return;
      }
      lastSeqStationContext = {
        region: regionSelect.value,
        plant: plantSelect.value,
        area: areaSelect.value,
        subArea: subAreaSelect.value,
        stationId: stationIdSelect.value,
      };
      const record = await toRecord(data, "Draft");
      seqStatusInput.value = "Draft";
      saveSequence(record, true);
    });

    cancelBtn.addEventListener("click", () => {
      form.reset();
      refreshPlants();
      seqStatusInput.value = "Saved";
      updateImagePreview("", "");
      setModuleNotice("Sequence entry cleared.", "success");
    });

    editBtn.addEventListener("click", () => {
      const sequenceId = form.elements.sequenceId.value.trim();
      if (!sequenceId) {
        setModuleNotice("Enter Sequence ID to edit.", "error");
        return;
      }

      const record = state.stationSequences.find(
        (item) => item.sequenceId === sequenceId,
      );
      if (!record) {
        setModuleNotice("Sequence ID not found.", "error");
        return;
      }

      fillForm(record);
      setModuleNotice(
        "Sequence loaded. Update fields and click Save.",
        "success",
      );
    });

    deleteBtn.addEventListener("click", () => {
      const sequenceId = form.elements.sequenceId.value.trim();
      if (!sequenceId) {
        setModuleNotice("Enter Sequence ID to delete.", "error");
        return;
      }

      const confirmed = window.confirm(
        `Delete sequence ${sequenceId}? This action cannot be undone.`,
      );
      if (!confirmed) {
        setModuleNotice("Delete cancelled.", "success");
        return;
      }

      deleteSequenceById(sequenceId, "form");
    });

    stationTable.addEventListener("click", (event) => {
      const actionButton = event.target.closest("button[data-row-action]");
      if (!actionButton) {
        return;
      }

      const action = actionButton.dataset.rowAction;
      const sequenceId = actionButton.dataset.sequenceId;
      if (!sequenceId) {
        return;
      }

      const record = state.stationSequences.find(
        (item) => item.sequenceId === sequenceId,
      );
      if (!record) {
        setModuleNotice("Sequence ID not found.", "error");
        return;
      }

      if (action === "edit") {
        fillForm(record);
        setModuleNotice(
          "Sequence loaded from table. Update fields and click Save.",
          "success",
        );
      }

      if (action === "delete") {
        const confirmed = window.confirm(
          `Delete sequence ${sequenceId}? This action cannot be undone.`,
        );
        if (!confirmed) {
          setModuleNotice("Delete cancelled.", "success");
          return;
        }

        deleteSequenceById(sequenceId, "table");
      }
    });

    importBtn.addEventListener("click", () => {
      importInput.click();
    });

    importInput.addEventListener("change", async () => {
      const file = importInput.files && importInput.files[0];
      if (!file) {
        return;
      }

      try {
        const text = await readFileAsText(file);
        const rows = parseTableRows(text);
        const imported = rowsToRecords(
          rows,
          STATION_SEQUENCE_COLUMNS,
          "sequenceId",
        ).map((record) => ({
          region: record.region,
          plant: record.plant,
          area: record.area,
          subArea: record.subArea,
          stationId: record.stationId,
          stationName: record.stationName,
          vehicleModel: record.vehicleModel,
          sequenceId: record.sequenceId,
          sequenceName: record.sequenceName,
          sequenceDescription: record.sequenceDescription,
          partName: record.partName,
          imageName: record.imageName,
          imagePreviewUrl: resolveStoredImagePreview(
            record.imageName,
            record.partName,
            record.sequenceId,
          ),
          comments: "",
          recordStatus: toRecordStatus(record.recordStatus),
        }));

        if (!imported.length) {
          setModuleNotice(
            "No valid sequence records found. Ensure Sequence ID column has values.",
            "error",
          );
          return;
        }

        state.stationSequences = upsertByKey(
          state.stationSequences,
          imported,
          "sequenceId",
        );
        saveState(STORAGE_KEYS.stationSequences, state.stationSequences);
        openModule("station-seq", {
          message: `${imported.length} sequence records imported successfully.`,
        });
      } catch (_error) {
        setModuleNotice(
          "Import failed. Use CSV or XLS generated from this app format.",
          "error",
        );
      } finally {
        importInput.value = "";
      }
    });

    downloadCsvBtn.addEventListener("click", () => {
      if (!state.stationSequences.length) {
        setModuleNotice("No sequence data available for export.", "error");
        return;
      }

      const csv = buildCsv(STATION_SEQUENCE_COLUMNS, state.stationSequences);
      downloadBlobFile(
        csv,
        "station_sequence_configuration.csv",
        "text/csv;charset=utf-8;",
      );
      setModuleNotice("Station sequence CSV downloaded.", "success");
    });

    downloadExcelBtn.addEventListener("click", () => {
      if (!state.stationSequences.length) {
        setModuleNotice("No sequence data available for export.", "error");
        return;
      }

      const html = buildExcelHtmlTable(
        STATION_SEQUENCE_COLUMNS,
        state.stationSequences,
      );
      downloadBlobFile(
        html,
        "station_sequence_configuration.xls",
        "application/vnd.ms-excel;charset=utf-8;",
      );
      setModuleNotice("Station sequence Excel downloaded.", "success");
    });

    refreshPlants();
  }

  if (moduleId === "station-inspection") {
    const form = document.getElementById("inspectionForm");
    const regionSelect = document.getElementById("inspectionRegion");
    const plantSelect = document.getElementById("inspectionPlant");
    const areaSelect = document.getElementById("inspectionArea");
    const subAreaSelect = document.getElementById("inspectionSubArea");
    const stationIdSelect = document.getElementById("inspectionStationId");
    const stationNameInput = document.getElementById("inspectionStationName");
    const vehicleModelInput = document.getElementById("inspectionVehicleModel");
    const vinInput = document.getElementById("inspectionVin");
    const inspectionPageLabel = document.getElementById("inspectionPageLabel");
    const openPartPageBtn = document.getElementById("openPartPageBtn");
    const partPage = document.getElementById("inspectionPartPage");
    const backToVehiclePageBtn = document.getElementById(
      "backToVehiclePageBtn",
    );
    const sequenceIdInput = document.getElementById("inspectionSequenceId");
    const sequenceNameInput = document.getElementById("inspectionSequenceName");
    const sequenceDescriptionInput = document.getElementById(
      "inspectionSequenceDescription",
    );
    const partFilterSelect = document.getElementById("inspectionPartFilter");
    const processStepInput = document.getElementById("inspectionProcessStep");
    const phaseTitle = document.getElementById("inspectionPhaseTitle");
    const sequenceTracker = document.getElementById(
      "inspectionSequenceTracker",
    );
    const partNameInput = document.getElementById("inspectionPartName");
    const checkTypeBadge = document.getElementById("inspectionCheckType");
    const imageInput = document.getElementById("inspectionImage");
    const imagePreview = document.getElementById("inspectionImagePreview");
    const imagePreviewNote = document.getElementById(
      "inspectionImagePreviewNote",
    );
    const imageLightbox = document.getElementById("imageLightbox");
    const imageLightboxBackdrop = document.getElementById(
      "imageLightboxBackdrop",
    );
    const imageLightboxClose = document.getElementById("imageLightboxClose");
    const imageLightboxImage = document.getElementById("imageLightboxImage");
    const historyTable = document.getElementById("inspectionHistoryTable");
    const editKeyInput = document.getElementById("inspectionEditKey");
    const resultGoodInput = form.elements.resultGood;
    const resultBadInput = form.elements.resultBad;
    const scanBtn = document.getElementById("scanBarcodeBtn");
    const saveBtn = document.getElementById("saveInspectionBtn");
    const nextBtn = document.getElementById("nextInspectionBtn");
    const submitBtn = document.getElementById("submitInspectionBtn");
    const cancelBtn = document.getElementById("cancelInspectionBtn");
    const initChecksOverlay = document.getElementById("initChecksOverlay");
    const inspectionFormBody = document.getElementById("inspectionFormBody");
    const initChecksTitle = document.querySelector(
      "#initChecksOverlay .init-checks-title",
    );
    const beginInspectionBtn = document.getElementById("beginInspectionBtn");
    const mobileSyncBadge = document.getElementById("mobileSyncBadge");
    const mobileContextBar = document.getElementById("mobileContextBar");
    const mobileContextSummary = document.getElementById(
      "mobileContextSummary",
    );
    const toggleContextBtn = document.getElementById("toggleContextBtn");
    const mobileOperatorHeader = document.getElementById(
      "mobileOperatorHeader",
    );
    const mobileHeaderVin = document.getElementById("mobileHeaderVin");
    const mobileHeaderStation = document.getElementById("mobileHeaderStation");
    const mobileHeaderPhase = document.getElementById("mobileHeaderPhase");
    const mobileHeaderStep = document.getElementById("mobileHeaderStep");
    const mobileTrackerCompact = document.getElementById(
      "mobileTrackerCompact",
    );
    const sequenceProgress = document.getElementById(
      "inspectionSequenceProgress",
    );
    const sequenceProgressBar = document.getElementById(
      "inspectionSequenceProgressBar",
    );
    const mobileKpiRow = document.getElementById("mobileKpiRow");
    const vehicleElapsedKpi = document.getElementById("vehicleElapsedKpi");
    const partElapsedKpi = document.getElementById("partElapsedKpi");
    const mobileResultToggle = document.getElementById("mobileResultToggle");
    const markGoodBtn = document.getElementById("markGoodBtn");
    const markBadBtn = document.getElementById("markBadBtn");
    const inspectionActionBar = document.getElementById("inspectionActionBar");
    const initPrioritySection = document.getElementById("initPrioritySection");
    const initRegularSection = document.getElementById("initRegularSection");
    const initPriorityList = document.getElementById("initPriorityList");
    const initRegularList = document.getElementById("initRegularList");

    const requiredElements = {
      form,
      regionSelect,
      plantSelect,
      areaSelect,
      subAreaSelect,
      stationIdSelect,
      stationNameInput,
      vehicleModelInput,
      vinInput,
      inspectionPageLabel,
      openPartPageBtn,
      partPage,
      backToVehiclePageBtn,
      sequenceIdInput,
      sequenceNameInput,
      sequenceDescriptionInput,
      partFilterSelect,
      processStepInput,
      phaseTitle,
      sequenceTracker,
      partNameInput,
      checkTypeBadge,
      imageInput,
      imagePreview,
      imagePreviewNote,
      editKeyInput,
      resultGoodInput,
      resultBadInput,
      scanBtn,
      saveBtn,
      nextBtn,
      submitBtn,
      cancelBtn,
    };
    const missingRequired = Object.entries(requiredElements)
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missingRequired.length) {
      const noticeEl = document.getElementById("moduleNotice");
      if (noticeEl) {
        noticeEl.className = "notice error";
        noticeEl.textContent = `App error: missing UI elements (${missingRequired.join(", ")}). Please reload the page.`;
      }
      console.error(
        "station-inspection initialization skipped; missing elements:",
        missingRequired,
      );
      return;
    }

    // ═══════════════════════════════════════════════════════════════
    // MOBILE INSPECTION ENTRY: Show simplified entry on mobile
    // ═══════════════════════════════════════════════════════════════
    if (window.matchMedia("(max-width: 640px)").matches) {
      showMobileInspectionEntry();
      return;
    }

    if (
      !imageLightbox ||
      !imageLightboxBackdrop ||
      !imageLightboxClose ||
      !imageLightboxImage
    ) {
      console.warn(
        "Image lightbox elements missing; lightbox preview disabled.",
      );
    }

    const resetSelect = (select, text) => {
      select.innerHTML = `<option value="" selected>${text}</option>`;
    };

    let inspectionImageObjectUrl = null;

    const clearInspectionObjectPreview = () => {
      if (inspectionImageObjectUrl) {
        URL.revokeObjectURL(inspectionImageObjectUrl);
        inspectionImageObjectUrl = null;
      }
    };

    const showInitOverlay = (show) => {
      initChecksOverlay?.classList.toggle("hidden", !show);
      inspectionFormBody?.classList.toggle("hidden", show);
    };

    const populateInitOverlay = () => {
      const prioritySeqs = inspectionUiState.prioritySequences;
      const regularSeqs = inspectionUiState.regularSequences;

      if (initChecksTitle) {
        initChecksTitle.textContent = "Initialize Sequence";
      }

      // Deduplicate by partName for display
      const uniqueParts = (seqs) => {
        const seen = new Set();
        return seqs.filter((s) => {
          if (seen.has(s.partName)) return false;
          seen.add(s.partName);
          return true;
        });
      };

      const priorityParts = uniqueParts(prioritySeqs);
      const regularParts = uniqueParts(regularSeqs);

      if (initPrioritySection && initPriorityList) {
        initPrioritySection.classList.toggle(
          "hidden",
          priorityParts.length === 0,
        );
        initPriorityList.innerHTML = priorityParts
          .map(
            (s, i) =>
              `<li><strong>${i + 1}.</strong> ${sanitize(s.partName)}</li>`,
          )
          .join("");
      }
      if (initRegularSection && initRegularList) {
        initRegularSection.classList.toggle(
          "hidden",
          regularParts.length === 0,
        );
        initRegularList.innerHTML = regularParts
          .map(
            (s, i) =>
              `<li><strong>${i + 1}.</strong> ${sanitize(s.partName)}</li>`,
          )
          .join("");
      }
    };

    const showPartPage = (show) => {
      partPage.classList.toggle("hidden", !show);
      inspectionPageLabel.textContent = show
        ? "Page 2 of 2: Part / Sequence Details"
        : "Page 1 of 2: Vehicle Details";
      updateMobileHeader(sequenceFlow().length);
    };

    const initializeInspectionPlan = (vehicleModel) => {
      const baseSeqs = baseStationSequences();
      const defects = modelDefectTokens(vehicleModel);

      inspectionUiState.priorityPhaseCompleted = false;

      if (defects.hasDefects) {
        inspectionUiState.prioritySequences = baseSeqs.filter((item) => {
          const seqToken = normalizeReferenceToken(item.sequenceId);
          const partToken = normalizeReferenceToken(item.partName);
          return (
            defects.sequenceIdTokens.has(seqToken) ||
            defects.partNameTokens.has(partToken)
          );
        });
        inspectionUiState.regularSequences = baseSeqs.filter((item) => {
          const seqToken = normalizeReferenceToken(item.sequenceId);
          const partToken = normalizeReferenceToken(item.partName);
          return !(
            defects.sequenceIdTokens.has(seqToken) ||
            defects.partNameTokens.has(partToken)
          );
        });
        inspectionUiState.currentPhase =
          inspectionUiState.prioritySequences.length > 0
            ? "priority"
            : "regular";
        if (inspectionUiState.prioritySequences.length === 0) {
          inspectionUiState.priorityPhaseCompleted = true;
        }
        return;
      }

      inspectionUiState.prioritySequences = [];
      inspectionUiState.regularSequences = baseSeqs;
      inspectionUiState.currentPhase = "regular";
      inspectionUiState.priorityPhaseCompleted = true;
    };

    const getInspectionSessionKey = (record) => {
      if (!record) {
        return "";
      }

      if (record.inspectionBatchKey) {
        return record.inspectionBatchKey;
      }

      const match = String(record.inspectionKey || "").match(
        /^(.*)_(priority|regular)_[^_]+$/,
      );
      return match ? match[1] : String(record.inspectionKey || "");
    };

    const resetPartFlow = () => {
      resetSelect(partFilterSelect, "All Parts (Sequential)");
      processStepInput.value = "";
      inspectionUiState.priorityPhaseCompleted = false;
    };

    const isLeftDoorHandleContext = (imageNameHint = "") => {
      const currentSequence =
        sequenceFlow()[inspectionUiState.currentSequenceIndex] || null;
      const tokens = [
        partNameInput.value,
        sequenceIdInput.value,
        sequenceNameInput.value,
        sequenceDescriptionInput.value,
        imageInput.value,
        imageNameHint,
        currentSequence?.partName,
        currentSequence?.sequenceId,
        currentSequence?.sequenceName,
        currentSequence?.sequenceDescription,
        currentSequence?.imageName,
      ]
        .map((value) => normalizeReferenceToken(value))
        .filter(Boolean);

      return tokens.some(
        (token) => token === "part001" || token.includes("leftdoorhandle"),
      );
    };

    const isRightDoorTrimContext = (imageNameHint = "") => {
      const currentSequence =
        sequenceFlow()[inspectionUiState.currentSequenceIndex] || null;
      const tokens = [
        partNameInput.value,
        sequenceIdInput.value,
        sequenceNameInput.value,
        sequenceDescriptionInput.value,
        imageInput.value,
        imageNameHint,
        currentSequence?.partName,
        currentSequence?.sequenceId,
        currentSequence?.sequenceName,
        currentSequence?.sequenceDescription,
        currentSequence?.imageName,
      ]
        .map((value) => normalizeReferenceToken(value))
        .filter(Boolean);

      return tokens.some(
        (token) => token === "part002" || token.includes("rightdoortrim"),
      );
    };

    const isFrontBumperContext = (imageNameHint = "") => {
      const currentSequence =
        sequenceFlow()[inspectionUiState.currentSequenceIndex] || null;
      const tokens = [
        partNameInput.value,
        sequenceIdInput.value,
        sequenceNameInput.value,
        sequenceDescriptionInput.value,
        imageInput.value,
        imageNameHint,
        currentSequence?.partName,
        currentSequence?.sequenceId,
        currentSequence?.sequenceName,
        currentSequence?.sequenceDescription,
        currentSequence?.imageName,
      ]
        .map((value) => normalizeReferenceToken(value))
        .filter(Boolean);

      return tokens.some(
        (token) => token === "part003" || token.includes("frontbumper"),
      );
    };

    const isHoodPanelContext = (imageNameHint = "") => {
      const currentSequence =
        sequenceFlow()[inspectionUiState.currentSequenceIndex] || null;
      const tokens = [
        partNameInput.value,
        sequenceIdInput.value,
        sequenceNameInput.value,
        sequenceDescriptionInput.value,
        imageInput.value,
        imageNameHint,
        currentSequence?.partName,
        currentSequence?.sequenceId,
        currentSequence?.sequenceName,
        currentSequence?.sequenceDescription,
        currentSequence?.imageName,
      ]
        .map((value) => normalizeReferenceToken(value))
        .filter(Boolean);

      return tokens.some(
        (token) => token === "part004" || token.includes("hoodpanel"),
      );
    };

    const makePartContext =
      (tokenFn) =>
      (imageNameHint = "") => {
        const currentSequence =
          sequenceFlow()[inspectionUiState.currentSequenceIndex] || null;
        const tokens = [
          partNameInput.value,
          sequenceIdInput.value,
          sequenceNameInput.value,
          sequenceDescriptionInput.value,
          imageInput.value,
          imageNameHint,
          currentSequence?.partName,
          currentSequence?.sequenceId,
          currentSequence?.sequenceName,
          currentSequence?.sequenceDescription,
          currentSequence?.imageName,
        ]
          .map((value) => normalizeReferenceToken(value))
          .filter(Boolean);
        return tokens.some((token) => tokenFn(token));
      };

    const isRightFrontFenderContext = makePartContext(
      (t) =>
        t === "part005" ||
        t.includes("rightfrontfender") ||
        t.includes("frontfender"),
    );
    const isRearBumperContext = makePartContext(
      (t) => t === "part006" || t.includes("rearbumper"),
    );
    const isRearSpoilerContext = makePartContext(
      (t) => t === "part007" || t.includes("rearspoiler"),
    );
    const isRightTailLampContext = makePartContext(
      (t) =>
        t === "part008" ||
        t.includes("righttaillamp") ||
        t.includes("taillamp"),
    );

    const isReferenceImageContext = (imageNameHint = "") =>
      isLeftDoorHandleContext(imageNameHint) ||
      isRightDoorTrimContext(imageNameHint) ||
      isFrontBumperContext(imageNameHint) ||
      isHoodPanelContext(imageNameHint) ||
      isRightFrontFenderContext(imageNameHint) ||
      isRearBumperContext(imageNameHint) ||
      isRearSpoilerContext(imageNameHint) ||
      isRightTailLampContext(imageNameHint);

    const updateInspectionImagePreview = (previewUrl, imageName) => {
      if (!isReferenceImageContext(imageName)) {
        imagePreview.classList.add("hidden");
        imagePreview.removeAttribute("src");
        imagePreviewNote.textContent =
          "Reference image is shown for Left Door Handle, Right Door Trim, Front Bumper, Hood Panel, Right Front Fender, Rear Bumper, Rear Spoiler, and Right Tail Lamp.";
        return;
      }

      const showRightDoorTrim = isRightDoorTrimContext(imageName);
      const showFrontBumper = isFrontBumperContext(imageName);
      const showHoodPanel = isHoodPanelContext(imageName);
      const showRightFrontFender = isRightFrontFenderContext(imageName);
      const showRearBumper = isRearBumperContext(imageName);
      const showRearSpoiler = isRearSpoilerContext(imageName);
      const showRightTailLamp = isRightTailLampContext(imageName);
      const safePreviewUrl = isSvgPlaceholderPreview(previewUrl)
        ? ""
        : previewUrl;
      const resolvedPreviewUrl =
        safePreviewUrl ||
        resolveStoredImagePreview(
          imageName,
          partNameInput.value,
          sequenceIdInput.value,
        ) ||
        (showRightTailLamp
          ? resolveRightTailLampImagePreview()
          : showRearSpoiler
            ? resolveRearSpoilerImagePreview()
            : showRearBumper
              ? resolveRearBumperImagePreview()
              : showRightFrontFender
                ? resolveRightFrontFenderImagePreview()
                : showHoodPanel
                  ? resolveHoodPanelImagePreview()
                  : showFrontBumper
                    ? resolveFrontBumperImagePreview()
                    : showRightDoorTrim
                      ? resolveRightDoorTrimImagePreview()
                      : resolveLeftDoorImagePreview());
      const candidates = showRightTailLamp
        ? resolveRightTailLampImagePreviewCandidates(
            resolvedPreviewUrl,
            imageName,
          )
        : showRearSpoiler
          ? resolveRearSpoilerImagePreviewCandidates(
              resolvedPreviewUrl,
              imageName,
            )
          : showRearBumper
            ? resolveRearBumperImagePreviewCandidates(
                resolvedPreviewUrl,
                imageName,
              )
            : showRightFrontFender
              ? resolveRightFrontFenderImagePreviewCandidates(
                  resolvedPreviewUrl,
                  imageName,
                )
              : showHoodPanel
                ? resolveHoodPanelImagePreviewCandidates(
                    resolvedPreviewUrl,
                    imageName,
                  )
                : showFrontBumper
                  ? resolveFrontBumperImagePreviewCandidates(
                      resolvedPreviewUrl,
                      imageName,
                    )
                  : showRightDoorTrim
                    ? resolveRightDoorTrimImagePreviewCandidates(
                        resolvedPreviewUrl,
                        imageName,
                      )
                    : resolveLeftDoorImagePreviewCandidates(
                        resolvedPreviewUrl,
                        imageName,
                      );

      const pending = [...candidates];
      const tryNext = () => {
        const candidate = pending.shift();
        if (!candidate) {
          imagePreview.classList.add("hidden");
          imagePreview.removeAttribute("src");
          imagePreviewNote.textContent = imageName
            ? `Image file: ${imageName} (preview unavailable)`
            : "No image available for this part.";
          return;
        }

        imagePreview.onload = () => {
          imagePreview.onload = null;
          imagePreview.onerror = null;
          imagePreview.classList.remove("hidden");
          imagePreviewNote.textContent = "Click image to enlarge.";
        };
        imagePreview.onerror = () => {
          imagePreview.onload = null;
          imagePreview.onerror = null;
          tryNext();
        };
        imagePreview.src = candidate;
      };

      tryNext();
    };

    const validateInspectionImage = (file) => {
      if (!file) {
        return true;
      }

      const okType = /\.(jpg|jpeg|png)$/i.test(file.name);
      if (!okType) {
        setModuleNotice("Image must be jpg, jpeg, or png.", "error");
      }
      return okType;
    };

    const fileToDataUrl = (file) =>
      new Promise((resolve, reject) => {
        if (!file || !file.name) {
          resolve("");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Unable to read image file."));
        reader.readAsDataURL(file);
      });

    const closeImageLightbox = () => {
      imageLightbox.classList.add("hidden");
      imageLightboxImage.removeAttribute("src");
    };

    const openImageLightbox = (src) => {
      if (!src) {
        return;
      }
      imageLightboxImage.src = src;
      imageLightbox.classList.remove("hidden");
    };

    const resetSequenceDisplays = () => {
      stationNameInput.value = "";
      sequenceIdInput.value = "";
      sequenceNameInput.value = "";
      sequenceDescriptionInput.value = "";
      partNameInput.value = "";
      imageInput.value = "";
      clearInspectionObjectPreview();
      updateInspectionImagePreview("", "");
      processStepInput.value = "";
      inspectionUiState.currentSequenceIndex = 0;
    };

    const refreshSubAreas = () => {
      resetSelect(subAreaSelect, "Select Sub Area");
      (SUBAREA_OPTIONS[areaSelect.value] || []).forEach((subArea) => {
        subAreaSelect.innerHTML += `<option value="${sanitize(subArea)}">${sanitize(subArea)}</option>`;
      });
      stationIdSelect.value = "";
      resetPartFlow();
      resetSequenceDisplays();
    };

    const refreshPlants = () => {
      resetSelect(plantSelect, "Select Plant");
      (REGION_PLANT_OPTIONS[regionSelect.value] || []).forEach((plant) => {
        plantSelect.innerHTML += `<option value="${sanitize(plant)}">${sanitize(plant)}</option>`;
      });

      areaSelect.value = "";
      resetSelect(subAreaSelect, "Select Sub Area");
      stationIdSelect.value = "";
      resetPartFlow();
      resetSequenceDisplays();
    };

    const findStationConfig = () =>
      state.stationConfigs.find(
        (item) =>
          item.region === regionSelect.value &&
          item.plant === plantSelect.value &&
          item.area === areaSelect.value &&
          item.subArea === subAreaSelect.value &&
          item.stationId === stationIdSelect.value,
      );

    const matchingSequences = () =>
      state.stationSequences
        .filter(
          (item) =>
            item.region === regionSelect.value &&
            item.plant === plantSelect.value &&
            item.area === areaSelect.value &&
            item.subArea === subAreaSelect.value &&
            item.stationId === stationIdSelect.value,
        )
        .sort((left, right) => {
          const leftPart = left.partName || "";
          const rightPart = right.partName || "";
          const partOrder = leftPart.localeCompare(rightPart);
          if (partOrder !== 0) {
            return partOrder;
          }

          return left.sequenceId.localeCompare(right.sequenceId, undefined, {
            numeric: true,
          });
        });

    const demoSequencesForStation = () => {
      const stationId = stationIdSelect.value || "ST-001";
      return [
        {
          sequenceId: "PART-001",
          sequenceName: "Left Door Handle Scratch Check",
          sequenceDescription:
            "Verify scratch depth and edge quality on left door handle.",
          partName: "Left Door Handle",
          imageName: "left-door-handle.jpg",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-002",
          sequenceName: "Right Door Trim Surface Check",
          sequenceDescription:
            "Inspect right door trim for dents and paint mismatch.",
          partName: "Right Door Trim",
          imageName: "right-door-trim.jpg",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-003",
          sequenceName: "Front Bumper Gap Alignment",
          sequenceDescription:
            "Check front bumper gap and clip locking condition.",
          partName: "Front Bumper",
          imageName: "front-bumper.jpg",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-004",
          sequenceName: "Hood Paint Finish Check",
          sequenceDescription:
            "Validate paint finish consistency and dust marks.",
          partName: "Hood Panel",
          imageName: "hood-panel.jpg",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-005",
          sequenceName: "Right Front Fender Panel Check",
          sequenceDescription:
            "Check right front fender for panel gaps, paint consistency, and dents.",
          partName: "Right Front Fender",
          imageName: "right-front-fender.png",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-006",
          sequenceName: "Rear Bumper Clip & Gap Check",
          sequenceDescription:
            "Inspect rear bumper clip engagement and gap alignment.",
          partName: "Rear Bumper",
          imageName: "rear-bumper.png",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-007",
          sequenceName: "Rear Spoiler Alignment Check",
          sequenceDescription:
            "Validate rear spoiler fitment, alignment, and finish quality.",
          partName: "Rear Spoiler",
          imageName: "rear-spoiler.png",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
        {
          sequenceId: "PART-008",
          sequenceName: "Right Tail Lamp Seal & Fitment",
          sequenceDescription:
            "Check right tail lamp seal integrity and housing fitment.",
          partName: "Right Tail Lamp",
          imageName: "right-tail-lamp.png",
          vehicleModel: "Scanned Model",
          stationId,
          recordStatus: "Demo",
        },
      ];
    };

    const baseStationSequences = () => {
      const configured = matchingSequences();
      return configured.length ? configured : demoSequencesForStation();
    };

    const modelDefectTokens = (vehicleModel) => {
      const normalizedModel = normalizeName(vehicleModel);
      if (!normalizedModel) {
        return {
          hasDefects: false,
          sequenceIdTokens: new Set(),
          partNameTokens: new Set(),
        };
      }

      const defectRecords = state.inspections.filter(
        (item) =>
          normalizeName(item.vehicleModel) === normalizedModel &&
          item.resultBad,
      );

      return {
        hasDefects: defectRecords.length > 0,
        sequenceIdTokens: new Set(
          defectRecords
            .map((item) => normalizeReferenceToken(item.sequenceId))
            .filter(Boolean),
        ),
        partNameTokens: new Set(
          defectRecords
            .map((item) => normalizeReferenceToken(item.partName))
            .filter(Boolean),
        ),
      };
    };

    const prioritizeSequencesForModel = (sequences, vehicleModel) => {
      const defects = modelDefectTokens(vehicleModel);
      if (!defects.hasDefects) {
        return sequences.map((item) => ({
          ...item,
          _isPriorityCheck: false,
        }));
      }

      const annotated = sequences.map((item, index) => {
        const seqToken = normalizeReferenceToken(item.sequenceId);
        const partToken = normalizeReferenceToken(item.partName);
        const isPriority =
          defects.sequenceIdTokens.has(seqToken) ||
          defects.partNameTokens.has(partToken);

        return {
          ...item,
          _isPriorityCheck: isPriority,
          _baseOrder: index,
        };
      });

      return annotated.sort((left, right) => {
        if (left._isPriorityCheck !== right._isPriorityCheck) {
          return left._isPriorityCheck ? -1 : 1;
        }

        return (left._baseOrder || 0) - (right._baseOrder || 0);
      });
    };

    const activeSequences = () =>
      prioritizeSequencesForModel(
        baseStationSequences(),
        vehicleModelInput.value,
      );

    const decodePartFilterSelection = () => {
      const rawValue = partFilterSelect.value;
      if (!rawValue || !rawValue.includes("::")) {
        return {
          phase: inspectionUiState.currentPhase,
          partName: rawValue,
        };
      }

      const [phase, ...partNameParts] = rawValue.split("::");
      return {
        phase,
        partName: partNameParts.join("::"),
      };
    };

    const refreshPartFilter = () => {
      const currentPhase = inspectionUiState.currentPhase;
      const phaseSequences =
        currentPhase === "priority"
          ? inspectionUiState.prioritySequences
          : inspectionUiState.regularSequences;
      const currentIndex = Math.min(
        inspectionUiState.currentSequenceIndex,
        Math.max(phaseSequences.length - 1, 0),
      );
      const currentSequence = phaseSequences[currentIndex] || null;
      const phaseLabel = currentPhase === "priority" ? "Priority" : "Regular";
      const displayedPartLabel = currentSequence?.partName
        ? `${currentSequence.partName} (${phaseLabel})`
        : "No Part Available";

      partFilterSelect.innerHTML = `<option value="" selected>${sanitize(displayedPartLabel)}</option>`;
      partFilterSelect.value = "";
      partFilterSelect.disabled = true;
    };

    const sequenceFlow = () => {
      const selectedPart = decodePartFilterSelection();
      const isPriorityPhase = inspectionUiState.currentPhase === "priority";
      const sequences = isPriorityPhase
        ? inspectionUiState.prioritySequences
        : inspectionUiState.regularSequences;

      if (!selectedPart.partName) {
        return sequences;
      }

      return sequences.filter(
        (item) => item.partName === selectedPart.partName,
      );
    };

    const hasCurrentResolution = () =>
      resultGoodInput.checked || resultBadInput.checked;

    const updateInspectionStepActions = (sequences) => {
      const count = sequences.length;
      const isLastStep =
        count > 0 && inspectionUiState.currentSequenceIndex === count - 1;
      const hasResolution = hasCurrentResolution();

      // Show Next when: not last step, OR last priority step with pending regular checks
      const hasPendingRegularPhase =
        inspectionUiState.currentPhase === "priority" &&
        inspectionUiState.regularSequences.length > 0;
      const showNext =
        count > 0 && hasResolution && (!isLastStep || hasPendingRegularPhase);
      nextBtn.classList.toggle("hidden", !showNext);
      nextBtn.disabled = !showNext;

      // Keep Submit consistently visible/clickable; submit handler enforces final validations.
      submitBtn.classList.remove("hidden");
      submitBtn.disabled = false;
    };

    const updateSequenceTracker = (sequences) => {
      const isPriorityPhase = inspectionUiState.currentPhase === "priority";
      phaseTitle.textContent = isPriorityPhase
        ? "Priority Quality Checks"
        : "Regular Quality Checks";
      checkTypeBadge.textContent = isPriorityPhase
        ? "Priority Check"
        : "Regular Check";

      if (!sequences.length) {
        sequenceTracker.textContent =
          "No sequence loaded. Select the station details and open the part page.";
        if (mobileTrackerCompact) {
          mobileTrackerCompact.textContent = "No part loaded";
        }
        if (sequenceProgressBar) {
          sequenceProgressBar.style.width = "0%";
        }
        updateMobileHeader(0);
        return;
      }

      const phaseLabel = isPriorityPhase
        ? "🔴 PRIORITY QUALITY CHECKS"
        : "🟢 REGULAR QUALITY CHECKS";
      const phaseDescription = isPriorityPhase
        ? "(Defect History Found - CHECK FIRST)"
        : "(No Defects - Standard Inspection)";

      if (rapidMobileMode) {
        const currentStep = inspectionUiState.currentSequenceIndex + 1;
        mobileTrackerCompact.textContent = `${phaseLabel} | Part ${currentStep} of ${sequences.length}`;
        if (sequenceProgressBar) {
          sequenceProgressBar.style.width = `${(currentStep / sequences.length) * 100}%`;
        }
        sequenceTracker.textContent = `${sequences[inspectionUiState.currentSequenceIndex]?.partName || "Part"} (${phaseLabel})`;
        updateMobileHeader(sequences.length);
        return;
      }

      sequenceTracker.textContent = `${phaseLabel} ${phaseDescription} — ${sequences
        .map((item, index) => {
          const stepNumber = index + 1;
          if (index < inspectionUiState.currentSequenceIndex) {
            return `${stepNumber}. ${item.partName} ✓`;
          }

          if (index === inspectionUiState.currentSequenceIndex) {
            return `${stepNumber}. ${item.partName} ◀`;
          }

          return `${stepNumber}. ${item.partName}`;
        })
        .join(" → ")}`;
      updateMobileHeader(sequences.length);
    };

    const getCurrentSequence = () => {
      const sequences = sequenceFlow();
      if (!sequences.length) {
        return null;
      }

      const sequenceIndex = Math.min(
        inspectionUiState.currentSequenceIndex,
        sequences.length - 1,
      );
      return sequences[sequenceIndex] || null;
    };

    const getSequenceAnswerKey = (
      sequence = getCurrentSequence(),
      phase = inspectionUiState.currentPhase,
      fallbackIndex = inspectionUiState.currentSequenceIndex,
    ) => {
      if (!sequence) {
        return `${phase}_${fallbackIndex}`;
      }

      const stableToken =
        sequence.sequenceId ||
        normalizeReferenceToken(sequence.partName) ||
        fallbackIndex;
      return `${phase}_${stableToken}`;
    };

    const applyCurrentSequence = () => {
      const stationConfig = findStationConfig();
      stationNameInput.value =
        stationConfig?.stationName || stationIdSelect.value;

      let sequences = sequenceFlow();
      if (!sequences.length) {
        if (
          inspectionUiState.currentPhase === "priority" &&
          inspectionUiState.regularSequences.length > 0
        ) {
          inspectionUiState.currentPhase = "regular";
          inspectionUiState.currentSequenceIndex = 0;
          partFilterSelect.value = "";
          refreshPartFilter();
          sequences = sequenceFlow();
        } else {
          resetSequenceDisplays();
        }
      }

      if (!sequences.length) {
        stationNameInput.value =
          stationConfig?.stationName || stationIdSelect.value;
        updateInspectionStepActions([]);
        updateSequenceTracker([]);
        return null;
      }

      if (inspectionUiState.currentSequenceIndex >= sequences.length) {
        inspectionUiState.currentSequenceIndex = 0;
      }

      // Keep the sequence-flow display aligned with the currently visible part.
      refreshPartFilter();

      const sequence = sequences[inspectionUiState.currentSequenceIndex];
      partStartMs = Date.now();
      const resolvedPreviewUrl =
        sequence.imagePreviewUrl ||
        resolveStoredImagePreview(
          sequence.imageName,
          sequence.partName,
          sequence.sequenceId,
        );
      sequenceIdInput.value = sequence.sequenceId || "";
      sequenceNameInput.value = sequence.sequenceName || "";
      sequenceDescriptionInput.value = sequence.sequenceDescription || "";
      partNameInput.value = sequence.partName || "";
      const partToken = normalizeReferenceToken(sequence.partName);
      if (
        partToken === "leftdoorhandle" ||
        partToken === "rightdoortrim" ||
        partToken === "frontbumper" ||
        partToken === "hoodpanel" ||
        isRightFrontFenderContext(sequence.imageName || sequence.partName) ||
        isRearBumperContext(sequence.imageName || sequence.partName) ||
        isRearSpoilerContext(sequence.imageName || sequence.partName) ||
        isRightTailLampContext(sequence.imageName || sequence.partName)
      ) {
        imageInput.value = sequence.imageName || "";
      } else {
        imageInput.value = "";
      }
      clearInspectionObjectPreview();
      updateInspectionImagePreview(
        resolvedPreviewUrl,
        sequence.imageName || "",
      );
      processStepInput.value = `${inspectionUiState.currentSequenceIndex + 1} / ${sequences.length}`;
      const answerKey = getSequenceAnswerKey(sequence);
      const savedAnswer = inspectionUiState.partAnswers[answerKey];
      resultGoodInput.checked = savedAnswer?.good || false;
      resultBadInput.checked = savedAnswer?.bad || false;
      form.elements.comments.value = savedAnswer?.comments || "";
      if (!vehicleModelInput.value) {
        vehicleModelInput.value = sequence.vehicleModel || "";
      }
      updateInspectionStepActions(sequences);
      updateSequenceTracker(sequences);
      startKpiTimer();

      const switchPhaseBtn = document.getElementById("switchPhaseBtn");
      const hasPriorityChecks = inspectionUiState.prioritySequences.length > 0;
      const hasRegularChecks = inspectionUiState.regularSequences.length > 0;
      if (
        switchPhaseBtn &&
        inspectionUiState.currentPhase === "priority" &&
        hasRegularChecks
      ) {
        switchPhaseBtn.classList.remove("hidden");
        switchPhaseBtn.textContent = `Skip to Regular Checks → (${inspectionUiState.regularSequences.length} parts)`;
      } else if (
        switchPhaseBtn &&
        inspectionUiState.currentPhase === "regular" &&
        hasPriorityChecks
      ) {
        switchPhaseBtn.classList.remove("hidden");
        switchPhaseBtn.textContent = `← Switch to Priority Checks (${inspectionUiState.prioritySequences.length} parts)`;
      } else if (switchPhaseBtn) {
        switchPhaseBtn.classList.add("hidden");
      }

      // ─────────────────────────────────────────────────────────
      // Update UX enhancements: context bar & progress bar
      // ─────────────────────────────────────────────────────────
      const vin = vinInput.value || "—";
      const partName = sequence.partName || "—";
      const currentIndex = inspectionUiState.currentSequenceIndex + 1;
      const totalParts = sequences.length;
      updateLiveContextBar(vin, partName, currentIndex, totalParts);

      // Estimate remaining time (assuming ~2 min per part)
      const partsRemaining = totalParts - currentIndex;
      const estSecRemaining = partsRemaining * 120; // 2 min per part
      updateProgressBar(currentIndex - 1, totalParts, estSecRemaining);

      return sequence;
    };

    const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length;

    const buildInspectionRecordFromSequence = (
      sequence,
      answer,
      phase,
      inspectionStatus,
      inspectionKeyBase,
    ) => {
      const data = new FormData(form);
      const sequenceToken =
        sequence.sequenceId ||
        normalizeReferenceToken(sequence.partName) ||
        "sequence";

      return {
        inspectionKey: `${inspectionKeyBase}_${phase}_${sequenceToken}`,
        inspectionBatchKey: inspectionKeyBase,
        region: data.get("region").toString().trim(),
        plant: data.get("plant").toString().trim(),
        area: data.get("area").toString().trim(),
        subArea: data.get("subArea").toString().trim(),
        stationId: data.get("stationId").toString().trim(),
        stationName: stationNameInput.value.trim(),
        vehicleModel: data.get("vehicleModel").toString().trim(),
        vin: data.get("vin").toString().trim(),
        sequenceId: (sequence.sequenceId || "").trim(),
        sequenceName: (sequence.sequenceName || "").trim(),
        sequenceDescription: (sequence.sequenceDescription || "").trim(),
        partName: (sequence.partName || "").trim(),
        imageName: sequence.imageName || "",
        imagePreviewUrl: sequence.imageName
          ? sequence.imagePreviewUrl ||
            resolveStoredImagePreview(
              sequence.imageName || "",
              sequence.partName || "",
              sequence.sequenceId || "",
            )
          : "",
        resultGood: Boolean(answer?.good),
        resultBad: Boolean(answer?.bad),
        comments: (answer?.comments || "").trim(),
        inspectionStatus,
        priorityCheck: Boolean(
          phase === "priority" || sequence?._isPriorityCheck,
        ),
        timestamp: new Date().toISOString(),
        sequenceSourceStatus: sequence.recordStatus || "Saved",
      };
    };

    const buildInspectionRecords = (inspectionStatus) => {
      saveCurrentAnswer();

      const inspectionKeyBase =
        editKeyInput.value.trim() ||
        `${vinInput.value.trim()}_${stationIdSelect.value}`;
      const allSequences = [
        ...inspectionUiState.prioritySequences.map((sequence, index) => ({
          sequence,
          phase: "priority",
          index,
        })),
        ...inspectionUiState.regularSequences.map((sequence, index) => ({
          sequence,
          phase: "regular",
          index,
        })),
      ];

      const answeredRecords = allSequences
        .map(({ sequence, phase, index }) => {
          const answer =
            inspectionUiState.partAnswers[
              getSequenceAnswerKey(sequence, phase, index)
            ];

          if (
            !answer ||
            (!answer.good && !answer.bad && !answer.comments?.trim())
          ) {
            return null;
          }

          return buildInspectionRecordFromSequence(
            sequence,
            answer,
            phase,
            inspectionStatus,
            inspectionKeyBase,
          );
        })
        .filter(Boolean);

      if (answeredRecords.length) {
        return answeredRecords;
      }

      const currentSequence = getCurrentSequence();
      if (!currentSequence) {
        return [];
      }

      return [
        buildInspectionRecordFromSequence(
          currentSequence,
          {
            good: resultGoodInput.checked,
            bad: resultBadInput.checked,
            comments: form.elements.comments.value,
          },
          inspectionUiState.currentPhase,
          inspectionStatus,
          inspectionKeyBase,
        ),
      ];
    };

    imagePreview.addEventListener("click", () => {
      if (!imagePreview.classList.contains("hidden") && imagePreview.src) {
        openImageLightbox(imagePreview.src);
      }
    });

    imageLightboxBackdrop?.addEventListener("click", closeImageLightbox);
    imageLightboxClose?.addEventListener("click", closeImageLightbox);

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        imageLightbox &&
        !imageLightbox.classList.contains("hidden")
      ) {
        closeImageLightbox();
      }
    });

    const persistInspection = (record) => {
      // Strip imagePreviewUrl before storing — images already live in referenceImages.
      // This prevents localStorage quota bloat from base64 image data.
      const { imagePreviewUrl, ...recordToStore } = record;

      const existingIndex = state.inspections.findIndex(
        (item) => item.inspectionKey === recordToStore.inspectionKey,
      );

      if (existingIndex >= 0) {
        state.inspections[existingIndex] = {
          ...state.inspections[existingIndex],
          ...recordToStore,
        };
      } else {
        state.inspections.push(recordToStore);
      }

      saveState(STORAGE_KEYS.inspections, state.inspections);
      if (imagePreviewUrl) {
        state.referenceImages = upsertReferenceImages(state.referenceImages, [
          {
            sequenceId: record.sequenceId,
            partName: record.partName,
            imageName: record.imageName,
            previewUrl: imagePreviewUrl,
          },
        ]);
        saveState(STORAGE_KEYS.referenceImages, state.referenceImages);
      }
    };

    const validateInspection = (record) => {
      if (
        !record.region ||
        !record.plant ||
        !record.area ||
        !record.subArea ||
        !record.stationId
      ) {
        setModuleNotice(
          "Region, Plant, Area, Sub Area, and Station ID are required.",
          "error",
        );
        return false;
      }

      if (!record.sequenceId) {
        setModuleNotice(
          "No part is available for the selected station.",
          "error",
        );
        return false;
      }

      if (!record.vehicleModel || !record.vin) {
        setModuleNotice("Vehicle Model and VIN Number are required.", "error");
        return false;
      }

      if (!record.resultGood && !record.resultBad) {
        setModuleNotice(
          "Select at least one result option: Good or Bad.",
          "error",
        );
        return false;
      }

      if (wordCount(record.comments) > 500) {
        setModuleNotice("Comments must be 500 words or fewer.", "error");
        return false;
      }

      return true;
    };

    regionSelect.addEventListener("change", refreshPlants);
    areaSelect.addEventListener("change", refreshSubAreas);
    subAreaSelect.addEventListener("change", () => {
      stationIdSelect.value = "";
      resetPartFlow();
      resetSequenceDisplays();
    });
    stationIdSelect.addEventListener("change", () => {
      inspectionUiState.currentSequenceIndex = 0;
      refreshPartFilter();
      applyCurrentSequence();
      updateContextSummary();
    });
    partFilterSelect.addEventListener("change", () => {
      const selectedPart = decodePartFilterSelection();
      if (
        selectedPart.partName &&
        selectedPart.phase !== inspectionUiState.currentPhase
      ) {
        inspectionUiState.currentPhase = selectedPart.phase;
      }
      inspectionUiState.currentSequenceIndex = 0;
      applyCurrentSequence();
    });
    vehicleModelInput.addEventListener("change", () => {
      if (partPage.classList.contains("hidden")) {
        return;
      }
      inspectionUiState.currentSequenceIndex = 0;
      refreshPartFilter();
      applyCurrentSequence();
      updateMobileHeader(sequenceFlow().length);
    });
    const saveCurrentAnswer = () => {
      const currentSequence = getCurrentSequence();
      if (!currentSequence) {
        return;
      }

      const key = getSequenceAnswerKey(currentSequence);
      inspectionUiState.partAnswers[key] = {
        good: resultGoodInput.checked,
        bad: resultBadInput.checked,
        comments: form.elements.comments.value,
      };
    };

    const setInspectionResult = (resultType) => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(resultType === "bad" ? [30, 20, 30] : 20);
      }

      // Store current state for undo
      const previousGood = resultGoodInput.checked;
      const previousBad = resultBadInput.checked;
      _undoHistory.push({
        good: previousGood,
        bad: previousBad,
        timestamp: Date.now(),
      });

      if (resultType === "good") {
        resultGoodInput.checked = true;
        resultBadInput.checked = false;
      } else if (resultType === "bad") {
        resultGoodInput.checked = false;
        resultBadInput.checked = true;
      }

      saveCurrentAnswer();
      updateInspectionStepActions(sequenceFlow());

      if (rapidMobileMode && markGoodBtn && markBadBtn) {
        const goodActive = resultType === "good";
        markGoodBtn.classList.toggle("btn-primary", goodActive);
        markGoodBtn.classList.toggle("btn-ghost", !goodActive);
        markBadBtn.classList.toggle("btn-primary", !goodActive);
        markBadBtn.classList.toggle("btn-ghost", goodActive);
      }

      // Show result confirmation animation
      animateResultConfirmation(resultType === "good");

      // Show undo toast
      const msg =
        resultType === "good" ? "✓ Marked as GOOD" : "⚠️ Marked as BAD";
      showUndoToast(msg, () => {
        // Undo callback: restore previous state
        if (_undoHistory.length > 0) {
          _undoHistory.pop();
          const prev = _undoHistory[_undoHistory.length - 1] || {
            good: false,
            bad: false,
          };
          resultGoodInput.checked = prev.good;
          resultBadInput.checked = prev.bad;
          saveCurrentAnswer();
          updateInspectionStepActions(sequenceFlow());

          // Reset button states
          if (rapidMobileMode && markGoodBtn && markBadBtn) {
            markGoodBtn.classList.add("btn-ghost");
            markGoodBtn.classList.remove("btn-primary");
            markBadBtn.classList.add("btn-ghost");
            markBadBtn.classList.remove("btn-primary");
          }
        }
      });

      scheduleAutoAdvance();
    };

    const goToPreviousSequence = () => {
      if (inspectionFormBody?.classList.contains("hidden")) {
        showPartPage(false);
        setModuleNotice("Returned to vehicle details page.", "success");
        return;
      }

      if (inspectionUiState.currentSequenceIndex > 0) {
        inspectionUiState.currentSequenceIndex =
          inspectionUiState.currentSequenceIndex - 1;
        applyCurrentSequence();
        setModuleNotice("Previous part loaded.", "success");
        return;
      }

      if (
        inspectionUiState.currentPhase === "regular" &&
        inspectionUiState.prioritySequences.length > 0
      ) {
        inspectionUiState.currentPhase = "priority";
        inspectionUiState.currentSequenceIndex =
          inspectionUiState.prioritySequences.length - 1;
        partFilterSelect.value = "";
        refreshPartFilter();
        applyCurrentSequence();
        setModuleNotice("Returned to the last Priority part.", "success");
        return;
      }

      setModuleNotice(
        "This is already the first part in the sequence.",
        "error",
      );
    };

    resultGoodInput.addEventListener("change", () => {
      if (resultGoodInput.checked) {
        setInspectionResult("good");
        return;
      }

      saveCurrentAnswer();
      updateInspectionStepActions(sequenceFlow());
    });
    resultBadInput.addEventListener("change", () => {
      if (resultBadInput.checked) {
        setInspectionResult("bad");
        return;
      }

      saveCurrentAnswer();
      updateInspectionStepActions(sequenceFlow());
    });
    form.elements.comments.addEventListener("input", saveCurrentAnswer);

    markGoodBtn?.addEventListener("click", () => {
      setInspectionResult("good");
    });

    markBadBtn?.addEventListener("click", () => {
      setInspectionResult("bad");
    });

    toggleContextBtn?.addEventListener("click", () => {
      setContextLocked(contextLocked ? false : true);
      setModuleNotice(
        contextLocked
          ? "Rapid mode context locked."
          : "Context editing unlocked.",
        "success",
      );
    });

    if (rapidMobileMode && inspectionFormBody) {
      inspectionFormBody.addEventListener(
        "touchstart",
        (event) => {
          const touch = event.changedTouches?.[0];
          if (!touch) {
            return;
          }
          touchStartX = touch.clientX;
          touchStartY = touch.clientY;
        },
        { passive: true },
      );

      inspectionFormBody.addEventListener(
        "touchend",
        (event) => {
          const touch = event.changedTouches?.[0];
          if (!touch) {
            return;
          }

          const deltaX = touch.clientX - touchStartX;
          const deltaY = Math.abs(touch.clientY - touchStartY);
          if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < deltaY * 1.2) {
            return;
          }

          if (deltaX < 0) {
            nextBtn.click();
            return;
          }

          goToPreviousSequence();
        },
        { passive: true },
      );
    }

    const switchPhaseBtn = document.getElementById("switchPhaseBtn");
    switchPhaseBtn?.addEventListener("click", () => {
      if (
        inspectionUiState.currentPhase === "priority" &&
        inspectionUiState.regularSequences.length > 0
      ) {
        inspectionUiState.priorityPhaseCompleted = true;
        inspectionUiState.currentPhase = "regular";
        inspectionUiState.currentSequenceIndex = 0;
        partFilterSelect.value = "";
        refreshPartFilter();
        applyCurrentSequence();
        updateInspectionStepActions(sequenceFlow());
        setModuleNotice(
          "✓ Switched to 🟢 REGULAR QUALITY CHECK. Standard inspection parts loaded.",
          "success",
        );
      } else if (
        inspectionUiState.currentPhase === "regular" &&
        inspectionUiState.prioritySequences.length > 0
      ) {
        inspectionUiState.currentPhase = "priority";
        inspectionUiState.currentSequenceIndex = 0;
        partFilterSelect.value = "";
        refreshPartFilter();
        applyCurrentSequence();
        updateInspectionStepActions(sequenceFlow());
        setModuleNotice(
          "✓ Switched to 🔴 PRIORITY QUALITY CHECK. Defect-history parts loaded.",
          "success",
        );
      } else {
        setModuleNotice(
          "No alternate phase is available for this vehicle model.",
          "error",
        );
      }
    });

    scanBtn.addEventListener("click", () => {
      inspectionUiState.partAnswers = {}; // reset saved answers for new vehicle scan
      const barcode = `VIN-${Date.now().toString().slice(-10)}`;
      vinInput.value = barcode;
      vehicleStartMs = Date.now();
      partStartMs = Date.now();
      const selectedModel = pickRandom(DEMO_MODELS);
      vehicleModelInput.value = selectedModel;
      vehicleModelInput.dispatchEvent(new Event("change", { bubbles: true }));
      const defects = modelDefectTokens(selectedModel);
      const phaseMsg = defects.hasDefects
        ? `🔴 Barcode scanned. Vehicle Model: ${selectedModel}. DEFECT HISTORY FOUND - Priority checks will appear.`
        : `🟢 Barcode scanned. Vehicle Model: ${selectedModel}. No defect history.`;
      setModuleNotice(phaseMsg, "success");

      if (
        rapidMobileMode &&
        regionSelect.value &&
        plantSelect.value &&
        areaSelect.value &&
        subAreaSelect.value &&
        stationIdSelect.value
      ) {
        openPartPageBtn.click();
      }
    });

    openPartPageBtn.addEventListener("click", () => {
      if (
        !regionSelect.value ||
        !plantSelect.value ||
        !areaSelect.value ||
        !subAreaSelect.value ||
        !stationIdSelect.value
      ) {
        setModuleNotice(
          "Select Region, Plant, Area, Sub Area, and Station ID before opening the part page.",
          "error",
        );
        return;
      }

      const vehicleModel = vehicleModelInput.value.trim();
      if (vehicleModel) {
        initializeInspectionPlan(vehicleModel);
      }

      inspectionUiState.currentSequenceIndex = 0;
      refreshPartFilter();
      populateInitOverlay();
      showPartPage(true);
      if (rapidMobileMode) {
        showInitOverlay(false);
        applyCurrentSequence();
        setContextLocked(true);
        setModuleNotice(
          "Rapid mode active. Inspection started immediately.",
          "success",
        );
      } else {
        showInitOverlay(true);
        setModuleNotice(
          "Barcode verified. Review the inspection plan below and click Begin Inspection.",
          "success",
        );
      }
    });

    beginInspectionBtn?.addEventListener("click", () => {
      showInitOverlay(false);

      // ═══════════════════════════════════════════════════════════════
      // MOBILE WORKFLOW: Auto-trigger for mobile devices
      // ═══════════════════════════════════════════════════════════════
      if (window.matchMedia("(max-width: 640px)").matches) {
        // Mobile device: use visual workflow instead of form
        const sequences = [];

        // Combine priority and regular sequences
        if (inspectionUiState.prioritySequences?.length > 0) {
          sequences.push(...inspectionUiState.prioritySequences);
        }
        if (inspectionUiState.regularSequences?.length > 0) {
          sequences.push(...inspectionUiState.regularSequences);
        }

        if (sequences.length === 0) {
          setModuleNotice("No inspection sequences available.", "error");
          showInitOverlay(true);
          return;
        }

        // Initialize mobile workflow
        initializeMobileWorkflow(sequences);
        return;
      }

      // ═══════════════════════════════════════════════════════════════
      // DESKTOP: Traditional form-based inspection
      // ═══════════════════════════════════════════════════════════════
      applyCurrentSequence();
      setContextLocked(rapidMobileMode);
      const isPriority = inspectionUiState.currentPhase === "priority";
      const phaseMsg = isPriority
        ? "🔴 PRIORITY QUALITY CHECK: Inspect all defected parts first."
        : "🟢 REGULAR QUALITY CHECK: Standard inspection for remaining parts.";
      setModuleNotice(phaseMsg, "success");
    });

    backToVehiclePageBtn.addEventListener("click", () => {
      goToPreviousSequence();
    });

    saveBtn.addEventListener("click", async () => {
      try {
        if (!stationIdSelect.value) {
          setModuleNotice("Select a Station ID before saving.", "error");
          return;
        }
        if (!vinInput.value.trim()) {
          setModuleNotice("Enter or scan a VIN Number before saving.", "error");
          return;
        }
        if (!resultGoodInput.checked && !resultBadInput.checked) {
          setModuleNotice(
            "Mark the current part as Good or Bad before saving.",
            "error",
          );
          return;
        }
        saveCurrentAnswer();
        const records = buildInspectionRecords("Saved");
        if (!records.length) {
          setModuleNotice(
            "No inspection data to save. Mark at least one part Good or Bad.",
            "error",
          );
          return;
        }
        let validationFailed = false;
        for (const record of records) {
          if (!validateInspection(record)) {
            validationFailed = true;
            break;
          }
        }
        if (validationFailed) return;
        records.forEach((record) => persistInspection(record));
        const badRecordsToSync = records
          .filter((record) => record.resultBad && !record.resultGood)
          .map((record) => ({
            ...record,
            result: "Bad",
            partId: record.sequenceId || "",
            partDescription: record.partName || "",
          }));

        if (rapidMobileMode) {
          openModule("station-inspection", {
            message:
              "Inspection saved locally. Cloud sync is running in background.",
            type: "success",
          });
          queueBackgroundSync(badRecordsToSync);
        } else {
          try {
            const cloudResult = await sendQualiffDefectData(badRecordsToSync);
            const cloudMsg =
              cloudResult.skipped && cloudResult.reason === "endpoint-missing"
                ? " Inspection saved locally. Set Qualiff API Endpoint to enable cloud sync."
                : cloudResult.skipped
                  ? " Inspection saved locally. No bad defects to sync."
                  : ` Inspection saved and synced to cloud (${cloudResult.sent} defect record${cloudResult.sent === 1 ? "" : "s"}).`;

            openModule("station-inspection", {
              message: `Inspection saved successfully.${cloudMsg}`,
              type: "success",
            });
          } catch (cloudError) {
            openModule("station-inspection", {
              message: `Inspection saved locally, but cloud sync failed: ${cloudError.message || "Unknown error"}`,
              type: "error",
            });
          }
        }
      } catch (err) {
        setModuleNotice(`Save failed: ${err.message}`, "error");
        console.error("Save error:", err);
      }
    });

    nextBtn.addEventListener("click", () => {
      const sequences = sequenceFlow();
      if (!sequences.length) {
        if (
          inspectionUiState.currentPhase === "priority" &&
          inspectionUiState.regularSequences.length > 0
        ) {
          inspectionUiState.currentPhase = "regular";
          inspectionUiState.currentSequenceIndex = 0;
          partFilterSelect.value = "";
          refreshPartFilter();
          if (rapidMobileMode) {
            showInitOverlay(false);
            applyCurrentSequence();
            setModuleNotice(
              "✓ Priority complete. Automatically switched to Regular checks.",
              "success",
            );
          } else {
            populateInitOverlay();
            showInitOverlay(true);
            setModuleNotice(
              "✓ Priority Quality Check complete. Review the Regular Quality Check list and click Begin Inspection.",
              "success",
            );
          }
          return;
        }
        setModuleNotice(
          "No part configured for the selected station.",
          "error",
        );
        return;
      }

      if (!hasCurrentResolution()) {
        setModuleNotice(
          "Mark the current part as Good or Bad before moving to the next part.",
          "error",
        );
        return;
      }

      if (inspectionUiState.currentSequenceIndex >= sequences.length - 1) {
        if (
          inspectionUiState.currentPhase === "priority" &&
          inspectionUiState.regularSequences.length > 0
        ) {
          inspectionUiState.priorityPhaseCompleted = true;
          inspectionUiState.currentPhase = "regular";
          inspectionUiState.currentSequenceIndex = 0;
          partFilterSelect.value = "";
          refreshPartFilter();
          if (rapidMobileMode) {
            showInitOverlay(false);
            applyCurrentSequence();
            setModuleNotice(
              "✓ Priority complete. Automatically switched to Regular checks.",
              "success",
            );
          } else {
            populateInitOverlay();
            showInitOverlay(true);
            setModuleNotice(
              "✓ Priority Quality Check complete. Review the Regular Quality Check list and click Begin Inspection.",
              "success",
            );
          }
          return;
        }

        updateInspectionStepActions(sequences);
        setModuleNotice(
          "Final part reached. Click Submit to complete all inspections.",
          "success",
        );
        return;
      }

      inspectionUiState.currentSequenceIndex =
        inspectionUiState.currentSequenceIndex + 1;
      applyCurrentSequence();
      setModuleNotice("Next part loaded.", "success");
    });

    submitBtn.addEventListener("click", async () => {
      try {
        if (!stationIdSelect.value) {
          setModuleNotice("Select a Station ID before submitting.", "error");
          return;
        }
        if (!vinInput.value.trim()) {
          setModuleNotice(
            "Enter or scan a VIN Number before submitting.",
            "error",
          );
          return;
        }
        if (!resultGoodInput.checked && !resultBadInput.checked) {
          setModuleNotice(
            "Mark the current part as Good or Bad before submitting.",
            "error",
          );
          return;
        }
        saveCurrentAnswer();
        const records = buildInspectionRecords("Submitted");
        if (!records.length) {
          setModuleNotice(
            "No inspection data to submit. Mark at least one part Good or Bad.",
            "error",
          );
          return;
        }
        let validationFailed = false;
        for (const record of records) {
          if (!validateInspection(record)) {
            validationFailed = true;
            break;
          }
        }
        if (validationFailed) return;
        records.forEach((record) => persistInspection(record));
        const badRecordsToSync = records
          .filter((record) => record.resultBad && !record.resultGood)
          .map((record) => ({
            ...record,
            result: "Bad",
            partId: record.sequenceId || "",
            partDescription: record.partName || "",
          }));

        if (rapidMobileMode) {
          inspectionUiState.partAnswers = {};
          openModule("station-inspection", {
            message:
              "Inspection submitted locally. Cloud sync is running in background.",
            type: "success",
          });
          queueBackgroundSync(badRecordsToSync);
        } else {
          let submitNotice = "Inspection submitted successfully.";
          let submitNoticeType = "success";

          try {
            const cloudResult = await sendQualiffDefectData(badRecordsToSync);
            if (
              cloudResult.skipped &&
              cloudResult.reason === "endpoint-missing"
            ) {
              submitNotice =
                "Inspection submitted locally. Set Qualiff API Endpoint to enable cloud sync.";
            } else if (cloudResult.skipped) {
              submitNotice =
                "Inspection submitted successfully. No bad defects to sync.";
            } else {
              submitNotice = `Inspection submitted and synced to cloud (${cloudResult.sent} defect record${cloudResult.sent === 1 ? "" : "s"}).`;
            }
          } catch (cloudError) {
            submitNotice = `Inspection submitted locally, but cloud sync failed: ${cloudError.message || "Unknown error"}`;
            submitNoticeType = "error";
          }

          inspectionUiState.partAnswers = {};
          openModule("station-inspection", {
            message: submitNotice,
            type: submitNoticeType,
          });
        }
      } catch (err) {
        setModuleNotice(`Submit failed: ${err.message}`, "error");
        console.error("Submit error:", err);
      }
    });

    cancelBtn.addEventListener("click", () => {
      inspectionUiState.partAnswers = {};
      setContextLocked(false);
      stopKpiTimer();
      vehicleStartMs = 0;
      partStartMs = 0;
      form.reset();
      editKeyInput.value = "";
      resetSelect(plantSelect, "Select Plant");
      resetSelect(subAreaSelect, "Select Sub Area");
      resetPartFlow();
      resetSequenceDisplays();
      updateInspectionStepActions([]);
      showPartPage(false);
      setModuleNotice("Inspection entry cleared.", "success");
    });

    resetSelect(plantSelect, "Select Plant");
    resetSelect(subAreaSelect, "Select Sub Area");
    resetPartFlow();
    showPartPage(false);
    updateInspectionStepActions([]);
    updateMobileSyncBadge();
    updateMobileHeader(0);

    if (rapidMobileMode) {
      form.classList.add("rapid-mobile-mode");
      inspectionActionBar?.classList.add("mobile-action-dock");
      setContextLocked(false);
    }

    if (historyTable) {
      historyTable.addEventListener("click", (event) => {
        const actionBtn = event.target.closest("[data-inspection-action]");
        if (!actionBtn) {
          return;
        }

        const inspectionKey = actionBtn.dataset.inspectionKey || "";
        const action = actionBtn.dataset.inspectionAction || "";
        const record = state.inspections.find(
          (item) => item.inspectionKey === inspectionKey,
        );

        if (!record) {
          setModuleNotice("Inspection record not found.", "error");
          return;
        }

        if (action === "delete") {
          const confirmed = window.confirm(
            `Delete inspection for VIN ${record.vin || "-"}?`,
          );
          if (!confirmed) {
            return;
          }

          state.inspections = state.inspections.filter(
            (item) => item.inspectionKey !== inspectionKey,
          );
          saveState(STORAGE_KEYS.inspections, state.inspections);
          openModule("station-inspection", {
            message: "Inspection record deleted.",
          });
          return;
        }

        if (action === "edit") {
          const inspectionSessionKey = getInspectionSessionKey(record);
          const relatedRecords = state.inspections.filter(
            (item) => getInspectionSessionKey(item) === inspectionSessionKey,
          );

          regionSelect.value = record.region || "";
          refreshPlants();
          plantSelect.value = record.plant || "";
          areaSelect.value = record.area || "";
          refreshSubAreas();
          subAreaSelect.value = record.subArea || "";
          stationIdSelect.value = record.stationId || "";

          inspectionUiState.partAnswers = {};
          vehicleModelInput.value = record.vehicleModel || "";
          vinInput.value = record.vin || "";
          initializeInspectionPlan(record.vehicleModel || "");

          relatedRecords.forEach((item) => {
            const phase = item.priorityCheck ? "priority" : "regular";
            const sequencePool =
              phase === "priority"
                ? inspectionUiState.prioritySequences
                : inspectionUiState.regularSequences;
            const sequenceIndex = sequencePool.findIndex(
              (sequence) =>
                sequence.sequenceId === item.sequenceId ||
                normalizeReferenceToken(sequence.partName) ===
                  normalizeReferenceToken(item.partName),
            );

            if (sequenceIndex < 0) {
              return;
            }

            const sequence = sequencePool[sequenceIndex];
            inspectionUiState.partAnswers[
              getSequenceAnswerKey(sequence, phase, sequenceIndex)
            ] = {
              good: Boolean(item.resultGood),
              bad: Boolean(item.resultBad),
              comments: item.comments || "",
            };
          });

          const selectedPhase = record.priorityCheck ? "priority" : "regular";
          const selectedSequences =
            selectedPhase === "priority"
              ? inspectionUiState.prioritySequences
              : inspectionUiState.regularSequences;
          const selectedIndex = selectedSequences.findIndex(
            (sequence) =>
              sequence.sequenceId === record.sequenceId ||
              normalizeReferenceToken(sequence.partName) ===
                normalizeReferenceToken(record.partName),
          );

          inspectionUiState.currentPhase = selectedPhase;
          inspectionUiState.currentSequenceIndex =
            selectedIndex >= 0 ? selectedIndex : 0;
          inspectionUiState.priorityPhaseCompleted =
            selectedPhase === "regular" ||
            inspectionUiState.prioritySequences.length === 0;

          refreshPartFilter();
          applyCurrentSequence();

          editKeyInput.value = inspectionSessionKey;
          stationNameInput.value = record.stationName || "";

          showPartPage(true);
          updateInspectionStepActions(sequenceFlow());
          setModuleNotice(
            "Inspection loaded for editing. Update values and click Save or Submit.",
            "success",
          );
          showInitOverlay(false); // skip overlay when loading saved record
          if (rapidMobileMode) {
            vehicleStartMs = Date.now();
            partStartMs = Date.now();
            setContextLocked(true);
            startKpiTimer();
          }
        }
      });
    }
  }

  if (moduleId === "ai-report") {
    const form = document.getElementById("reportConfigForm");
    const exportBtn = document.getElementById("exportCsvBtn");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const config = {
          reportName: data.get("reportName").toString().trim(),
          recipients: data.get("recipients").toString().trim(),
          qualiffEndpoint: data.get("qualiffEndpoint").toString().trim(),
          failedOnly: data.get("failedOnly") === "on",
        };

        state.reportConfig = config;
        saveState(STORAGE_KEYS.reportConfig, config);
        openModule("ai-report", {
          message: "Report configuration saved.",
        });
      });
    }

    const modelFilter = document.getElementById("reportVehicleModel");
    const trendCharts = document.getElementById("reportTrendCharts");
    if (modelFilter && trendCharts) {
      modelFilter.addEventListener("change", () => {
        reportFilters.vehicleModel = modelFilter.value;
        trendCharts.innerHTML = buildDefectTrendCharts(
          modelFilter.value,
          getDateFilteredReportRecords(),
        );
      });
    }

    reportRefreshTimer = setInterval(refreshReportGraphs, 5000);

    const fromDateInput = document.getElementById("reportFromDate");
    const toDateInput = document.getElementById("reportToDate");
    const clearDatesBtn = document.getElementById("clearReportDatesBtn");
    const applyDateRange = () => {
      const fromDate = fromDateInput?.value || "";
      const toDate = toDateInput?.value || "";
      if (fromDate && toDate && fromDate > toDate) {
        setModuleNotice("From date must be before or equal to To date.", "error");
        return;
      }
      reportFilters.fromDate = fromDate;
      reportFilters.toDate = toDate;
      openModule("ai-report");
    };
    fromDateInput?.addEventListener("change", applyDateRange);
    toDateInput?.addEventListener("change", applyDateRange);
    clearDatesBtn?.addEventListener("click", () => {
      reportFilters.fromDate = "";
      reportFilters.toDate = "";
      openModule("ai-report");
    });

    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const reportRecords = getDateFilteredReportRecords();
        if (!reportRecords.length) {
          setModuleNotice("No inspection data available for export.", "error");
          return;
        }

        const lines = [
          [
            "VIN",
            "Station",
            "Inspector",
            "DefectCategory",
            "Result",
            "AIConfidence",
            "Remarks",
            "Timestamp",
          ].join(","),
          ...reportRecords.map((item) =>
            [
              item.vin,
              item.stationId,
              item.inspector,
              item.defectCategory,
              item.result,
              item.aiConfidence,
              item.remarks?.replaceAll(",", " ") || "",
              item.timestamp,
            ].join(","),
          ),
        ];

        const blob = new Blob([lines.join("\n")], {
          type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "quality_inspection_report.csv";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        setModuleNotice("CSV export completed.", "success");
      });
    }

    // Bad Parts Report — JSON export and API snippet
    const exportJsonBtn = document.getElementById("exportBadPartsJsonBtn");
    const copyApiBtn = document.getElementById("copyApiSnippetBtn");
    const sendQualiffApiBtn = document.getElementById("sendQualiffApiBtn");
    const jumpBadPartsBtn = document.getElementById("jumpBadPartsBtn");
    const badPartsSection = document.getElementById("badPartsSection");
    const apiSnippetBox = document.getElementById("apiSnippetBox");
    const apiSnippetPre = document.getElementById("apiSnippetPre");
    const snippetCloseBtn = document.getElementById("copySnippetCloseBtn");

    const getBadParts = () =>
      getDateFilteredReportRecords()
        .filter((item) => item.resultBad && !item.resultGood)
        .map((item) => ({
          vin: item.vin || "",
          stationId: item.stationId || "",
          stationName: item.stationName || "",
          partName: item.partName || "",
          partId: item.sequenceId || "",
          region: item.region || "",
          plant: item.plant || "",
          area: item.area || "",
          subArea: item.subArea || "",
          vehicleModel: item.vehicleModel || "",
          comments: item.comments || "",
          inspectionStatus: item.inspectionStatus || "",
          priorityCheck: item.priorityCheck || false,
          timestamp: item.timestamp || "",
        }));

    if (jumpBadPartsBtn && badPartsSection) {
      jumpBadPartsBtn.addEventListener("click", () => {
        badPartsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    if (exportJsonBtn) {
      exportJsonBtn.addEventListener("click", () => {
        const badParts = getBadParts();
        if (!badParts.length) {
          setModuleNotice("No bad-result parts found to export.", "error");
          return;
        }
        const json = JSON.stringify({ badPartsReport: badParts }, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `bad_parts_report_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
        setModuleNotice(
          `Bad parts JSON downloaded (${badParts.length} record${badParts.length === 1 ? "" : "s"}).`,
          "success",
        );
      });
    }

    if (copyApiBtn && apiSnippetBox && apiSnippetPre) {
      copyApiBtn.addEventListener("click", () => {
        const badParts = getBadParts();
        const qualiffPayload = buildQualiffDefectPayload(
          badParts.map((item) => ({
            ...item,
            result: "Bad",
            partDescription: item.partName || "",
          })),
        );
        const endpoint =
          state.reportConfig?.qualiffEndpoint ||
          "https://qualiff.yourcompany.com/api/quality-defects";
        const snippet = `// Qualiff API call — POST quality defect data
const qualityDefectPayload = ${JSON.stringify(qualiffPayload, null, 2)};

fetch("${endpoint}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(qualityDefectPayload)
})
  .then(res => res.json())
  .then(data => console.log("API response:", data))
  .catch(err => console.error("API error:", err));`;

        apiSnippetPre.textContent = snippet;
        apiSnippetBox.classList.remove("hidden");

        navigator.clipboard
          .writeText(snippet)
          .then(() => {
            setModuleNotice(
              "API fetch snippet copied to clipboard.",
              "success",
            );
          })
          .catch(() => {
            setModuleNotice(
              "Snippet shown below. Copy it manually.",
              "success",
            );
          });
      });
    }

    if (sendQualiffApiBtn) {
      sendQualiffApiBtn.addEventListener("click", async () => {
        const badParts = getBadParts();
        if (!badParts.length) {
          setModuleNotice("No bad-result parts found to send.", "error");
          return;
        }

        try {
          const cloudResult = await sendQualiffDefectData(
            badParts.map((item) => ({
              ...item,
              result: "Bad",
              partDescription: item.partName || "",
            })),
          );

          if (
            cloudResult.skipped &&
            cloudResult.reason === "endpoint-missing"
          ) {
            setModuleNotice(
              "Set the Qualiff API Endpoint in Report Configuration first.",
              "error",
            );
            return;
          }

          setModuleNotice(
            `Defect data sent to Qualiff (${badParts.length} record${badParts.length === 1 ? "" : "s"}).`,
            "success",
          );
        } catch (error) {
          setModuleNotice(
            `Failed to send defect data to Qualiff: ${error.message || "Unknown error"}`,
            "error",
          );
        }
      });
    }

    if (snippetCloseBtn && apiSnippetBox) {
      snippetCloseBtn.addEventListener("click", () => {
        apiSnippetBox.classList.add("hidden");
      });
    }
  }
}

function drawLandingOptions() {
  if (!optionGrid || !currentUser) {
    return;
  }

  optionGrid.innerHTML = "";

  const roleBuckets = [];
  // Add Mobile menu for user role (appears first, above Quality Dashboard)
  if (currentUser.role === "user") {
    roleBuckets.push({ key: "mobile", label: "Mobile" });
  }
  if (currentUser.role === "admin") {
    roleBuckets.push({ key: "admin", label: "Admin" });
  }
  roleBuckets.push({ key: "user", label: "User" });

  roleBuckets.forEach((bucket, index) => {
    // Handle Mobile menu specially
    if (bucket.key === "mobile") {
      const group = document.createElement("details");
      group.className = "menu-group";
      group.open = false;

      const summary = document.createElement("summary");
      summary.textContent = bucket.label;
      group.appendChild(summary);

      const links = document.createElement("div");
      links.className = "menu-links";

      const mobileBtn = document.createElement("button");
      mobileBtn.type = "button";
      mobileBtn.className = "menu-link";
      mobileBtn.textContent = "Start Mobile Inspection";
      mobileBtn.addEventListener("click", () => {
        _selectedLoginRole = "mobile";
        document.body.classList.add("force-mobile-workflow");
        setMenuVisible(false);
        showMobileInspectionEntry();
      });
      links.appendChild(mobileBtn);

      group.appendChild(links);
      optionGrid.appendChild(group);
      return;
    }

    const group = document.createElement("details");
    group.className = "menu-group";
    group.open = false;

    const summary = document.createElement("summary");
    summary.textContent = bucket.label;
    group.appendChild(summary);

    const links = document.createElement("div");
    links.className = "menu-links";

    modules
      .filter((module) => module.role === bucket.key)
      .forEach((module) => {
        const itemBtn = document.createElement("button");
        itemBtn.type = "button";
        itemBtn.className = "menu-link";
        itemBtn.dataset.moduleId = module.id;
        itemBtn.textContent = module.title;
        itemBtn.addEventListener("click", () => {
          openModule(module.id);
        });
        links.appendChild(itemBtn);
      });

    group.appendChild(links);
    optionGrid.appendChild(group);
  });

  updateMenuSelection();
}

function updateMenuSelection() {
  if (!optionGrid) {
    return;
  }

  optionGrid.querySelectorAll(".menu-link").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.moduleId === activeModuleId,
    );
  });
}

function buildHomeWidgets() {
  const today = new Date().toDateString();

  const todayInspections = state.inspections.filter(
    (item) => new Date(item.timestamp).toDateString() === today,
  );

  const totalToday = todayInspections.length;

  const passToday = todayInspections.filter(
    (item) => item.resultGood && !item.resultBad,
  ).length;
  const failToday = todayInspections.filter((item) => item.resultBad).length;

  const passRate = totalToday
    ? ((passToday / totalToday) * 100).toFixed(1)
    : "0.0";
  const failRate = totalToday
    ? ((failToday / totalToday) * 100).toFixed(1)
    : "0.0";

  // First Pass Yield = inspections good on first attempt (resultGood, not resultBad)
  const fpyCount = todayInspections.filter(
    (item) => item.resultGood && !item.resultBad,
  ).length;
  const fpy = totalToday ? ((fpyCount / totalToday) * 100).toFixed(1) : "0.0";

  // Major defects: parts where resultBad is true – count by partName
  const defectMap = {};
  todayInspections
    .filter((item) => item.resultBad)
    .forEach((item) => {
      const key = item.partName || item.sequenceId || "Unknown";
      defectMap[key] = (defectMap[key] || 0) + 1;
    });

  const top3 = Object.entries(defectMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Average inspection time: difference in minutes between earliest and latest today
  let avgTimeText = "N/A";
  if (todayInspections.length >= 2) {
    const timestamps = todayInspections
      .map((item) => new Date(item.timestamp).getTime())
      .filter((t) => !Number.isNaN(t))
      .sort((a, b) => a - b);

    if (timestamps.length >= 2) {
      const spanMs = timestamps[timestamps.length - 1] - timestamps[0];
      const avgMs = spanMs / (timestamps.length - 1);
      const avgMin = (avgMs / 60000).toFixed(1);
      avgTimeText = `${avgMin} min`;
    }
  }

  const defectRows = top3.length
    ? top3
        .map(
          ([name, count], idx) =>
            `<div class="home-widget-defect-row"><span class="home-widget-defect-rank">#${idx + 1}</span><span class="home-widget-defect-name">${sanitize(name)}</span><span class="home-widget-defect-count">${count}</span></div>`,
        )
        .join("")
    : `<p class="muted" style="font-size:0.85rem;margin:0.3rem 0 0">No defects recorded today.</p>`;

  return [
    {
      icon: "🚗",
      title: "Total Inspected Today",
      value: String(totalToday),
      sub: "vehicles",
      accent: "widget-blue",
    },
    {
      icon: "✅",
      title: "Pass Rate",
      value: `${passRate}%`,
      sub: `${passToday} of ${totalToday} passed`,
      accent: "widget-green",
    },
    {
      icon: "❌",
      title: "Fail Rate",
      value: `${failRate}%`,
      sub: `${failToday} of ${totalToday} failed`,
      accent: "widget-red",
    },
    {
      icon: "⚠️",
      title: "Major Defects (Top 3)",
      valueHtml: defectRows,
      accent: "widget-orange",
    },
    {
      icon: "🏆",
      title: "First Pass Yield (FPY)",
      value: `${fpy}%`,
      sub: "passed on first attempt",
      accent: "widget-purple",
    },
    {
      icon: "⏱️",
      title: "Avg. Inspection Time",
      value: avgTimeText,
      sub: "between records today",
      accent: "widget-gold",
    },
  ]
    .map(
      ({ icon, title, value, valueHtml, sub, accent }) => `
        <article class="home-widget ${accent}">
          <div class="home-widget-header">
            <span class="home-widget-icon">${icon}</span>
            <span class="home-widget-title">${title}</span>
          </div>
          ${
            valueHtml
              ? `<div class="home-widget-defect-list">${valueHtml}</div>`
              : `<div class="home-widget-value">${value}</div>${sub ? `<div class="home-widget-sub">${sub}</div>` : ""}`
          }
        </article>`,
    )
    .join("");
}

function showHome() {
  if (reportRefreshTimer) {
    clearInterval(reportRefreshTimer);
    reportRefreshTimer = null;
  }
  activeModuleId = null;
  modulePanel.classList.add("hidden");
  modulePanel.innerHTML = "";

  // If workflow screens were active, hide them and restore dashboard shell.
  if (document.body.classList.contains("force-mobile-workflow")) {
    document
      .getElementById("mobileInspectionEntryScreen")
      ?.classList.add("hidden");
    document.getElementById("inspectionInitScreen")?.classList.add("hidden");
    document.getElementById("partsListScreen")?.classList.add("hidden");
    document.getElementById("partDetailsScreen")?.classList.add("hidden");
    document.getElementById("imageEditorScreen")?.classList.add("hidden");
    document.getElementById("inspectionSummaryScreen")?.classList.add("hidden");
    document.getElementById("inspectionForm")?.style.removeProperty("display");
    document.body.classList.remove("force-mobile-workflow");
    document.getElementById("dashboardPage")?.classList.remove("hidden");
  }

  if (homePanel) {
    homePanel.classList.remove("hidden");
    const widgetGrid = document.getElementById("homeWidgetGrid");
    if (widgetGrid) {
      widgetGrid.innerHTML = buildHomeWidgets();
    }
  }

  if (homeBtn) {
    homeBtn.classList.add("active");
  }

  updateMenuSelection();
  updateMobileTabBar();
}

function setMenuVisible(isVisible) {
  if (!optionGrid) {
    return;
  }

  if (!menuToggleBtn) {
    optionGrid.classList.remove("hidden");
    return;
  }

  optionGrid.classList.toggle("hidden", !isVisible);
  menuToggleBtn.classList.toggle("active", isVisible);
}

function bindSidebarEvents() {
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      showHome();
    });
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", () => {
      const visible = optionGrid && !optionGrid.classList.contains("hidden");
      setMenuVisible(!visible);
      if (homeBtn) {
        homeBtn.classList.remove("active");
      }
    });
  }
}

function buildMobileTabBar() {
  if (!isMobileRapidMode()) {
    return;
  }

  const existing = document.getElementById("mobileTabBar");
  if (existing) {
    existing.remove();
  }

  const bar = document.createElement("nav");
  bar.id = "mobileTabBar";
  bar.className = "mobile-tab-bar";
  bar.setAttribute("role", "tablist");
  bar.setAttribute("aria-label", "Main navigation");

  const tabDefs = [
    { id: "__home__", icon: "🏠", label: "Home" },
    { id: "station-inspection", icon: "🔍", label: "Inspect" },
    { id: "ai-report", icon: "📊", label: "Report" },
  ];

  tabDefs.forEach((tab) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mobile-tab-btn";
    btn.dataset.tabId = tab.id;
    btn.setAttribute("role", "tab");
    btn.innerHTML = `<span class="tab-icon" aria-hidden="true">${tab.icon}</span><span>${sanitize(tab.label)}</span>`;

    btn.addEventListener("click", () => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(18);
      }
      if (tab.id === "__home__") {
        showHome();
      } else {
        openModule(tab.id);
      }
      updateMobileTabBar();
    });

    bar.appendChild(btn);
  });

  document.body.appendChild(bar);
  updateMobileTabBar();
}

function updateMobileTabBar() {
  const bar = document.getElementById("mobileTabBar");
  if (!bar) {
    return;
  }

  bar.querySelectorAll(".mobile-tab-btn").forEach((btn) => {
    const isHome = btn.dataset.tabId === "__home__" && activeModuleId === null;
    const isActive = btn.dataset.tabId === activeModuleId || isHome;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}

function showDashboard() {
  loginPage.classList.add("hidden");
  dashboardPage.classList.remove("hidden");

  const roleLabel = currentUser.role === "admin" ? "Admin" : "User";
  welcomeText.textContent = `${currentUser.name} | ${roleLabel}`;
  updateDashboardDateTime();

  if (dashboardClockTimer) {
    clearInterval(dashboardClockTimer);
  }
  dashboardClockTimer = setInterval(updateDashboardDateTime, 1000);

  startDemoSim();
  drawLandingOptions();
  setMenuVisible(false);
  showHome();
  buildMobileTabBar();

  // Hide UX enhancements when on dashboard
  hideLiveContextBar();
  hideProgressBar();
}

function showLogin() {
  stopDemoSim();
  if (dashboardClockTimer) {
    clearInterval(dashboardClockTimer);
    dashboardClockTimer = null;
  }
  if (dateTimeText) {
    dateTimeText.textContent = "";
  }
  dashboardPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
  loginForm.reset();
  setLoginError("");
  _selectedLoginRole = "user";
  document.body.classList.remove("force-mobile-workflow");
  const roleUser = document.getElementById("roleUser");
  const roleAdmin = document.getElementById("roleAdmin");
  const roleMobile = document.getElementById("roleMobile");
  if (roleUser) {
    roleUser.classList.add("active");
  }
  if (roleAdmin) {
    roleAdmin.classList.remove("active");
  }
  if (roleMobile) {
    roleMobile.classList.remove("active");
  }
  const tabBar = document.getElementById("mobileTabBar");
  if (tabBar) {
    tabBar.remove();
  }
  // Hide UX enhancements
  hideLiveContextBar();
  hideProgressBar();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const loginBtn = document.getElementById("loginBtn");
  const loginBtnText = document.getElementById("loginBtnText");
  const loginBtnSpinner = document.getElementById("loginBtnSpinner");

  setLoginError("");

  // Set loading text immediately
  if (loginBtnText) {
    loginBtnText.textContent = "Signing In…";
  }
  if (loginBtn) {
    loginBtn.disabled = true;
  }

  // Delay showing spinner to prevent flash on quick operations (500ms)
  let spinnerTimeout = window.setTimeout(() => {
    if (loginBtnSpinner) {
      loginBtnSpinner.classList.remove("hidden");
    }
  }, 500);

  // Small delay for natural feel, then validate
  window.setTimeout(() => {
    const name = nameInput.value;
    const normalizedInputName = normalizeName(name);
    const normalizedInputFirstName = normalizedInputName.split(" ")[0] || "";

    if (!normalizedInputName) {
      clearTimeout(spinnerTimeout);
      setLoginError("Please enter your full name.");
      if (loginBtnText) {
        loginBtnText.textContent = "Sign In";
      }
      if (loginBtnSpinner) {
        loginBtnSpinner.classList.add("hidden");
      }
      if (loginBtn) {
        loginBtn.disabled = false;
      }
      return;
    }

    const user = SAMPLE_LOGIN_USERS.find((item) => {
      const normalizedStoredName = normalizeName(item.name);
      return (
        normalizedStoredName === normalizedInputName ||
        normalizedStoredName === normalizedInputFirstName
      );
    });

    const isMobileRole = _selectedLoginRole === "mobile";

    if (!user && !isMobileRole) {
      clearTimeout(spinnerTimeout);
      if (window.navigator.vibrate) {
        window.navigator.vibrate([40, 20, 40]);
      }
      setLoginError(
        "Name not recognised. Use a configured operator or admin name.",
      );
      if (loginBtnText) {
        loginBtnText.textContent = "Sign In";
      }
      if (loginBtnSpinner) {
        loginBtnSpinner.classList.add("hidden");
      }
      if (loginBtn) {
        loginBtn.disabled = false;
      }
      return;
    }

    currentUser = isMobileRole
      ? {
          name: name.trim(),
          role: "user",
        }
      : {
          name: user.name,
          role: user.role,
        };

    clearTimeout(spinnerTimeout);
    if (loginBtnText) {
      loginBtnText.textContent = "Sign In";
    }
    if (loginBtnSpinner) {
      loginBtnSpinner.classList.add("hidden");
    }
    if (loginBtn) {
      loginBtn.disabled = false;
    }

    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }

    // Always land on dashboard after sign-in.
    showDashboard();
  }, 320);
});

if ("serviceWorker" in navigator) {
  const host = String(window.location.hostname || "");
  const isLocalOrLanHost =
    host === "localhost" ||
    host === "127.0.0.1" ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(host);

  if (isLocalOrLanHost) {
    // Disable SW during local/mobile LAN testing to avoid stale cached files.
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
  } else {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((_error) => {
        // Keep UX uninterrupted when service worker registration fails.
      });
    });
  }
}

logoutBtn.addEventListener("click", () => {
  currentUser = null;
  _selectedLoginRole = "user"; // Reset to default role
  showLogin();
});

bindSidebarEvents();
