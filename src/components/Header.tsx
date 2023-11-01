'use client'

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function Header() {
    const pathname = usePathname()
    const [showDrawer, setShowDrawer] = useState(false)

    const { data: session }: any = useSession()




    return (

        <>
            {session?.user ?
                <header id="header" className="header fixed-top d-flex align-items-center">
                    {/* <button onClick={()=>{
                        if(!showDrawer){
                            document.body.classList.add("toggle-sidebar")
                            setShowDrawer(true)
                        }else{
                            document.body.classList.remove("toggle-sidebar")
                            setShowDrawer(false)
                        }
                        

                    }}>Open</button> */}
                    <div className="d-flex align-items-center justify-content-between">
                        <Link href="/" className="logo d-flex align-items-center">
                            <img src="../../assets/img/logo.png" alt="" />
                            {/* <span className="d-none d-lg-block">ESICApps</span> */}
                        </Link>
                        <i className="bi bi-list toggle-sidebar-btn" onClick={() => {
                            if (!showDrawer) {
                                document.body.classList.add("toggle-sidebar")
                                setShowDrawer(true)
                            } else {
                                document.body.classList.remove("toggle-sidebar")
                                setShowDrawer(false)
                            }


                        }} />
                    </div>

                    <nav className="header-nav ms-auto">
                        <ul className="d-flex align-items-center">
                            <li className="nav-item d-block d-lg-none">
                                <a className="nav-link nav-icon search-bar-toggle " href="#">
                                    <i className="bi bi-search" />
                                </a>
                            </li>

                            <li className="nav-item dropdown pe-3">
                                <a
                                    className="nav-link nav-profile d-flex align-items-center pe-0"
                                    href="#"
                                    data-bs-toggle="dropdown"
                                >
                                    <img
                                        src="../../assets/img/profile-img.jpg"
                                        alt="Profile"
                                        className="rounded-circle"
                                    />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">
                                        {session?.user?.otherNames}  {session?.user?.surname}
                                    </span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                        <h5>  {session?.user?.email}</h5>
                                        <h6>  {session?.user?.Region?.name}</h6>
                                        <h6>  {session?.user?.District?.name}</h6>

                                        <span> {session?.user?.designation}</span>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item d-flex align-items-center"
                                            href="/auth/profile"
                                        >
                                            <i className="bi bi-person" />
                                            <span>My Profile</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>

                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        {session ? <button className="dropdown-item d-flex align-items-center" onClick={() => signOut()}>
                                            <i className="bi bi-box-arrow-right" />
                                            <span>Sign Out</span>
                                        </button> :
                                            <button className="dropdown-item d-flex align-items-center" onClick={() => signIn()}>
                                                <i className="bi bi-box-arrow-right" />
                                                <span>Sign In</span>
                                            </button>}

                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </header> : <></>}
            {session?.user ?
                <aside id="sidebar" className="sidebar">
                    <ul className="sidebar-nav" id="sidebar-nav">
                        <li className="nav-heading">Main Menu</li>

                        <li className="nav-item">

                            <Link className={
                                pathname == "/"
                                    ? "nav-link"
                                    : "nav-link collapsed"
                            } href="/">
                                <i className="bi bi-grid" />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        {/* <li className="nav-item">

                            <Link className={
                                pathname == "/"
                                    ? "nav-link"
                                    : "nav-link collapsed"
                            } href="/">
                                <i className="bi bi-arrow-up-right-square
" />
                                <span>Make Request</span>
                            </Link>
                        </li> */}

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#mq-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-arrow-up-right-square
" />
                                <span>Make Request</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="mq-nav"
                                className="nav-content collapse "
                                data-bs-parent="#mq-nav"
                            >

                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Water Point</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Tipping Points</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>




                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#offers-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-card-list
" />
                                <span>Offers</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="offers-nav"
                                className="nav-content collapse "
                                data-bs-parent="#offers-nav"
                            >

                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Desludging</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Water</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> Bio-digest</span>
                                    </Link>
                                </li>


                            </ul>
                        </li>



                        <li className="nav-heading">SETTINGS</li>

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#services-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-recycle
" />
                                <span>Services</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="services-nav"
                                className="nav-content collapse "
                                data-bs-parent="#services-nav"
                            >

                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Water Point</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Tipping Points</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#pricing-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-puzzle" />
                                <span>Pricing</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="pricing-nav"
                                className="nav-content collapse "
                                data-bs-parent="#pricing-nav"
                            >

                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Desluging </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Water </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>Bio-digester</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#account-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-people
" />
                                <span>Account</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="account-nav"
                                className="nav-content collapse "
                                data-bs-parent="#account-nav"
                            >

                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> System admin</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> Regional admin</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> Operators</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> Customer</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span> Scanner</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-heading">FINANCE</li>

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#earnings-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-currency-dollar

" />
                                <span>Earnings</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="earnings-nav"
                                className="nav-content collapse "
                                data-bs-parent="#earnings-nav"
                            >

                                <li>
                                    <Link href="/finance/icesspool">
                                        <i className="bi bi-circle" />
                                        <span>iCesspool</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/system-charges">
                                        <i className="bi bi-circle" />
                                        <span>System Charges</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/operate">
                                        <i className="bi bi-circle" />
                                        <span>Operator</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>MMDA</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>

                        <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/esicapps1/general"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#withdrawals-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-currency-dollar

" />
                                <span>Withdrawals</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="withdrawals-nav"
                                className="nav-content collapse "
                                data-bs-parent="#withdrawals-nav"
                            >

                               
                                <li>
                                    <Link href="/finance/withdrawal/operator">
                                        <i className="bi bi-circle" />
                                        <span>Operator</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/esicapps1/table">
                                        <i className="bi bi-circle" />
                                        <span>MMDA</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </aside> : <></>}
        </>

    )
}