export function Grid({ children }) {
    return (
        <div className="grid" style={{ scrollSnapType: 'y mandatory' }}>
            {children}
        </div>
    )
}
