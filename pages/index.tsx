import Head from "next/head";

import { AppProvider } from "../context/AppContext";

import App from "../components/App";

export default function Home() {
  return (
    <div
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <Head>
        <title>
          Cloudsky - Suas ideias, notas e projetos, seu lugar para a
          organização.
        </title>

        <link rel="icon" href="/favicon.ico" />
        <meta property="og:locale" content="pt_BR" />
        <meta
          property="og:keywords"
          content="Notes,project,notes app,hubert ryan,notas,bloco de notas,organização"
        />
        <meta property="og:type" content="website" />
        <meta
          name="description"
          content="Suas ideias, notas e projetos, seu lugar para a
          organização."
        />
        <meta property="og:url" content="https://cloudsky.app" />
        <meta property="og:site_name" content="Cloudsky" />
        <meta property="og:image" content="https://i.imgur.com/VnIaNJp.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta name="twitter:title" content="CloudSky" />
        <meta
          name="twitter:description"
          content="Suas ideias, notas e projetos, seu lugar para a
          organização."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="cloudsky.app" />
        <meta name="twitter:image" content="https://i.imgur.com/VnIaNJp.png" />
        <meta name="twitter:creator" content="@hubertryanoff" />
      </Head>

      <AppProvider>
        <App />
      </AppProvider>
    </div>
  );
}
