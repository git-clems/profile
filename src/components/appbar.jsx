import { Link, NavLink } from "react-router-dom"
import './css/appbar.scss'
import { useEffect, useState } from "react"
import { user } from "../data"

const AppBar = () => {

    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')
    const [language, setLanguage] = useState(localStorage.getItem('language') ? localStorage.getItem('language') : 'french')


    const [showAppBar, setShowAppBar] = useState(true);
    const [hasShadow, setHasShadow] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    localStorage.setItem('theme', theme)
    localStorage.setItem('language', language)

    const app = document.getElementById('root')

    if (theme === 'light') {
        app.classList.add('dark')
        app.classList.remove('light')
    } else {
        app.classList.add('light')
        app.classList.remove('dark')
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Ombre si on a scrollé
            setHasShadow(currentScrollY > 0);

            // Toujours afficher en haut de page
            if (currentScrollY < 50) {
                setShowAppBar(true);
            } else if (currentScrollY > lastScrollY) {
                // Scroll vers le bas => masquer
                setShowAppBar(false);
            } else {
                // Scroll vers le haut => afficher
                setShowAppBar(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);



    return (
        // <div className="appbar shadow-[0_0_15px_rgba(0,0,0,0.5)]">

        <div className={`
        appbar fixed top-0 left-0 w-full h-[80px] bg-white z-50 
        justify-between items-center
        select-none
        transition-all duration-300
        ${showAppBar ? 'translate-y-0' : '-translate-y-full'}
        ${hasShadow ? 'shadow-md' : ''}
      `}>
            <Link to={'/'} className='profile bg-[white]' style={{ overflow: 'hidden' }}>
                {
                    user.images ? <img style={{
                        objectFit: 'cover',
                    }} src={user.images[0]} alt="" /> :
                        <span className="">BC</span>
                }
            </Link>
            <div className='nav-container'>
                <NavLink to={'/'} className='nav-element'>Home</NavLink>
                <NavLink to={'/projects'} className='nav-element'>Projects</NavLink>
                <NavLink to={'/publications'} className='nav-element'>Publications</NavLink>
                <NavLink to={'/about-me'} className='nav-element'>About</NavLink>
                <NavLink to={'/contact'} className='nav-element'>Contact</NavLink>
            </div>
            <div className="more flex">
                <Link to={user.linkedin} target="_">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </Link>
                <Link to={user.github} target="_">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </Link>
                <button onClick={() => {
                    if (theme === 'light') {
                        setTheme('dark');
                    } else {
                        setTheme('light');

                    }
                }}>
                    {
                        theme === 'light' ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon lucide-sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-star-icon lucide-moon-star"><path d="M18 5h4" /><path d="M20 3v4" /><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" /></svg>
                    }
                </button>
                <button onClick={() => {
                    if (language === 'french') {
                        setLanguage('english');
                    } else {
                        setLanguage('french');
                    }
                }}>
                    {
                        language === 'french' && <span>FR</span>
                    }
                    {
                        language === 'english' && <span>EN</span>
                    }
                </button>
            </div>
        </div>
    )
}

export default AppBar