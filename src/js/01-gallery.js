/*
Задание 1 - библиотека SimpleLightbox
Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

Добавь библиотеку SimpleLightbox как зависимость проекта используя npm (ссылка на CDN из твоей прошлой работы больше не нужна).
Используй свой JavaScript код из предыдущей домашней работы, но выполни рефакторинг с учетом того, что библиотека была установлена через npm (синтаксис import/export).
Для того чтобы подключить CSS код библиотеки в проект, необходимо добавить еще один импорт, кроме того который описан в документации.

// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
*/
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line



import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector('.gallery')
const galleryMarkup = galleryBox(galleryItems);
gallery.insertAdjacentHTML("beforeend", galleryMarkup);


function galleryBox(images) {
 return images
        .map(({ preview, original, description }) => {
        return `
    <a class="gallery__item" 
       href="${original}">
    <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
    />
    </a>`
        })
        .join("");
}

new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
    captionDelay: 250,
});