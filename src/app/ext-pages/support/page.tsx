
export default async function Page({ searchParams }: any) {
    const styles = {
        body: {
          fontFamily: 'Arial, sans-serif',
          lineHeight: 1.6,
          margin: '20px',
        },
        header: {
          color: '#333',
        },
        ul: {
          listStyleType: 'none',
          padding: '0',
        },
        li: {
          marginBottom: '10px',
        },
        contactInfo: {
          marginTop: '20px',
        },
        faqSection: {
          marginTop: '20px',
        },
        footer: {
          marginTop: '20px',
          color: '#888',
          fontSize: '14px',
        },
      };
    
      return (
        <div style={styles.body}>
          <header>
            <h1 style={styles.header}>Support </h1>
          </header>
    
          <section style={styles.contactInfo}>
            <h2>Contact Information</h2>
            <p>If you need further assistance, you can contact us via:</p>
            <ul style={styles.ul}>
              <li style={styles.li}>Email: support@icesspool.net</li>
              <li style={styles.li}>Phone: +233-501411644</li>
            </ul>
          </section>
    
          <section style={styles.faqSection}>
            <h2>Frequently Asked Questions</h2>
            <ul style={styles.ul}>
              <li style={styles.li}>
                <h3>How do I reset my password?</h3>
                <p>You can reset your password by visiting the login page and clicking on the "Forgot Password" link.</p>
              </li>
            
            </ul>
          </section>
    
          <footer style={styles.footer}>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </footer>
        </div>
      );
    };
    
    



