export function CenterLineOverlay({
    showCenterLine,
    horizontal,
    vertical,
    innerKey,
    height,
    width,
    rotation,
}: {
    showCenterLine?: boolean
    horizontal?: boolean
    vertical?: boolean
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
                visibility: showCenterLine ? 'visible' : 'hidden',
                gridTemplateColumns: '1fr 1fr',
            }}
        >
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    // border: '1px solid var(--grid-color)',
                    borderRight: vertical
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    borderBottom: horizontal
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    // backgroundColor: 'rgba(255,0,0,0.1)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    // border: '1px solid var(--grid-color)',
                    borderLeft: vertical
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    borderBottom: horizontal
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    // backgroundColor: 'rgba(0,255,0,0.1)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    borderRight: vertical
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    borderTop: horizontal
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    // border: '1px solid var(--grid-color)',
                    // backgroundColor: 'rgba(0,0,255,0.1)',
                    boxSizing: 'border-box',
                }}
            ></div>
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    borderLeft: vertical
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    borderTop: horizontal
                        ? '1px solid var(--grid-color)'
                        : undefined,
                    // border: '1px solid var(--grid-color)',
                    // backgroundColor: 'rgba(127,127,0,0.1)',
                    boxSizing: 'border-box',
                }}
            ></div>
        </div>
    )
}
