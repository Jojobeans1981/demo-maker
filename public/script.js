const form = document.getElementById('demo-form');
const statusEl = document.getElementById('status');
const resultCard = document.getElementById('result-card');
const resultStatus = document.getElementById('result-status');
const resultTitle = document.getElementById('result-title');
const resultSummary = document.getElementById('result-summary');
const sceneList = document.getElementById('scene-list');
const video = document.getElementById('demo-video');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  statusEl.textContent = 'Generating your demo brief...';

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  try {
    const data = await generateDemo(payload);

    resultStatus.textContent = data.status === 'ready' ? 'Ready to share' : data.status;
    resultTitle.textContent = data.title;
    resultSummary.textContent = data.summary;
    sceneList.innerHTML = '';

    data.scenes.forEach((scene) => {
      const item = document.createElement('li');
      item.textContent = scene;
      sceneList.appendChild(item);
    });

    if (data.videoUrl) {
      video.src = data.videoUrl;
    }

    resultCard.classList.add('ready');
    statusEl.textContent = `Storyboard generated at ${new Date(data.generatedAt).toLocaleTimeString()}.`;
  } catch (error) {
    statusEl.textContent = 'The demo plan could not be generated right now. Please try again.';
    console.error(error);
  }
});

async function generateDemo(payload) {
  try {
    const response = await fetch('/api/generate-demo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return await response.json();
  } catch (_error) {
    return buildLocalDemo(payload);
  }
}

function buildLocalDemo(payload) {
  const projectName = String(payload.projectName || 'Demo Project').trim() || 'Demo Project';
  const audience = String(payload.audience || 'Prospects').trim() || 'Prospects';
  const callToAction = String(payload.callToAction || 'Book a walkthrough').trim() || 'Book a walkthrough';
  const notes = String(payload.notes || '').trim();

  return {
    status: 'ready',
    title: `${projectName} product demo`,
    summary: `Storyboard prepared for ${audience.toLowerCase()} with a closing CTA to "${callToAction}". ${notes}`.trim(),
    scenes: [
      `Start with the core problem ${projectName} solves for ${audience.toLowerCase()}.`,
      'Show the shortest path from setup to first visible result.',
      `Close with a crisp invitation to "${callToAction}".`,
    ],
    videoUrl: '/demoVideo.mp4',
    generatedAt: new Date().toISOString(),
  };
}
