---
layout: page
---

<h1>Классическое программирование для&nbsp;фронтендеров</h1>

Проблема современной веб-разработки заключается в том, что индустрия развивается очень быстро и в нее приходят ребята совсем без подготовки и сразу же начинают гнаться за бешеным потоком новых инструментов и фич. Я считаю, что разработчики, вместо поиска новых инструментов должны опираться на мощную базу, разработанную программистами из параллельных областей, изучать алгоритмы и структуры данных и приемы, которые применялись другими разработчиками раньше. Многие из этих приемов были придуманы для решения похожих задач, но в гораздо более сложных условиях: раньше компьютеры были не настолько мощными, поэтому приходилось искать действительно эффективные решения.

Разница между решениями и инструментами заключается в том, что решения не зависят от времени и выбранного стека технологий. Один и тот же алгоритм будет работать для UI сделанного как на Реакте, так и на jQuery

<h2 style="color: #000">Выступления</h2>

<div style="margin-bottom: 40px;">
  Выступление на <a href="https://events.yandex.ru/events/yagosti/17-18-september-2016/">FrontTalks</a> в&nbsp;Екатеринбурге<br><nobr>18 сентября 2016</nobr>

  <iframe width="800" height="600" src="https://www.youtube.com/embed/mc7EMdyawBk" frameborder="0" allowfullscreen></iframe>
  <a href="{{site_url}}/share/2-classic-programming.pdf" target="_blank">Презентация</a>&nbsp;(PDF, 5 МБ)
</div>

<div class="col-wrapper col-wrapper-2" style="padding-bottom: 20px;">
  <div class="col col-1">
    Выступление на Moscow&nbsp;JS&nbsp;Conf в&nbsp;Москве<br><nobr>24 сентября 2016</nobr>

    <iframe width="320" height="240" src="https://www.youtube.com/embed/b2AhDtFfSSU" frameborder="0" allowfullscreen></iframe>
    <a href="{{site_url}}/share/2-classic-programming.pdf" target="_blank">Презентация</a>&nbsp;(PDF, 5 МБ)
  </div>

  <div class="col col-2">
    Выступление на <a href="https://events.yandex.ru/events/meetings/7-july-2016/">Фронтенд-Миксе</a> <nobr>в Яндекс.Деньгах</nobr> в&nbsp;Питере <nobr>7 июля 2016</nobr><br>
    <iframe width="320" height="240" src="https://www.youtube.com/embed/5H923I_Cj3k" frameborder="0" allowfullscreen></iframe><br>
    <a href="{{site_url}}/share/classic-programming-for-frontenders.pdf" target="_blank">Презентация</a>&nbsp;(PDF, 20 МБ)
  </div>
</div>

<hr />

## Практика

### Битовые массивы
Битовый массив или битовая карта (bitset, bitarray, bitmap) — последовательность бит (нулей и единиц). Правильное использование битовых массивов поможет писать более производительный и лучше поддерживаемый код. Если же использовать битовые массивы вместе со словарями, можно писать код в декларативном стиле

[Библиотека от HTML Academy](https://github.com/htmlacademy/bitset.js/){:target="_blank"} для работы с битовыми картами<br>
[Разработка компоненты со сложным состоянием]({{site_url}}/trees/bitmasks-example/){:target="_blank"}, интерактивная демка

----

### Деревья
Деревья — это иерархические рекурсивные структуры данных, они помогают описывать отношения между объектами. Описать дерево в JS можно с помощью встроенного объекта, а код визитора, который использует самый простой способ обхода дерева — прямой поиск в глубину — займет всего пять строк, вместе с управляющим кодом

[Использование дерева для описания зависимостей в форме]({{site_url}}/trees/example/){:target="_blank"}, интерактивная демка
