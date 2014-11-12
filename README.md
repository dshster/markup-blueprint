## Введение

**Node.js** (Node)

> Node не является сервером, это платформа на движке V8 (транслятор javascript в машинный код) предоставляющая доступ к низкоуровневым устройствам ввода-вывода для javascript через свой API. <sup>[1]</sup> <sup>[2]</sup>

**npm** - Менеджер сторонних пакетов. Входит в дистрибутив Node

> Главной частью экосистемы Node являются пакеты (javascript приложения со своим API). Пакеты могут зависеть друг от друга и задача npm не только установить пакеты, но и решить их рекурсивные зависимости и коллизии

> Любой желающий может создать и поделиться своим node-пакетом через npm, что делает экосистему всё больше и больше. На сегодняшний момент уже больше 104 тыс. доступных пакетов. <sup>[3]</sup> <sup>[4]</sup>

## Работа в консоли

> Node.js изначально была частью экосистем *nix где большая часть приложений и утилит разработаны для работы в командной строке (CLI - Command Line Interface), поэтому для комфортной работы нужно полюбить командную строку (консоль) <sup>[4.1]</sup>

> При должном уровне сноровки работа в консоли может быть намного производительнее, чем в файловом менеджере, особенно в терминале *nix с поддержкой автодополнения, истории ввода, копирования и вставки. Для Windows можно использовать эмуляторы терминала Cmder<sup>[4.2]</sup> или PowerShell<sup>[4.3]</sup>

> Консоль позволяет удобно отслеживать возвращаемые оповещения, инструкции и ошибки не отвлекаясь от рабочего окна и не потеряв ничего важного

![Unix-way](content/images/unix-way.png)

## Инициализация пакета (проекта)

> Для Node любой проект является пакетом поэтому начало работы идёт с его описания в файле ``package.json``. Его можно создать вручую или ответив на несколько вопросов запустив команду:

``npm init``

![Unix-way](content/images/npm-init.png)

> Название пакета, версия, описание, ссылка на репозиторий, авторство и лицензия

> При этом в секцию ``dependencies`` пропишутся уже локально установленные пакеты <sup>[5]</sup> <sup>[6]</sup> <sup>[7]</sup>

## Работа с пакетами

### Установка пакетов вручную

``npm install <имя_пакета>`` или сокращенно ``npm i <имя_пакета>``

##### Флаги:
* ``-g`` -  устанавливаем пакет глобально (для вызова из командной строки)
* ``-save`` - сохраняем имя пакета в секцию dependencies файла package.json
* ``-save-dev`` - сохраняем имя пакета в секцию devDependencies файла package.json

> В секцию devDependencies прописываются пакеты участвующие при разработке проекта (тестирование, линтинг, минимизирование, компиляция). В dependencies - пакеты непосредственно подключаемые при работе пакета <sup>[8]</sup>

> По-умолчанию пакет устанавливается в папку node_modules разрабатываемого пакета. Если у устанавливаемого пакета есть свои зависимости они тоже устанавливаются в папку node_modules в корне самого пакета (рекурсивная зависимость)

> **Важно!**
> Некоторые пакеты используются в командной строке (CLI: Command-line interface) в любой директории, для этого они должны быть установлены глобально (с флагом -g) и путь их установки должен быть прописан в переменной окружения PATH

### Автоматическая установка пакетов

``npm install`` или сокращенно ``npm i`` при наличии прописанных пакетов в секции dependencies и в devDependencies файла package.json

При установке пакета на продакшн командой ``npm install --production`` или сокращенно ``npm i --production`` пакеты из секции devDependencies установлены не будут <sup>[8]</sup>

## Пакеты для сборки

### Gulp.js

``npm install -g gulp``

``npm install gulp --save-dev``

> Gulp.js (Gulp) - потоковый менеджер задач (task runner) для сборки проектов

> Gulp - Node пакет работающий в командной строке (CLI) и предоставляющий интерфейс для поочередного запуска других пакетов, работы с файлами и каталогами через маски

#### Gulpfile.js

> Gulpfile - javascript файл описывающий подключение пакетов, задачи gulp и при необходимости сервисные функции. <sup>[9]</sup>

> Gulpfile создаётся в корне проекта

``touch Gulpfile.js``

![Unix-way](content/images/touch-gulpfile.png)

> При запуске Gulp без параметов при пустом Gulpfile выдаётся сообщение об отсутствии задачи с именем **default**, которая выполняется по-умолчанию

![Unix-way](content/images/gulpfile-blank.png)

> В параметрах вызова Gulp можно передать имя задачи

> Откроем на редактирование Gulpfile.js. Весь javascript будем писать в Strict-режиме

> Подключим пакет Gulp и создадим задачу по-умолчанию:

```javascript
'use strict';

var gulp = require('gulp');

gulp.task('default');
```

#### Lesscss

``npm install gulp-less --save-dev``

```javascript
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    less = require('gulp-less');

gulp.task('lesscss', function() {
  return gulp.src('./styles.less')
             .pipe(less())
             .pipe(rename('styles.css'))
             .pipe(gulp.dest('./'));
});

gulp.task('default', ['lesscss']);
```

> Функция gulp.src образует поток (stream) который направляется в трубу (pipe). Каждый сегмент трубы вызывает пакет-обработчик и снова образует поток. Таким образом на один поток можно ставить несколько обработчиков

> Обработчик gulp.dest записывает текущий поток в файл в указанную папку. Имя файла при этом сохраняется исходное и чтобы его изменить применяется пакет gulp-rename <sup>[10]</sup> ``npm install gulp-rename --save-dev``

> gulp.dest не завершает поток, а вставляется в секцию трубы

#### Autoprefixer

