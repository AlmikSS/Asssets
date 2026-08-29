const codeSamples = {
  tick: `using KofeyekToolkit.Core.TickSystem.Interfaces;

public sealed class EnemyBrain : IGameplayTickable
{
    public void Tick(float deltaTime)
    {
        // Called at TickService's fixed interval.
    }
}`,
  di: `using KofeyekToolkit.DI.Attributes;
using KofeyekToolkit.DI.Core;

[Register(typeof(IAudioService), RegisterType.Singleton)]
public sealed class AudioService : IAudioService { }

public sealed class PlayerPresenter
{
    [Inject] private IAudioService _audio;
}

var container = new DIContainer();
container.Register<IAudioService, AudioService>();
var audio = container.Resolve<IAudioService>();`,
  ticks: `public sealed class HudClock : IUITickable
{
    public void Tick(float deltaTime) => RefreshTime();
}

tickService.Register(new HudClock());
tickService.Pause();   // Gameplay and Presentation stop.
tickService.Resume();
var rate = tickService.TargetTickRate;`,
  spawn: `spawnService.Spawn(enemyPrefab, transform.position,
    Quaternion.identity, enemy => enemy.SetTarget(player));

spawnService.Spawn<Projectile>(projectilePrefab, origin,
    Quaternion.identity, projectile => projectile.Launch(direction));

spawnService.Despawn(enemy.gameObject);

public sealed class Projectile : MonoBehaviour, ISpawnable
{
    public void OnSpawn() { /* reset state */ }
}`,
  events: `using System;
using KofeyekToolkit.EventSystem;

public readonly struct CoinsChanged : IGameEvent
{ public readonly int Value; public CoinsChanged(int value) => Value = value; }

Action<CoinsChanged> redraw = e => coinsLabel.text = e.Value.ToString();
eventBus.Register(redraw);
eventBus.Invoke(new CoinsChanged(25));
eventBus.Unregister(redraw);`,
  scenes: `public sealed class LevelArgs : ISceneArgs
{ public int LevelId; }

sceneSwitcher.LoadScene("Gameplay", new LevelArgs { LevelId = 3 });

public sealed class GameplayBootstrap : SceneBootstrap
{
    internal override void Initialize(ISceneArgs args)
    {
        var level = (LevelArgs)args;
        // Load level.LevelId.
    }
}`,
  console: `using KofeyekToolkit.DevConsole;

public sealed class DebugCommands
{
    [Command("teleport", "Move the player")]
    private void Teleport(Vector3 point) => player.position = point;
}

CommandsRegistry.RegisterAllCommands();
CommandExecutor.Execute("teleport 4,1,9");
// In UI, enter: teleport 4,1,9`
};
const translations = {
ru: {
  repository:'Репозиторий', menu:'Меню', sourceOnly:'Документация по исходникам',
  landing:['Unity toolkit для игр','Инструменты, которые не мешают делать игру.','KofeyekToolkit — компактная основа для Unity-проектов: зависимости, тики, жизненный цикл объектов, события, сцены и консоль разработчика. Автор — Ис, также известный как Kofeyek, главный программист CandyCandleGames, занимающийся бэкендом.','Открыть документацию','Русский текст — оригинал. Английская версия — его перевод.'],
  nav:[['get-started','Get Started'],['rules','Rules'],['api','API'],['developers','For developers']],
  start:['Get Started','Подключите тулкит к проекту и начните с небольшой системы. Не нужно вручную собирать базовые сервисы: их поднимает AppBootstrap.','1. Поместите <code>_KofeyekToolkit</code> в <code>Assets/</code>.<br>2. Добавьте <code>Assets/_KofeyekToolkit/Scenes/Boot.unity</code> в Build Settings как первую сцену.<br>3. Добавьте в рабочую сцену <code>TickAdapter</code>; для переходов добавьте <code>CoroutinePerformer</code> и <code>LoadScreen</code>.','Первый тик'],
  rules:['Rules','Эти правила помогают системам тулкита работать предсказуемо. Держите этот раздел под рукой при подключении новых компонентов.',[
    ['Не создавайте глобальные сервисы вручную','<code>AppBootstrap</code> создаёт DI-контейнер, <code>TickService</code> и <code>SpawnService</code> после загрузки сцены. Получайте зарегистрированные зависимости через DI.'],
    ['Помните, что Spawn и Despawn отложены','<code>SpawnService</code> кладёт операции в очередь и выполняет их в своём системном тике. Настраивайте объект в callback, а не рассчитывайте на мгновенное создание.'],
    ['Выбирайте один канал тиков','<code>TickService</code> определяет канал по первому подходящему интерфейсу: System → Gameplay → UI → Presentation. Не реализуйте несколько tick-интерфейсов одним объектом.'],
    ['Gameplay-пауза — не глобальная пауза','<code>Pause()</code> останавливает Gameplay и Presentation. System и UI продолжают получать unscaled delta time.'],
    ['Регистрируйте команды до ввода','Перед использованием консоли вызовите <code>CommandsRegistry.RegisterAllCommands()</code>. Аргументы разделяются пробелами: строки с пробелами не поддерживаются.'],
    ['Сцена должна быть подготовлена','Для <code>LoadScene</code> нужны инициализированный <code>CoroutinePerformer</code>, <code>LoadScreen</code> и объект, наследующий <code>SceneBootstrap</code>, в целевой сцене.']]],
  api:['API','Краткая практическая справка по системам, которые есть в исходниках. Примеры показывают типичное использование и публичный API.',[
    ['DI — регистрация и внедрение','Контейнер создаёт singleton лениво, transient — при каждом Resolve. Атрибуты можно ставить на класс и поля, свойства, методы или конструктор.','di'],
    ['Tick System — ритм игры','Register/Unregister применяются на ближайшем Update. Gameplay получает фиксированный TickInterval, System/UI — unscaledDeltaTime.','ticks'],
    ['LifeCycle & Pooling — объекты','SpawnService автоматически внедряет зависимости, вызывает lifecycle-интерфейсы и подключает tickable-компоненты. Для пула создайте SpawnPoolsConfig в Resources.','spawn'],
    ['Events — сообщения без связности','EventBus работает по точному типу события. Храните ссылку на обработчик, чтобы снять именно ту подписку, которую добавили.','events'],
    ['Scenes — переход с аргументами','SceneSwitcher загружает сцену асинхронно, показывает LoadScreen, обрабатывает SceneObject и вызывает SceneBootstrap в новой сцене.','scenes'],
    ['Dev Console — команды','Атрибут помечает метод как команду. Исполнитель принимает string, int, float, bool, Vector2, Vector3 и enum; Vector3 вводится как x,y,z.','console']]],
  developers:['For developers','Раздел для тех, кто развивает сам тулкит. Сохраняйте маленькие, понятные модули и не скрывайте порядок работы системы.',[
    ['Boot и композиция','<code>AppBootstrap</code> сканирует assembly на <code>RegisterAttribute</code>, создаёт базовые сервисы, регистрирует экземпляры и добавляет SpawnService в системные тики.'],
    ['Расширение API','Добавляйте public API только с XML-документацией и примером на этом сайте. Сначала опишите назначение, сигнатуры, порядок вызовов и ограничения.'],
    ['Безопасность изменений','Не меняйте lifecycle-порядок без причины: injection → construct → spawn → регистрация тиков; при возврате: despawn → снятие тиков. Очереди не дают менять коллекции во время тика.'],
    ['Проверка сценария','Проверьте bootstrap чистого проекта, обычный объект, объект из пула, паузу, смену сцены и ошибочную команду консоли.']]]
},
en: {
  repository:'Repository', menu:'Menu', sourceOnly:'Source-led documentation',
  landing:['Unity toolkit for games','Tools that stay out of the way.','KofeyekToolkit is a compact foundation for Unity projects: dependencies, ticks, object lifecycle, events, scenes, and a developer console. Its author is Is, also known as Kofeyek, the lead programmer at CandyCandleGames, working on backend systems.','Open documentation','The Russian text is the original. The English version is its translation.'],
  nav:[['get-started','Get Started'],['rules','Rules'],['api','API'],['developers','For developers']],
  start:['Get Started','Add the toolkit to a project and begin with a small system. You do not need to assemble core services manually: AppBootstrap starts them.','1. Put <code>_KofeyekToolkit</code> under <code>Assets/</code>.<br>2. Add <code>Assets/_KofeyekToolkit/Scenes/Boot.unity</code> to Build Settings as the first scene.<br>3. Add <code>TickAdapter</code> to a working scene; for transitions add <code>CoroutinePerformer</code> and <code>LoadScreen</code>.','Your first tick'],
  rules:['Rules','These rules help toolkit systems remain predictable. Keep this section nearby while connecting new components.',[
    ['Do not create global services by hand','<code>AppBootstrap</code> creates DIContainer, <code>TickService</code>, and <code>SpawnService</code> after the scene loads. Receive registered dependencies through DI.'],
    ['Remember that Spawn and Despawn are deferred','<code>SpawnService</code> queues operations and runs them on its system tick. Configure the object in its callback instead of assuming immediate creation.'],
    ['Choose one tick channel','<code>TickService</code> selects the first matching interface: System → Gameplay → UI → Presentation. Do not implement multiple tick interfaces on one object.'],
    ['Gameplay pause is not a global pause','<code>Pause()</code> stops Gameplay and Presentation. System and UI still receive unscaled delta time.'],
    ['Register commands before input','Call <code>CommandsRegistry.RegisterAllCommands()</code> before using the console. Arguments are split on spaces, so strings containing spaces are unsupported.'],
    ['Prepare the scene','<code>LoadScene</code> requires an initialized <code>CoroutinePerformer</code>, <code>LoadScreen</code>, and a <code>SceneBootstrap</code> descendant in the destination scene.']]],
  api:['API','A short, practical reference for systems present in the source. Examples show typical use and public API.',[
    ['DI — registration and injection','The container creates a singleton lazily and a transient on every Resolve. Attributes work on a class and fields, properties, methods, or a constructor.','di'],
    ['Tick System — game rhythm','Register/Unregister apply on the next Update. Gameplay receives a fixed TickInterval; System/UI receive unscaledDeltaTime.','ticks'],
    ['LifeCycle & Pooling — objects','SpawnService injects dependencies, calls lifecycle interfaces, and connects tickable components automatically. Create SpawnPoolsConfig in Resources for pooling.','spawn'],
    ['Events — decoupled messages','EventBus uses the exact event type. Keep a handler reference so you remove the same subscription you added.','events'],
    ['Scenes — transition with arguments','SceneSwitcher loads asynchronously, shows LoadScreen, processes SceneObject, and calls SceneBootstrap in the new scene.','scenes'],
    ['Dev Console — commands','The attribute marks a command method. The executor accepts string, int, float, bool, Vector2, Vector3, and enum; enter Vector3 as x,y,z.','console']]],
  developers:['For developers','For people evolving the toolkit itself. Keep modules small and understandable, and make system order explicit.',[
    ['Boot and composition','<code>AppBootstrap</code> scans the assembly for <code>RegisterAttribute</code>, creates core services, registers their instances, and adds SpawnService to system ticks.'],
    ['Extending the API','Add public API only with XML documentation and a website example. Describe purpose, signatures, order of calls, and constraints first.'],
    ['Change safety','Do not alter lifecycle order without cause: injection → construct → spawn → tick registration; on return: despawn → tick removal. Queues avoid modifying collections during a tick.'],
    ['Scenario checks','Check a clean-project bootstrap, normal object, pooled object, pause, scene switch, and invalid console command.']]]
}};
const isDocs = Boolean(document.querySelector('#content'));
const esc = value => { const el = document.createElement('span'); el.textContent = value; return el.innerHTML; };
const pre = value => `<pre><code>${esc(value)}</code></pre>`;
const cards = items => `<div class="cards">${items.map(([name,text]) => `<article class="card"><span class="tag">${name}</span><p>${text}</p></article>`).join('')}</div>`;
let language = localStorage.getItem('kofeyek-toolkit-language'); if (!translations[language]) language = navigator.language.startsWith('ru') ? 'ru' : 'en';
function render() { const t = translations[language]; document.documentElement.lang = language; document.querySelectorAll('[data-language]').forEach(b => b.classList.toggle('active', b.dataset.language === language)); if (!isDocs) { const [eyebrow,title,text,button,note] = t.landing; document.querySelector('#landing-content').innerHTML = `<section class="landing-hero"><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="lead">${text}</p><a class="docs-button" href="docs.html">${button} <span>→</span></a><p class="translation-note">${note}</p></section>`; return; } document.title = `KofeyekToolkit — ${t.start[0]}`; document.querySelectorAll('[data-ui]').forEach(el => el.textContent=t[el.dataset.ui]); const nav=document.querySelector('#navigation'); nav.innerHTML=t.nav.map(([id,label])=>`<a class="nav-link" href="#${id}">${label}</a>`).join(''); const api=t.api[2].map(([title,text,sample])=>`<section class="api-group"><h3>${title}</h3><p>${text}</p>${pre(codeSamples[sample])}</section>`).join(''); document.querySelector('#content').innerHTML=`<section id="get-started" class="section"><p class="eyebrow">KofeyekToolkit</p><h1>${t.start[0]}</h1><p class="lead">${t.start[1]}</p><div class="callout"><p>${t.start[2]}</p></div><h3>${t.start[3]}</h3>${pre(codeSamples.tick)}</section><section id="rules" class="section"><h2>${t.rules[0]}</h2><p class="lead">${t.rules[1]}</p>${cards(t.rules[2])}</section><section id="api" class="section"><h2>${t.api[0]}</h2><p class="lead">${t.api[1]}</p>${api}</section><section id="developers" class="section"><h2>${t.developers[0]}</h2><p class="lead">${t.developers[1]}</p>${cards(t.developers[2])}</section><footer class="footer">KofeyekToolkit · CandyCandleGames · <code>Assets/_KofeyekToolkit/_Scripts</code></footer>`; observe(); }
function observe(){const links=[...document.querySelectorAll('#navigation a')]; const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('active',l.hash===`#${e.target.id}`));}),{rootMargin:'-25% 0px -65% 0px'}); links.forEach(l=>observer.observe(document.querySelector(l.hash)));}
document.querySelectorAll('[data-language]').forEach(b=>b.addEventListener('click',()=>{language=b.dataset.language;localStorage.setItem('kofeyek-toolkit-language',language);render();}));
if(isDocs){const sidebar=document.querySelector('#sidebar'),menu=document.querySelector('#menu-button');menu.addEventListener('click',()=>{const open=sidebar.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});document.querySelector('#navigation').addEventListener('click',()=>{sidebar.classList.remove('open');menu.setAttribute('aria-expanded','false');});}render();
