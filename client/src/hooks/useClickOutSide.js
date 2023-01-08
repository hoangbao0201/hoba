import { useEffect, useRef } from "react"

const useClickOutSide = ( node, handler, event ) => {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler])

    useEffect(() => {
        const handleClickOutside = (e) => {

            if(!node.current) {
                return;
            }
            if(node.current.contains(e.target)) {
                return;
            }
            if(handlerRef.current) {
                handlerRef.current();
            }
        }

        document.addEventListener(event || "mousedown", handleClickOutside);
        return () => {
            document.addEventListener(event || "mousedown", handleClickOutside);
        }
    }, [node, event])
}

export default useClickOutSide;