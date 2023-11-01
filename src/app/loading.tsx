import Image from "next/image";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    // return <Image src="../../loading.gif" width={64} alt=""  />
    return <main>
    <div className="container">
      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h2>Loading...</h2>
        {/* <Image src="../../assets/loading.gif" width={64} alt=""  /> */}
      </section>
    </div>
  </main>
  }