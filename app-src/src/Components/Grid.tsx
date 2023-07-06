import { Ref } from 'react'

export function Grid({
    children,
    id,
    ref,
}: {
    children: any
    id?: any
    ref?: Ref<HTMLDivElement>
}) {
    return (
        <div
            id={id}
            ref={ref}
            className="grid"
            style={{ scrollSnapType: 'y mandatory' }}
        >
            {children}
        </div>
    )
}
