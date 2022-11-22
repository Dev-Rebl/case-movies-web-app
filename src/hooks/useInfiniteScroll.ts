import { useEffect, useRef } from "react";

interface IProps {
    observeWhen: boolean;
    onIntersect: () => void;
}

export const useInfiniteScroll = <T extends Element >({
    observeWhen,
    onIntersect = () => { }
}: IProps): React.RefObject<T> => {
    const lastItemRef = useRef<T>(null);
    const intersectionObserverRef = useRef<IntersectionObserver>();

    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
            if (lastItemRef.current) {
                intersectionObserverRef.current?.unobserve(lastItemRef.current);
            }

            onIntersect();
        }
    };

    useEffect(() => {
        if (observeWhen) {
            intersectionObserverRef.current = new IntersectionObserver(callbackFunction, {
                rootMargin: "0px 0px 200px 0px",
                threshold: 1
            });
            if (lastItemRef.current) intersectionObserverRef.current.observe(lastItemRef.current);
        }

        return () => {
            if (lastItemRef.current) intersectionObserverRef.current?.unobserve(lastItemRef.current);
        };

    }, [lastItemRef, observeWhen]);

    return lastItemRef;
};