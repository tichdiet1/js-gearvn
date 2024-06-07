import { pageMain , $, $$, $$$ } from '../../store/index.js';
import chatCpn from './chat.js';
import { 
    newSendChat,
    scrollEndOfPage
} from './chat.js';
const arrSvgStar = [
    {
        svg: `
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        `
    },
    {
        svg: `
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        `
    },
    {
        svg: `
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        `
    },
    {
        svg: `
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        `
    },
    {
        svg: `
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
            <svg width="25" height="25" fill="#faaf00" viewBox="0 0 24 24" data-testid="StarIcon"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        `
    }
];
const reverseArrSvgStar = arrSvgStar.reverse();
$$('.like-star-staff').forEach((items, index) => {
    items.addEventListener('mouseover', function() {
        $$('.like-star-staff').forEach(items => {
            items.classList.remove('selected');
        })
        $$('.like-star-staff')[index].classList.add('selected');
    })
    items.addEventListener('mouseout', function() {
        $$('.like-star-staff').forEach(items => {
            items.classList.remove('selected');
        });
        $$('.like-star-staff')[0].classList.add('selected');
    })
    items.addEventListener('click', function() {
        $$('.like-star-staff').forEach(items => {
            items.classList.remove('selected');
        });
        $$('.like-star-staff')[index].classList.add('selected');
        newSendChat(arrSvgStar[index].svg);
        scrollEndOfPage()
    })
})
export default pageMain;