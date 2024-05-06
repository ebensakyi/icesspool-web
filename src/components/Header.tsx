'use client'
import Image from "next/image";

import { LOGIN_URL } from '@/config';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'

export default function Header() {
    const pathname = usePathname()
    const [showDrawer, setShowDrawer] = useState(false)


    const { data: session } = useSession()


    return (

        <>
            {session?.user ?
                <header id="header" className="header fixed-top d-flex align-items-center" >
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
                            <Image src="/assets/img/logo.png" alt="" width={300} height={300} />
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
                                    <Image
                                        src="/assets/img/profile-img.jpg"
                                        alt="Profile"
                                        className="rounded-circle"
                                        width={32}
                                        height={32}
                                    />
                                    <span className="d-none d-md-block dropdown-toggle ps-2">
                                        {/* {session?.user?.firstName } {session?.user?.lastName} */}
                                    </span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                                    <li className="dropdown-header">
                                        <h5>  {session?.user?.email}</h5>
                                        {/* <h6>  {session?.user?.Region?.name}</h6>
                                        <h6>  {session?.user?.District?.name}</h6> */}

                                        {/* <span> {session?.user?.designation}</span> */}
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
                                    pathname == "/make-request"
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
                                    <Link href="/make-request/toilet-truck">
                                        <i className="bi bi-circle" />
                                        <span>Toilet Truck </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/make-request/wate-tanker">
                                        <i className="bi bi-circle" />
                                        <span>Water </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/make-request/biodigester">
                                        <i className="bi bi-circle" />
                                        <span>Bio-digester</span>
                                    </Link>
                                </li>

                            </ul>
                        </li>




                        {/* <li className="nav-item">

                            <Link
                                className={
                                    pathname == "/services/biodigester/close-request"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                }
                                data-bs-target="#closed-offers-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-card-list
" />
                                <span>Close requests</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="closed-offers-nav"
                                className="nav-content collapse "
                                data-bs-parent="#closed-offers-nav"
                            > <li>
                                    <Link href="/services/biodigester/close-request">
                                        <i className="bi bi-circle" />
                                        <span> Bio-digester</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/services/biodigester/close-request">
                                        <i className="bi bi-circle" />
                                        <span>Emptying</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/offers/water">
                                        <i className="bi bi-circle" />
                                        <span>Water</span>
                                    </Link>
                                </li>



                            </ul>
                        </li> */}
                        {/* <li className="nav-item">

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
                                    <Link href="/make-request/emptying">
                                        <i className="bi bi-circle" />
                                        <span>Emptying toilet </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/make-request/water">
                                        <i className="bi bi-circle" />
                                        <span>Water </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/make-request/bio-digester">
                                        <i className="bi bi-circle" />
                                        <span>Bio-digester</span>
                                    </Link>
                                </li>

                            </ul>
                        </li> */}




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
                            > <li>
                                    <Link href="/service-request/change-price">
                                        <i className="bi bi-circle" />
                                        <span>Change Price</span>
                                    </Link>
                                </li>
                                 <li>
                                    <Link href="/service-request/biodigester/offers">
                                        <i className="bi bi-circle" />
                                        <span> Bio-digester</span>
                                    </Link>
                                </li>
                               
                                <li>
                                    <Link href="/offers/emptying">
                                        <i className="bi bi-circle" />
                                        <span>Emptying</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/offers/water">
                                        <i className="bi bi-circle" />
                                        <span>Water</span>
                                    </Link>
                                </li>



                            </ul>
                        </li>



                        <li className="nav-heading">SETTINGS</li>

                        <li className="nav-item">
                            {/* <li className="nav-item">

                                <Link className={
                                    pathname == "/config/penalty"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                } href="/config/penalty">
                                    <i className="bi bi-outlet" />
                                    <span>Cancellation Penalty</span>
                                </Link>
                            </li>

                            <li className="nav-item">

                                <Link className={
                                    pathname == "/config/charges"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                } href="/config/charges">
                                    <i className="bi bi-outlet" />
                                    <span>Charges</span>
                                </Link>
                            </li>*/}
                            <li className="nav-item">

                                <Link className={
                                    pathname == "/truck-classification"
                                        ? "nav-link"
                                        : "nav-link collapsed"
                                } href="/configure/truck-classification">
                                    <i className="bi bi-truck" />
                                    <span>Truck Classes</span>
                                </Link>
                            </li>
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
                                <span>Configure</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="services-nav"
                                className="nav-content collapse "
                                data-bs-parent="#services-nav"
                            >

                                <li>
                                    <Link href="/configure/services" className={
                                        pathname == "/configure/services"
                                            ? "nav-link"
                                            : "nav-link collapsed"
                                    }>
                                        <i className="bi bi-circle" />
                                        <span>Services</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/configure/biodigester-services" className={
                                        pathname == "/configure/biodigester-services"
                                            ? "nav-link"
                                            : "nav-link collapsed"
                                    }>
                                        <i className="bi bi-circle" />
                                        <span>Biodigester Services</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/configure/service-area">
                                        <i className="bi bi-circle" />
                                        <span>Service Areas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/configure/services-in-area">
                                        <i className="bi bi-circle" />
                                        <span>Set services In Areas</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/configure/service-points">
                                        <i className="bi bi-circle" />
                                        <span>Service Points</span>
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <Link href="/configure/charges">
                                        <i className="bi bi-circle" />
                                        <span>Service charges</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/configure/penalty">
                                        <i className="bi bi-circle" />
                                        <span>Cancellation Penalty</span>
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
                            > <li>
                                    <Link href="/pricing/biodigester">
                                        <i className="bi bi-circle" />
                                        <span>Bio-digester</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/pricing/toilet-truck">
                                        <i className="bi bi-circle" />
                                        <span>Toilet Truck </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pricing/water-tanker">
                                        <i className="bi bi-circle" />
                                        <span>Water Tanker</span>
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
                                    <Link href="/user/admin">
                                        <i className="bi bi-circle" />
                                        <span> Admin</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/user/scanner">
                                        <i className="bi bi-circle" />
                                        <span> Scanner</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/user/service-provider">
                                        <i className="bi bi-circle" />
                                        <span> Service Provider</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/user/client">
                                        <i className="bi bi-circle" />
                                        <span> Client</span>
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
                                    <Link href="/finance/earnings/icesspool">
                                        <i className="bi bi-circle" />
                                        <span>iCesspool</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/earnings/system-charges">
                                        <i className="bi bi-circle" />
                                        <span>System Charges</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/earnings/operate">
                                        <i className="bi bi-circle" />
                                        <span>Service Provider</span>
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
                                    <Link href="/finance/withdrawals/service-provider">
                                        <i className="bi bi-circle" />
                                        <span>Service provider</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/withdrawals/mmda">
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
                                data-bs-target="#balances-nav"
                                data-bs-toggle="collapse"
                                href="#"
                            >
                                <i className="bi bi-currency-dollar

" />
                                <span>Balances</span>
                                <i className="bi bi-chevron-down ms-auto" />
                            </Link>
                            <ul
                                id="balances-nav"
                                className="nav-content collapse "
                                data-bs-parent="#balances-nav"
                            >


                                <li>
                                    <Link href="/finance/balances/service-provider">
                                        <i className="bi bi-circle" />
                                        <span>Service provider</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/finance/balances/mmda">
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
