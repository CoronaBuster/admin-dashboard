import {Subject} from 'rxjs'
import {isDesktop} from "./util";
import { map,distinctUntilChanged,debounceTime} from 'rxjs/operators';

export const menuClicks = new Subject();
const sizeChanges = new Subject();
console.log('sizeChanges',sizeChanges)
export const mobileModeChanged = sizeChanges.pipe(map(x => !isDesktop())).pipe(distinctUntilChanged()).pipe(debounceTime(100));
export const toogleClick = () => menuClicks.next(true);


window.onresize = () => sizeChanges.next(true);