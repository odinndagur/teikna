import { Link } from '@tanstack/react-location'
import { AppNavBar } from './AppNavBar'
import { useEffect, useState } from 'react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { useTranslation } from 'react-i18next'

export function Header({ children }: { children?: any }) {
    const [standalone, setStandalone] = useState(false)
    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setStandalone(true)
        }
    })
    const { t, i18n, ready } = useTranslation()

    return (
        <header
            style={{
                backgroundColor: 'var(--background-color)',
                position: standalone ? 'sticky' : undefined,
                top: 0,
                //padding: '2rem 1rem',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* <div
                    className="dark-mode-switch-container"
                    style={{
                        position: 'static',
                        top: 'env(safe-area-inset-top)',
                        left: '0',
                        padding: 0,
                        zIndex: 9999,
                        // display:standalone? 'none' : 'flex',
                        display: 'flex',
                        flexDirection: 'column',
                        visibility: !standalone ? undefined : 'hidden',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        const el = document.getElementById(
                            'app-save-modal'
                        ) as HTMLDialogElement
                        el.showModal()
                    }}
                >
                    <span className="material-icons">install_mobile</span>
                    <span>{t('save_app')}</span>
                </div> */}

                <div
                    className="dark-mode-switch-container"
                    style={{
                        position: 'static',
                        top: 'env(safe-area-inset-top)',
                        right: '0',
                        padding: 0,
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <DarkModeSwitch />
                    <button
                        onClick={() => {
                            const currentLanguage = i18n.language
                            if (currentLanguage.includes('en')) {
                                i18n.changeLanguage('is')
                            } else {
                                i18n.changeLanguage('en')
                            }
                        }}
                    >
                        {i18n.language.split('-')[0]}
                    </button>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexBasis: '100%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    maxHeight: '2rem',
                    padding: standalone ? '2rem' : undefined,
                }}
            >
                <Link
                    style={{
                        paddingBottom: standalone ? undefined : '3rem',
                        width: '10rem',
                    }}
                    to={'/'}
                    search={(old) => ({ ...old, scroll: 0 })}
                    className="heading"
                >
                    <img
                        src="/assets/images/Teikna-logo.png"
                        className="logo-image"
                        alt=""
                        width={'100%'}
                    />
                    {/* Teikna */}
                </Link>
            </div>
            <AppNavBar type="header" />
            {children}
        </header>
    )
}
