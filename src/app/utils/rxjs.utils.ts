import {fromEventPattern, map} from 'rxjs';

export const getElementWidth = (element: any) => {
    let resizeObserver: ResizeObserver;
    return fromEventPattern<(ResizeObserverEntry[] | ResizeObserver)[]>(
        handler => {
            resizeObserver = new ResizeObserver(handler);
            resizeObserver.observe(element);
        },
        handler => resizeObserver?.disconnect()
    ).pipe(
        map(entries => {
            const resizeObserverEntries = (entries.filter(entry => Array.isArray(entry) && entry.length > 0 && 'contentRect' in entry[0]) as unknown as ResizeObserverEntry[][])
                .flatMap(entry => entry);
            return resizeObserverEntries[0].contentRect.width;
        })
    );
};