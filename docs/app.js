/* Static, source-led documentation. All visible copy lives in this translation object. */
const translations = {
  ru: {
    title: 'KofeyekToolkit — Документация', repository: 'Репозиторий', menu: 'Меню', sourceOnly: 'Справочник по исходникам',
    nav: [['overview','Обзор'],['quick-start','Быстрый старт'],['api','API'],['architecture','Устройство'],['reference','Структура']],
    hero: ['Документация разработчика','KofeyekToolkit','Небольшой фундамент Unity для CandyCandleGames: DI, управляемый жизненный цикл объектов, тики, события, сцены и инструменты разработчика. Тулкит сейчас сфокусирован на небольших инди-играх и развивается к потребностям более крупных проектов.'],
    overview: {title:'Обзор', cards:[['Основан на исходниках','Описание намеренно ограничено кодом из <code>Assets/_KofeyekToolkit/_Scripts</code>: это не обещание функций, которых ещё нет.'],['Точка входа','<code>AppBootstrap</code> создаёт контейнер, сервисы тиков и спавна после загрузки сцены.'],['Модульные системы','Каждая система имеет небольшой API и может использоваться как основа для игровых компонентов.'],['Unity-first','Сцены, <code>MonoBehaviour</code>, <code>ScriptableObject</code> и <code>Resources</code> остаются частью рабочего процесса.']]},
    quick: {title:'Быстрый старт', intro:'Поместите папку <code>_KofeyekToolkit</code> в <code>Assets/</code>. Включите <code>Assets/_KofeyekToolkit/Scenes/Boot.unity</code> в Build Settings как стартовую сцену: глобальная инициализация выполняется статическим <code>AppBootstrap</code> после загрузки сцены.', code:`// Сервис получает TickService через DI.
public sealed class ExampleSystem : IGameplayTickable
{
    public void Tick(float deltaTime) { /* game logic */ }
}

// Для объектов сцены добавьте SceneObject.
// SpawnService обработает injection, lifecycle и tickables.`, note:'<code>TickAdapter</code> должен присутствовать в сцене, чтобы передавать <code>Time.unscaledDeltaTime</code> в <code>TickService</code>. <code>CoroutinePerformer</code> нужен для <code>SceneSwitcher.LoadScene</code>; он хранит единственный <code>DontDestroyOnLoad</code>-экземпляр.'},
    api: {title:'API', groups:[
      ['DI',['<code>DIContainer</code> регистрирует singleton/transient, сканирует <code>RegisterAttribute</code>, создаёт через конструктор и внедряет помеченные поля, свойства и методы. <code>Resolve</code> сообщает об отсутствующей регистрации и циклической зависимости.','<code>RegisterAttribute</code> задаёт контракт и <code>RegisterType.Singleton</code> или <code>Transient</code>; <code>InjectAttribute</code> допустим на конструкторе, поле, свойстве и методе.','<code>TypeInfo</code> хранит отражённые конструктор и члены injection; <code>TypeMetadata</code> кэширует <code>TypeInfo</code> по типу.']],
      ['Tick System',['<code>TickService</code>: <code>Register</code>/<code>Unregister</code> применяются в ближайшем кадре; <code>Pause</code>/<code>Resume</code> останавливают только gameplay. Доступны <code>TargetTickRate</code>, <code>RealTickRate</code>, <code>TickExecutionTimeMs</code>, <code>TickInterval</code>.','<code>TickAdapter</code> — MonoBehaviour-мост из <code>Update</code>. <code>TickOptions.TICK_RATE</code> задаёт начальную частоту <code>AppBootstrap</code>.','<code>ITickable.Tick(float)</code> — базовый контракт. <code>ISystemTickable</code> и <code>IUITickable</code> получают unscaled delta; <code>IGameplayTickable</code> — фиксированный интервал; <code>IPresentationTickable</code> выполняется в непоставленном gameplay-блоке с unscaled delta.']],
      ['LifeCycle & Pooling',['<code>SpawnService</code> ставит <code>Spawn</code> и <code>Despawn</code> в очереди, исполняемые в системном тике. Он внедряет зависимости, уведомляет lifecycle-компоненты и регистрирует tickables.','<code>ObjectPool</code> предварительно создаёт экземпляры, вызывает <code>OnConstruct</code> при создании, а при возврате деактивирует объект и снимает тики. <code>SpawnPoolsConfig</code> загружается как <code>Resources.Load("SpawnPoolsConfig")</code>; ключ пула — EntityId префаба.','<code>SceneObject</code> помечает объект сцены для обработки. <code>SpawnRequest&lt;T&gt;</code> и <code>SpawnGameObjectRequest</code> — внутренние запросы очереди. Контракты: <code>IConstructable.OnConstruct()</code>, <code>ISpawnable.OnSpawn()</code>, <code>IDespawnable.OnDespawn()</code>, <code>IDestroyable.OnDestroyed()</code>.']],
      ['Events',['<code>EventBus</code> хранит обработчики по точному типу события: <code>Register&lt;T&gt;</code>, <code>Unregister&lt;T&gt;</code>, <code>Invoke&lt;T&gt;</code>. <code>IGameEvent</code> — маркерный интерфейс. Повторная регистрация логируется как ошибка; исключение одного обработчика не прерывает остальных.']],
      ['Scenes',['<code>SceneSwitcher.LoadScene(string, ISceneArgs)</code> запускает асинхронную загрузку через <code>CoroutinePerformer</code>, показывает <code>LoadScreen</code>, обрабатывает <code>SceneObject</code> и вызывает найденный <code>SceneBootstrap.Initialize</code>.','<code>ISceneArgs</code> — маркер параметров перехода. <code>SceneBootstrap</code> — абстрактный MonoBehaviour с internal <code>Initialize(ISceneArgs)</code>. <code>LoadScreen</code> сохраняется между сценами при <code>OnConstruct</code>.']],
      ['Dev Console',['<code>CommandAttribute(name, description)</code> помечает метод; имя приводится к lower-case. <code>CommandsRegistry.RegisterAllCommands()</code> сканирует загруженные сборки и создаёт <code>ConsoleCommand</code>.','<code>CommandExecutor.Execute</code> разбирает ввод по пробелам и поддерживает <code>string</code>, <code>int</code>, <code>float</code>, <code>bool</code>, <code>Vector2</code>, <code>Vector3</code> и enum. Векторы вводятся как <code>x,y</code> / <code>x,y,z</code>; строки с пробелами не поддерживаются.','<code>DevConsoleUI</code> показывает ввод, историю, логи и suggestions. <code>CommandAutoComplete</code> строит подсказки по префиксу и usage. <code>ConsoleLogListener</code> передаёт Unity-логи в <code>ConsoleLogStorage</code>, который хранит <code>ConsoleLog</code> и публикует <code>LogAddedEvent</code>.']],
      ['Coroutines',['<code>CoroutinePerformer</code> — публичный MonoBehaviour с <code>Instance</code>. Его <code>Awake</code> сохраняет первый экземпляр между сценами и уничтожает дубликаты. Запускайте корутины через <code>CoroutinePerformer.Instance</code> только после его инициализации.']]
    ]},
    architecture: {title:'Устройство', steps:[['1 · Boot','После загрузки сцены <code>AppBootstrap.Initialize</code> создаёт <code>DIContainer</code>, сканирует его assembly на <code>RegisterAttribute</code>, создаёт <code>TickService</code> и <code>SpawnService</code>. Затем он регистрирует сервисы как экземпляры, регистрирует <code>SpawnService</code> системным тикером и вызывает обработку <code>SceneObject</code>.'],['2 · DI → системы','Контейнер разрешает зарегистрированные контракты и выполняет injection. <code>TickAdapter</code> получает <code>TickService</code> методом с <code>[Inject]</code> и передаёт ему каждый Unity Update. Очереди регистрации определяют каналы системы по реализованному интерфейсу.'],['3 · События','Игровой код явно держит <code>EventBus</code>, подписывает <code>Action&lt;T&gt;</code> и вызывает <code>Invoke</code>. Шина не создаётся <code>AppBootstrap</code> и не регистрируется им автоматически: это важно учитывать при композиции приложения.'],['4 · Объекты','<code>SpawnService</code> физически создаёт объект или берёт его из <code>ObjectPool</code> в собственном тике. Порядок пула: construct при создании → injection, spawn, регистрация тиков при выдаче → despawn, снятие тиков при возврате.'],['5 · Консоль','Вызов <code>CommandsRegistry.RegisterAllCommands()</code> наполняет registry отмеченными методами. <code>DevConsoleUI</code> передаёт текст в <code>CommandExecutor</code>; исполнитель ищет команду, проверяет число аргументов, преобразует значения и вызывает MethodInfo.']]},
    reference: {title:'Структура', tree:`Assets/_KofeyekToolkit/_Scripts
├── Core
│   ├── AppBootstrap.cs, CoroutinePerformer.cs, Options/TickOptions.cs
│   ├── TickSystem/                 TickService, adapter и интерфейсы каналов
│   ├── LifeCycle/                  SpawnService, ObjectPool, requests, contracts
│   └── Scenes/                     bootstrap, switcher и LoadScreen
├── DI
│   ├── Attributes/                 RegisterAttribute, InjectAttribute
│   └── Core/                       DIContainer, TypeInfo, TypeMetadata
├── EventSystem/                    EventBus, IGameEvent
└── DevConsole/
    ├── Core/                       команды, registry и executor
    └── Visuality/                  UI, suggestions и хранилище логов`, after:'Папки отражают текущие исходники. В этой статичной документации нет генерируемого API и внешней системы сборки.'}
  },
  en: {
    title: 'KofeyekToolkit — Documentation', repository:'Repository', menu:'Menu', sourceOnly:'Source-led reference', nav:[['overview','Overview'],['quick-start','Quick start'],['api','API'],['architecture','Architecture'],['reference','Reference']], hero:['Developer documentation','KofeyekToolkit','A small Unity foundation for CandyCandleGames: DI, managed object lifecycle, ticks, events, scenes, and developer tooling. It currently targets small indie games and grows toward the needs of larger projects.'],
    overview:{title:'Overview',cards:[['Source-led','This reference is deliberately limited to code in <code>Assets/_KofeyekToolkit/_Scripts</code>; it does not promise unimplemented features.'],['Entry point','<code>AppBootstrap</code> creates the container, tick, and spawn services after a scene loads.'],['Modular systems','Each system offers a small API that can serve as a foundation for game components.'],['Unity-first','Scenes, <code>MonoBehaviour</code>, <code>ScriptableObject</code>, and <code>Resources</code> remain part of the workflow.']]},
    quick:{title:'Quick start',intro:'Place <code>_KofeyekToolkit</code> under <code>Assets/</code>. Include <code>Assets/_KofeyekToolkit/Scenes/Boot.unity</code> in Build Settings as the startup scene: static <code>AppBootstrap</code> runs global initialization after scene load.',code:`// The service obtains TickService through DI.
public sealed class ExampleSystem : IGameplayTickable
{
    public void Tick(float deltaTime) { /* game logic */ }
}

// Add SceneObject to scene objects.
// SpawnService handles injection, lifecycle, and tickables.`,note:'<code>TickAdapter</code> must be present in a scene to forward <code>Time.unscaledDeltaTime</code> to <code>TickService</code>. <code>CoroutinePerformer</code> is required for <code>SceneSwitcher.LoadScene</code>; it keeps one <code>DontDestroyOnLoad</code> instance.'},
    api:{title:'API',groups:[['DI',['<code>DIContainer</code> registers singleton/transient services, scans <code>RegisterAttribute</code>, constructs objects, and injects marked fields, properties, and methods. <code>Resolve</code> reports missing registrations and circular dependencies.','<code>RegisterAttribute</code> supplies a contract and <code>RegisterType.Singleton</code> or <code>Transient</code>; <code>InjectAttribute</code> is valid on constructors, fields, properties, and methods.','<code>TypeInfo</code> stores reflected constructors and injection members; <code>TypeMetadata</code> caches <code>TypeInfo</code> per type.']],['Tick System',['<code>TickService</code>: <code>Register</code>/<code>Unregister</code> apply next frame; <code>Pause</code>/<code>Resume</code> stop gameplay only. It exposes <code>TargetTickRate</code>, <code>RealTickRate</code>, <code>TickExecutionTimeMs</code>, and <code>TickInterval</code>.','<code>TickAdapter</code> is the MonoBehaviour bridge from <code>Update</code>. <code>TickOptions.TICK_RATE</code> supplies AppBootstrap’s initial rate.','<code>ITickable.Tick(float)</code> is the base contract. <code>ISystemTickable</code> and <code>IUITickable</code> receive unscaled delta; <code>IGameplayTickable</code> receives a fixed interval; <code>IPresentationTickable</code> runs in the unpaused gameplay block with unscaled delta.']],['LifeCycle & Pooling',['<code>SpawnService</code> queues <code>Spawn</code> and <code>Despawn</code> work for its system tick. It injects dependencies, notifies lifecycle components, and registers tickables.','<code>ObjectPool</code> pre-creates instances, calls <code>OnConstruct</code> on creation, and deactivates/unregisters ticks on return. <code>SpawnPoolsConfig</code> loads through <code>Resources.Load("SpawnPoolsConfig")</code>; a prefab EntityId is the pool key.','<code>SceneObject</code> marks a scene object for processing. <code>SpawnRequest&lt;T&gt;</code> and <code>SpawnGameObjectRequest</code> are internal queue requests. Contracts: <code>IConstructable.OnConstruct()</code>, <code>ISpawnable.OnSpawn()</code>, <code>IDespawnable.OnDespawn()</code>, <code>IDestroyable.OnDestroyed()</code>.']],['Events',['<code>EventBus</code> stores handlers by exact event type: <code>Register&lt;T&gt;</code>, <code>Unregister&lt;T&gt;</code>, <code>Invoke&lt;T&gt;</code>. <code>IGameEvent</code> is a marker interface. Duplicate registrations log an error; one handler exception does not stop the rest.']],['Scenes',['<code>SceneSwitcher.LoadScene(string, ISceneArgs)</code> starts an async load through <code>CoroutinePerformer</code>, shows <code>LoadScreen</code>, processes <code>SceneObject</code>, and calls the found <code>SceneBootstrap.Initialize</code>.','<code>ISceneArgs</code> marks transition arguments. <code>SceneBootstrap</code> is an abstract MonoBehaviour with internal <code>Initialize(ISceneArgs)</code>. <code>LoadScreen</code> persists between scenes on <code>OnConstruct</code>.']],['Dev Console',['<code>CommandAttribute(name, description)</code> marks a method and lowercases its name; <code>CommandsRegistry.RegisterAllCommands()</code> scans loaded assemblies and creates <code>ConsoleCommand</code> entries.','<code>CommandExecutor.Execute</code> splits input on whitespace and supports <code>string</code>, <code>int</code>, <code>float</code>, <code>bool</code>, <code>Vector2</code>, <code>Vector3</code>, and enum. Vectors use <code>x,y</code> / <code>x,y,z</code>; strings with spaces are unsupported.','<code>DevConsoleUI</code> renders input, history, logs, and suggestions. <code>CommandAutoComplete</code> builds prefix suggestions and usage. <code>ConsoleLogListener</code> forwards Unity logs to <code>ConsoleLogStorage</code>, which stores <code>ConsoleLog</code> and raises <code>LogAddedEvent</code>.']],['Coroutines',['<code>CoroutinePerformer</code> is a public MonoBehaviour with <code>Instance</code>. Its <code>Awake</code> retains the first instance between scenes and destroys duplicates. Start through <code>CoroutinePerformer.Instance</code> only after it initializes.']]]},
    architecture:{title:'Architecture',steps:[['1 · Boot','After a scene loads, <code>AppBootstrap.Initialize</code> creates <code>DIContainer</code>, scans its assembly for <code>RegisterAttribute</code>, creates <code>TickService</code> and <code>SpawnService</code>, registers both instances, registers SpawnService as a system tickable, and processes <code>SceneObject</code>.'],['2 · DI → systems','The container resolves registered contracts and injects dependencies. <code>TickAdapter</code> receives <code>TickService</code> through an <code>[Inject]</code> method and forwards every Unity Update. Registration queues classify a system by its implemented tick interface.'],['3 · Events','Game code explicitly owns an <code>EventBus</code>, subscribes <code>Action&lt;T&gt;</code>, and invokes events. The bus is not created or automatically registered by <code>AppBootstrap</code>; account for that in app composition.'],['4 · Objects','<code>SpawnService</code> creates an object or obtains it from <code>ObjectPool</code> on its own tick. Pool order: construct on creation → injection, spawn, tick registration on checkout → despawn, tick removal on return.'],['5 · Console','Calling <code>CommandsRegistry.RegisterAllCommands()</code> populates the registry from marked methods. <code>DevConsoleUI</code> sends text to <code>CommandExecutor</code>, which finds the command, checks argument count, converts values, and invokes MethodInfo.']]},
    reference:{title:'Reference',tree:`Assets/_KofeyekToolkit/_Scripts
├── Core
│   ├── AppBootstrap.cs, CoroutinePerformer.cs, Options/TickOptions.cs
│   ├── TickSystem/                 TickService, adapter, channel interfaces
│   ├── LifeCycle/                  SpawnService, ObjectPool, requests, contracts
│   └── Scenes/                     bootstrap, switcher, LoadScreen
├── DI
│   ├── Attributes/                 RegisterAttribute, InjectAttribute
│   └── Core/                       DIContainer, TypeInfo, TypeMetadata
├── EventSystem/                    EventBus, IGameEvent
└── DevConsole/
    ├── Core/                       commands, registry, executor
    └── Visuality/                  UI, suggestions, log storage`,after:'Folders reflect the current source tree. This static documentation has no generated API or external build system.'}
  }
};
const content = document.querySelector('#content');
const nav = document.querySelector('#navigation');
const langButtons = document.querySelectorAll('[data-language]');
let language = localStorage.getItem('kofeyek-toolkit-language');
if (!translations[language]) language = navigator.language.startsWith('ru') ? 'ru' : 'en';

