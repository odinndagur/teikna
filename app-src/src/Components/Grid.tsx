import { Ref } from 'react'

export function Grid({
    children,
    id,
    // ref,
    divRef,
}: {
    children: any
    id?: any
    // ref?: Ref<HTMLDivElement>
    divRef?: Ref<HTMLDivElement>
}) {
    return (
        <div
            id={id}
            ref={divRef}
            className="grid"
            style={{ scrollSnapType: 'y mandatory' }}
        >
            {children}
        </div>
    )
}
