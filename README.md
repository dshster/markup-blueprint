## Введение

__Node.js__ (Node)

> Node не является сервером, это платформа на движке V8 (транслятор javascript в машинный код) предоставляющая доступ к низкоуровневым устройствам ввода-вывода для javascript через свой API. <sup>[1]</sup> <sup>[2]</sup>

__npm__ - Менеджер сторонних пакетов. Входит в дистрибутив Node

> Главной частью экосистемы Node являются пакеты (javascript приложения со своим API). Пакеты могут зависеть друг от друга и задача npm не только установить пакеты, но и решить их рекурсивные зависимости и коллизии

> Любой желающий может создать и поделиться своим node-пакетом через npm, что делает экосистему всё больше и больше. На сегодняшний момент уже больше 104 тыс. доступных пакетов. <sup>[3]</sup> <sup>[4]</sup>

?? Unix-way работа в консоли

![Unix-way](content/images/unix-way.png)

## Инициализация

> Для Node любой проект является пакетом поэтому начало работы идёт с его описания в файле ``package.json``. Его можно создать вручую или ответив на несколько вопросов запустив команду:

``npm init``

![Unix-way](content/images/npm-init.png)

> Название пакета, версия, описание, ссылка на репозиторий, авторство и лицензия

> При этом в секцию ``dependencies`` пропишутся уже локально установленные пакеты <sup>[5]</sup> <sup>[6]</sup>

---

[1]:https://ru.wikipedia.org/wiki/Node.js "Node.js"
[2]:http://nodejs.org/ "Node.js"
[3]:http://nodegeek.net/2014/01/node-js-ecosystem/ "Node.js ecosystem"
[4]:https://www.npmjs.org/ "Node Packaged Modules"
[5]:https://www.npmjs.org/doc/cli/npm-init.html "Interactively create a package.json file"
[6]:https://www.npmjs.org/doc/files/package.json.html "Specifics of npm's package.json handling"