``npm install gulp-autoprefixer --save-dev``

> **autoprefixer** пакет для автоматической подстановки вендорных префиксов к свойствам. Данные берутся из базы сайта http://caniuse.com/

> Чтобы не объявлять каждый gulp-пакет в отдельную переменную используем пакет gulp-load-plugins <sup>[11]</sup>, который автоматический загружает пакеты в объект при обращении. Установка: ``npm install gulp-load-plugins --save-dev``

> В итоге задача **lesscss** будет выглядеть так:

```javascript
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('lesscss', function() {
  return gulp.src('./styles.less')
             .pipe(plugins.less())
             .pipe(plugins.autoprefixer(
                 ['last 3 versions', 'ie 9', 'ie 10', 'opera 12']
              ))
             .pipe(plugins.rename('styles.css'))
             .pipe(gulp.dest('./app/styles'));
});

gulp.task('default', ['lesscss']);
```

> Запуск из командной строки может выполняться без параметров ``grunt``, при этом выполняется задача default или с именем задачи в параметрах ``grunt lesscss``, тогда выполняется задача lesscss. Последнее может быть удобно при отладке определённой задачи без выполнения остальных

#### Шаблоны имён файлов

> gulp.src может принимать не только один файл, но и массив имён и массив шаблонов <sup>[12]</sup>

* ``'*.js'`` - любое имя файла
* ``'filename.*'`` - любое расширение
* ``'/*/filename.js'`` - любой каталог
* ``'/**/*.js'`` - любой вложенный каталог
* ``'/{foo,bar}/*.js'`` - каталог foo или bar
* ``'/fonts/*.{ttf,svg,woff}'`` - расширение файла ttf или svg или woff
* ``['filename.*', '!*.css']`` - любое расширение кроме css

#### Watch. Мониторинг изменений в файлах

> Встроенная функция gulp.watch для отслеживания изменений в файлах проекта и запуска заданных задач <sup>[13]</sup>

```javascript
gulp.task('watch', function() {
  gulp.watch(['*.less'], ['lesscss']);
});
```

> Запуск мониторинга ``grunt watch``. При изменениях в любом файле в текущем каталоге с расширением less запускается задача lesscss

> В одной задаче watch можно определять несколько шаблонов для мониторинга, либо одной функцией gulp.watch определяя шаблоны в массиве при вызове одной задачи, либо несколько gulp.watch с разными задачами.

> Таким образом можно отслеживать файлы разного типа в разных папках и запускать различные задачи

#### Livereload

> Livereload - расширенная версия мониторинга файлов позволяющая организовать автоматическую перезагрузку страницы в браузере при изменении шаблона, стилей или скриптов

> Для организации автоматической перезагрузки нам понадобятся:

``sudo npm install connect --save-dev``

> Connect - фреймворк являющийся прослойкой (middleware) к http серверу для обработки запросов

``npm install serve-static --save-dev``

> Connect middleware для вывода статичных файлов

``npm install connect-livereload --save-dev``

> Connect middleware для добавления скрипта livereload на страницу организовывающий асинхронное обновление стилей и обновление страницы при изменении шаблонов

``sudo npm install gulp-livereload --save-dev``

> Gulp livereload сервер

##### Задача server

```javascript
gulp.task('server', function(next) {
  var server = require('connect')(),
      servestatic = require('serve-static');

  server.use(require('connect-livereload')({
    port: 35729
  }));

  server.use(servestatic('./app', {
    'index': ['index.html', 'index.htm']
  }));

  server.listen(3000, next);
});
```

> servestatic обеспечивает доступ к статичным файлам в каталоге app, а server.listen прослушивание порта 3000 по адресу http://127.0.0.1

##### Задача watch

```javascript
gulp.task('watch', ['server'], function() {
  var liveserver = plugins.livereload();

  gulp.watch(['*.less'], ['lesscss']);

  gulp.watch(['./app/styles/*.css']).on('change', function(file) {
    liveserver.changed(file.path);
  });
});
```

> За изменениями в файлах следит gulp.watch. При вызове watch запускается задача server и запускается мониторинг по шаблонам.

> В премере первый мониторинг за less файлами вызывает задачу lesscss, при этом происходит компиляция в less в css который отслеживается вторым мониторингом и вызывает событие liveserver.changed с передачей имени изменённого файла


#### Jade

---

[1]:https://ru.wikipedia.org/wiki/Node.js "Node.js"
[2]:http://nodejs.org/ "Node.js"
[3]:http://nodegeek.net/2014/01/node-js-ecosystem/ "Node.js ecosystem"
[4]:https://www.npmjs.org/ "Node Packaged Modules"
[4.1]:https://ru.wikipedia.org/wiki/Интерфейс_командной_строки "Интерфейс командной строки"
[4.2]:http://bliker.github.io/cmder/ "cmder"
[4.3]:https://ru.wikipedia.org/wiki/Windows_PowerShell "Windows PowerShell"
[5]:https://www.npmjs.org/doc/cli/npm-init.html "Interactively create a package.json file"
[6]:https://www.npmjs.org/doc/files/package.json.html "Specifics of npm's package.json handling"
[7]:http://browsenpm.org/package.json "package.json structure"
[8]:http://howtonode.org/managing-module-dependencies "Managing module dependencies"
[9]:https://www.npmjs.org/package/gulp "The streaming build system"
[10]:https://github.com/hparra/gulp-rename "gulp-rename"
[11]:https://github.com/jackfranklin/gulp-load-plugins "gulp-load-plugins"
[12]:https://github.com/isaacs/minimatch "A minimal matching utility"
[13]:http://zencoder.ru/gulp-watch/ "gulp-watch"
