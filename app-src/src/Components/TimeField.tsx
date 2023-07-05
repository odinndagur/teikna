import { useRef } from 'react'
import { useLocale } from '@react-aria/i18n'
import { useTimeFieldState } from '@react-stately/datepicker'
import { useTimeField } from '@react-aria/datepicker'

import { useDateSegment } from '@react-aria/datepicker'

export function DateSegment({ segment, state }) {
    let ref = useRef()
    let { segmentProps } = useDateSegment(segment, state, ref)

    return (
        <div
            {...segmentProps}
            ref={ref}
            style={{
                ...segmentProps.style,
                minWidth:
                    segment.maxValue != null &&
                    String(segment.maxValue).length + 'ch',
            }}
            className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group ${
                !segment.isEditable ? 'text-gray-500' : 'text-gray-800'
            }`}
        >
            {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
            <span
                aria-hidden="true"
                className="block w-full text-center italic text-gray-500 group-focus:text-white"
                style={{
                    visibility: segment.isPlaceholder ? '' : 'hidden',
                    height: segment.isPlaceholder ? '' : 0,
                    pointerEvents: 'none',
                }}
            >
                {segment.placeholder}
            </span>
            {segment.isPlaceholder ? '' : segment.text}
        </div>
    )
}

export function TimeField(props) {
    let { locale } = useLocale()
    let state = useTimeFieldState({
        ...props,
        locale,
    })

    let ref = useRef()
    let { labelProps, fieldProps } = useTimeField(props, state, ref)

    return (
        <div className="flex flex-col items-start">
            <span {...labelProps} className="text-sm text-gray-800">
                {props.label}
            </span>
            <div
                {...fieldProps}
                ref={ref}
                style={{ display: 'flex' }}
                className="flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md pr-8 focus-within:border-violet-600 focus-within:hover:border-violet-600 p-1"
            >
                {state.segments.map((segment, i) => (
                    <DateSegment key={i} segment={segment} state={state} />
                ))}
            </div>
        </div>
    )
}
