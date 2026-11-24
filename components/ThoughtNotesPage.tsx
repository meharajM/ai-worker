import React from 'react';
import { ArrowDown, ArrowUpRight, BellRing, Layers, LockKeyhole, Mic, Share2, Smartphone } from 'lucide-react';

const PAGE_URL = 'https://ai-worker.tech/thought-notes/';
const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.meharaj.contextengine';
const PAGE_TITLE = 'Thought Notes | AI Voice Notes for Android';
const PAGE_DESCRIPTION = 'AI voice notes for Android: capture by voice or text, transcribe English offline, and group notes into searchable topics with on-device AI. iPhone coming soon.';
const SOCIAL_IMAGE = 'https://ai-worker.tech/images/thought-notes/play-store-feature-graphic.png';
const SOCIAL_IMAGE_ALT = 'Thought Notes feature artwork with a gold crescent and star on a dark background.';
const PRIVACY_URL = 'https://gist.github.com/meharajM/95c21961e6af613c8a076867c3870381';

const USE_CASES = [
  {
    icon: <Mic size={20} />,
    title: 'Capture a thought as it happens',
    text: 'Write or record in the app, or start from the Android home-screen widget without opening it. A recording can continue as you switch apps.',
  },
  {
    icon: <Layers size={20} />,
    title: 'Find related thoughts again',
    text: 'When the on-device model is ready, it can group notes into topics and add a short summary. Your original stays intact; uncertain notes remain in Inbox.',
  },
  {
    icon: <Share2 size={20} />,
    title: 'Bring assistant research back',
    text: 'Share a topic with ChatGPT or another assistant, then share the response back. Thought Notes can file it with related notes when its model is ready.',
  },
  {
    icon: <BellRing size={20} />,
    title: 'Get optional task reminders',
    text: 'Turn on reminders in Settings. On-device AI can spot a clear task in a new note and schedule a local notification.',
  },
];

const STEPS = [
  { title: 'Write, paste, or record', text: 'Capture a thought in text or voice. English voice transcription runs on your phone after its model downloads.' },
  { title: 'Let it find a topic', text: 'When its model is ready, on-device AI groups related notes and can add a short summary. Your original stays intact; unclear notes remain in Inbox.' },
  { title: 'Find, share, or get a reminder', text: 'Search notes and topics, share a topic with an assistant, or enable reminders for clear tasks in new notes.' },
];

const SCREENS = [
  {
    file: 'play-store-topic-organization.webp',
    title: 'Related notes, in one topic',
    caption: 'On-device AI groups related thoughts and can add a short summary to an individual note.',
    alt: 'Thought Notes store graphic showing notes in a Community Garden topic with a short AI summary.',
  },
  {
    file: 'play-store-widget-capture.webp',
    title: 'Record or write from home',
    caption: 'The Android widget starts a voice capture or opens a text note.',
    alt: 'Thought Notes store graphic showing the Android home-screen Record and Write widget.',
  },
  {
    file: 'play-store-background-recording.webp',
    title: 'Keep recording as you switch apps',
    caption: 'Stop a background recording from the app, widget, or notification when available.',
    alt: 'Thought Notes store graphic showing its recording notification and on-device English transcription.',
  },
  {
    file: 'play-store-daily-notes-privacy.webp',
    title: 'Notes stay on your device',
    caption: 'Your notes stay local. Share a note or export a backup when you choose.',
    alt: 'Thought Notes store graphic showing notes saved on the device and voice or text capture.',
  },
];

