import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <meta name="description" content="Manu S Rao Portfolio Page" key="desc" />
        <meta property="og:title" content="Manu S Rao Portfolio Page" />
        <meta
          property="og:description"
          content="Manu S Rao Portfolio Page"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: themeInitializerScript,
            }}
            
          ></script>
          <Script id="show-banner" strategy="afterInteractive">
            {`
              
              const toggleBtn = document.querySelector('.toggle_btn');
              const toggleBtnIcon = document.querySelector('.toggle_btn i');
              const dropDownMenu = document.querySelector('.drop_down');
              document.querySelector('.toggle_btn').addEventListener('click',
                ()=>{ 
                      document.querySelector('.drop_down').classList.toggle('open');
                      const isOpen = dropDownMenu.classList.contains('open');
                      toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark':'fa-solid fa-bars'
              });
              `}
          </Script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// This function needs to be a String
const themeInitializerScript = `(function() {
	${setInitialColorMode.toString()}
	setInitialColorMode();
})()
`;

function setInitialColorMode() {
   // Check initial color preference
  function getInitialColorMode() {
    const persistedPreferenceMode = window.localStorage.getItem('theme');
    const hasPersistedPreference = typeof persistedPreferenceMode === 'string';

    if (hasPersistedPreference) {
      return persistedPreferenceMode;
    }

    // Check the current preference
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof preference.matches === 'boolean';

    if (hasMediaQueryPreference) {
      return preference.matches ? 'dark' : 'light';
    }

    return 'light';
  }

  const currentColorMode = getInitialColorMode();
  const element = document.documentElement;
  element.style.setProperty('--initial-color-mode', currentColorMode);

  // If darkmode apply darkmode
  if (currentColorMode === 'dark')
    document.documentElement.setAttribute('data-theme', 'dark');
}

export default MyDocument;