function cards(items) { return `<div class="cards">${items.map(([name, text]) => `<article class="card"><span class="tag">${name}</span><p>${text}</p></article>`).join('')}</div>`; }
function api(groups) { return groups.map(([title, entries]) => `<section class="api-group"><h3>${title}</h3><div class="api-list">${entries.map(entry => `<article class="api-item"><p>${entry}</p></article>`).join('')}</div></section>`).join(''); }
function render() {
  const t = translations[language];
  document.documentElement.lang = language;
  document.title = t.title;
  document.querySelectorAll('[data-ui]').forEach(el => el.textContent = t[el.dataset.ui]);
  langButtons.forEach(button => button.classList.toggle('active', button.dataset.language === language));
  nav.innerHTML = t.nav.map(([id, label]) => `<a class="nav-link" href="#${id}">${label}</a>`).join('');
  content.innerHTML = `
    <section id="overview" class="section"><p class="eyebrow">${t.hero[0]}</p><h1>${t.hero[1]}</h1><p class="lead">${t.hero[2]}</p><h2>${t.overview.title}</h2>${cards(t.overview.cards)}</section>
    <section id="quick-start" class="section"><h2>${t.quick.title}</h2><p>${t.quick.intro}</p><pre><code>${escapeHtml(t.quick.code)}</code></pre><div class="callout"><p>${t.quick.note}</p></div></section>
    <section id="api" class="section"><h2>${t.api.title}</h2>${api(t.api.groups)}</section>
    <section id="architecture" class="section"><h2>${t.architecture.title}</h2>${cards(t.architecture.steps)}</section>
    <section id="reference" class="section"><h2>${t.reference.title}</h2><pre class="tree">${escapeHtml(t.reference.tree)}</pre><p>${t.reference.after}</p></section>
    <footer class="footer">KofeyekToolkit · CandyCandleGames · <code>Assets/_KofeyekToolkit/_Scripts</code></footer>`;
  observeNavigation();
}
function escapeHtml(value) { const node = document.createElement('span'); node.textContent = value; return node.innerHTML; }
function observeNavigation() {
  const links = [...nav.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), {rootMargin:'-25% 0px -65% 0px'});
  sections.forEach(section => observer.observe(section));
}
langButtons.forEach(button => button.addEventListener('click', () => { language = button.dataset.language; localStorage.setItem('kofeyek-toolkit-language', language); render(); }));
const sidebar = document.querySelector('#sidebar');
const menuButton = document.querySelector('#menu-button');
menuButton.addEventListener('click', () => { const open = sidebar.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', () => { sidebar.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); });
render();