const FAQ = [
  {
    question: 'What does the on-device AI do?',
    answer: 'When its model is ready on a compatible Android phone, it can group related notes into topics and add a short summary. It keeps your original note; if it cannot choose a topic, the note stays in Inbox for you.',
  },
  {
    question: 'Does voice transcription work offline?',
    answer: 'English speech is transcribed on your phone. The first setup downloads a voice model; after that, transcription works offline. The optional writing model also downloads to your phone and needs a compatible device.',
  },
  {
    question: 'Can Thought Notes remind me about a task?',
    answer: 'Reminders are off by default. Enable them in Settings; Thought Notes may detect a clear task in a new note and schedule a local notification. Android can delay notification delivery.',
  },
  {
    question: 'Where are my notes stored?',
    answer: 'Notes and transcripts stay on your phone. There is no account, advertising, or publisher analytics. You choose when to share a topic with an assistant or export a JSON backup; backups do not include audio.',
  },
  {
    question: 'Is Thought Notes available for iPhone?',
    answer: 'The Android app is available on Google Play. The iPhone app is coming soon. The screenshots and features on this page show the Android app.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MobileApplication',
      name: 'Thought Notes',
      url: PAGE_URL,
      downloadUrl: PLAY_URL,
      description: PAGE_DESCRIPTION,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Android',
      featureList: [
        'Capture thoughts by voice or text',
        'Transcribe English voice notes on the device, offline after download',
        'Group related notes into searchable topics and add short summaries with on-device AI',
        'Share a topic with an AI assistant and file its response back into related notes',
        'Opt in to local task reminders for new notes',
        'Search, edit, share, and export notes as JSON',
      ],
      publisher: { '@type': 'Organization', name: 'AI-Worker Tech', url: 'https://ai-worker.tech/' },
    },
    {
      '@type': 'HowTo',
      name: 'How to capture and organize notes with Thought Notes',
      description: 'Capture a thought, let on-device AI group related notes, then search, share, or set an optional reminder.',
      url: PAGE_URL + '#how-to',
      step: STEPS.map((step, index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name: step.title,
        text: step.text,
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

const ThoughtNotesPage: React.FC = () => {
  React.useEffect(() => {
    document.title = PAGE_TITLE;
    return () => { document.title = 'AI-Worker | Free MIT Open-Source Desktop AI Workspace'; };
  }, []);

  return (
    <main className="min-h-screen bg-brand-dark text-white">
    <meta name="description" content={PAGE_DESCRIPTION} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AI-Worker Tech" />
    <meta property="og:title" content={PAGE_TITLE} />
    <meta property="og:description" content={PAGE_DESCRIPTION} />
    <meta property="og:url" content={PAGE_URL} />
    <meta property="og:image" content={SOCIAL_IMAGE} />
    <meta property="og:image:alt" content={SOCIAL_IMAGE_ALT} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={PAGE_URL} />
    <meta name="twitter:title" content={PAGE_TITLE} />
    <meta name="twitter:description" content={PAGE_DESCRIPTION} />
    <meta name="twitter:image" content={SOCIAL_IMAGE} />
    <meta name="twitter:image:alt" content={SOCIAL_IMAGE_ALT} />
    <link rel="canonical" href={PAGE_URL} />
    <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

    <section className="px-4 pb-16 pt-32 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="thought-notes-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <div className="mb-6 flex items-center gap-3">
            <img src="/images/thought-notes/play-store-icon-112.webp" alt="Thought Notes app icon" width="56" height="56" className="h-14 w-14 rounded-2xl" />
            <p className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-surface-elevated px-4 py-2 text-sm text-brand-teal">
              <Smartphone size={16} aria-hidden="true" /> Android now · iPhone coming soon
            </p>
          </div>
          <h1 id="thought-notes-title" className="max-w-2xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">Thought Notes</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            Catch a thought by voice or text. On Android, on-device AI can group related notes into searchable topics and add short summaries while keeping your original.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
            Voice transcription is in English. The AI model downloads to your phone and works locally on compatible devices.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={PLAY_URL} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-tealHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
              Get it on Google Play <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a href="#screenshots" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-elevated px-6 py-3 font-semibold text-white transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
              See the app <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-7 text-sm text-gray-400">
            <span className="inline-flex items-start gap-2"><LockKeyhole size={15} aria-hidden="true" className="mt-0.5 shrink-0" /> Notes and transcripts stay on your device. No app account.</span>
          </div>
        </div>

        <figure className="mx-auto w-full max-w-[560px] overflow-hidden rounded-3xl border border-surface-border bg-surface-card shadow-2xl shadow-black/30">
          <img
            src="/images/thought-notes/play-store-feature-graphic.webp"
            alt="Gold crescent and star on the dark Thought Notes feature graphic."
            width="1024"
            height="500"
            fetchPriority="high"
            className="w-full"
          />
          <figcaption className="px-5 py-3 text-sm text-gray-400">Feature artwork prepared for the Google Play listing.</figcaption>
        </figure>
      </div>
    </section>

    <section id="use-cases" className="scroll-mt-24 border-y border-surface-border bg-surface-card px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="use-cases-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">What it helps with</p>
          <h2 id="use-cases-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Keep a passing thought useful.</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {USE_CASES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-surface-border bg-brand-dark p-6">
              <div className="mb-4 inline-flex rounded-xl bg-brand-teal/10 p-3 text-brand-teal" aria-hidden="true">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-400">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="how-to" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8" aria-labelledby="how-to-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">A quick routine</p>
          <h2 id="how-to-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From capture to topic.</h2>
        </div>
        <ol className="space-y-6">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-5 border-b border-surface-border pb-6 last:border-0">
              <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand-teal/40 text-sm font-semibold text-brand-teal">{index + 1}</span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-gray-400">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section id="screenshots" className="scroll-mt-24 border-y border-surface-border bg-surface-card px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="screens-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Android app preview</p>
          <h2 id="screens-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A look at the Android app.</h2>
          <p className="mt-4 leading-relaxed text-gray-400">Store graphics prepared for Android. iPhone app coming soon. Open any image to see it full size.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SCREENS.map((screen) => (
            <figure key={screen.file} className="rounded-2xl border border-surface-border bg-brand-dark p-3">
              <a href={'/images/thought-notes/' + screen.file} target="_blank" rel="noreferrer" aria-label={'Open full-size image: ' + screen.title} className="block overflow-hidden rounded-xl bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
                <img
                  src={'/images/thought-notes/' + screen.file}
                  alt={screen.alt}
                  width="1080"
                  height="1920"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/16] w-full object-contain"
                />
              </a>
              <figcaption className="px-2 pb-2 pt-4">
                <h3 className="font-semibold">{screen.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{screen.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section id="availability" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8" aria-labelledby="availability-title">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Availability</p>
          <h2 id="availability-title" className="mt-3 text-3xl font-bold tracking-tight">Android is ready. iPhone is coming soon.</h2>
          <p className="mt-3 leading-relaxed text-gray-400">Thought Notes is available on Google Play for Android phones.</p>
        </div>
        <a href={PLAY_URL} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-tealHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal">
          Get it on Google Play <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
    </section>

    <section id="faq" className="scroll-mt-24 px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">Questions</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-bold tracking-tight">Practical details.</h2>
        </div>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <article key={item.question} className="border-b border-surface-border pb-6 last:border-0">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-2 leading-relaxed text-gray-400">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t border-surface-border px-4 py-8 text-sm text-gray-500 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>Thought Notes by AI-Worker Tech</p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <a className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal" href="/">AI-Worker Tech</a>
          <a className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal" href={PRIVACY_URL} target="_blank" rel="noreferrer">Privacy policy</a>
        </div>
      </div>
    </footer>
    </main>
  );
};

export default ThoughtNotesPage;
