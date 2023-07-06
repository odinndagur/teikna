export function GridOverlay({
    showGrid,
    innerKey,
    height,
    width,
    rotation,
}: {
    showGrid?: boolean
    innerKey?: any
    height?: any
    width?: any
    rotation: number
}) {
    return (
        <div
            key={innerKey}
            style={{
                pointerEvents: 'none',
                boxSizing: 'border-box',
                // outline: '1px solid pink',
                position: 'absolute',
                // padding: '1rem',
                inset: 0,
                // bottom: '4px',
                // bottom: '-4px',
                // maxHeight: '95%',
                // height: 'calc(100% - 4px)',
                // width: '95%',
                // maxHeight: '95%',
                // width: '95%',
                padding: `${[0, 3, 2, 1]
                    .map((val) => {
                        return rotation === val
                            ? // ? '10rem'
                              'env(safe-area-inset-top)'
                            : '0px'
                    })
                    .join(' ')}
                    `,
                height: height ?? 'auto',
                width: width ?? 'auto',
                margin: 'auto',
                // backgroundColor:
                //     'rgba(255,255,0,0.3)',
                display: 'grid',
                visibility: showGrid ? 'visible' : 'hidden',
                gridTemplateColumns: '1fr 1fr 1fr',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    border: '1px solid var(--grid-color)',
                    boxSizing: 'border-box',
                }}
            ></div>
        </div>
    )
}
