'use client'
import Image from "next/image";

export default  function NotFound() {
  return (
   
  <main>
    <div className="container">
      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for doesn`t exist.</h2>
        <a className="btn" href="/">
          Back to home
        </a>
        <Image
          src="../../assets/img/not-found.svg"
          className="img-fluid py-5"
          alt="Page Not Found"
          width={128}
          height={128}
        />
        <div className="credits">
          {/* All the links in the footer should remain intact. */}
          {/* You can delete the links only if you purchased the pro version. */}
          {/* Licensing information: https://bootstrapmade.com/license/ */}
          {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ */}
          Designed by <a href="https://ea.dev/">EA</a>
        </div>
      </section>
    </div>
  </main>

  )
}