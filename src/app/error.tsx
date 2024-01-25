'use client'
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (

    <main>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>ERROR</h1>
          {/* <h2>An error occured on the requested page</h2> */}
          <h2>{error.toString()}</h2>
          <a className="btn" href="/">
            Back to home
          </a>
          <Image
            src="../../assets/img/error.svg"
            width={128}
            height={128}
            className="img-fluid py-5"
            alt="Page Not Found"
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