interface CustomRequest {
  url: string | undefined;
  duration: number;
  size: number;
}

const tableBody = document.querySelector('tbody#requests') as HTMLElement;
let entries = performance.getEntriesByType('resource');

for (const req of entries.map((e) => ({
  url: e.name.split(window.location.host).pop(),
  duration: e.duration,
  size: (e as PerformanceResourceTiming).transferSize,
})))
  addRequest(req);

setTotals(entries);

setInterval(() => {
  const allEntries = performance.getEntriesByType('resource');
  const newEntries = allEntries.slice(entries.length, allEntries.length);
  const newRequests = newEntries.map((e) => ({
    url: e.name.split(window.location.host).pop(),
    duration: e.duration,
    size: (e as PerformanceResourceTiming).transferSize,
  }));

  for (const req of newRequests) addRequest(req);
  entries = [...entries, ...newEntries];

  setTotals(entries);
}, 1000);

function setTotals(entries: PerformanceEntryList) {
  const size = prettybytes(entries.reduce((acc, e) => acc + (e as PerformanceResourceTiming).transferSize, 0));
  const url = window.location.pathname;
  const duration = (entries.reduce((acc, e) => acc + e.duration, 0) / 1000).toFixed(1);

  const total = tableBody.querySelector('tr#total');
  if (total) total.remove();

  tableBody.innerHTML += `
    <tr id="total">
      <td class="size">${size}</td>
      <td class="url">${url}</td>
      <td class="duration">${duration}s</td>
    </tr>
  `;
}

function addRequest(req: CustomRequest) {
  tableBody.innerHTML += `
    <tr class="request">
      <td class="size">${prettybytes(req.size)}</td>
      <td class="url">${req.url}</td>
      <td class="duration">(${req.duration.toFixed(1)}ms)</td>
    </tr>
  `;
}
