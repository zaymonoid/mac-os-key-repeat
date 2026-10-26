import { Container, Divider } from "@chakra-ui/react";
import { Heading, Text } from "../components/Typography";
import Head from "next/head";
import KeyRepeat from "../components/KeyRepeat";
import About from "../components/About";
import Guide, { FAQ, faqPlainText } from "../components/Guide";
import { styled } from "../Stitches.config";
import { VSpacer } from "../components/Spacers";
import {
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "../lib/site";

const Page = styled("div", {
  backgroundImage: "$gradients$background",
  color: "$type",
  minHeight: "100vh",
  fontSize: 18,

  paddingBlock: "$6",
  paddingInline: "$4",

  marginBlock: "$6",
});

const Header = () => (
  <>
    <Heading as="h1" size="xl">
      Dial in your Mac key repeat by feel
    </Heading>
    <Text>
      Test speeds faster than System Settings allows, right here in your
      browser. When it feels right, copy the commands. One restart, not ten.
    </Text>

    <VSpacer size="md" />
    <Divider />
  </>
);

// next/head only keeps direct children (fragments are flattened), so these
// are elements rather than components.
const favicons = (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-config" content="/browserconfig.xml" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff"></meta>
    <link rel="icon" href="/favicon.ico" />
  </>
);

const metadata = (
  <>
    <title>{SITE_TITLE}</title>
    <meta name="description" content={SITE_DESCRIPTION} />
    <link rel="canonical" href={SITE_URL} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:title" content={SITE_TITLE} />
    <meta property="og:description" content={SITE_DESCRIPTION} />
    <meta property="og:url" content={SITE_URL} />
    <meta property="og:image" content={OG_IMAGE_URL} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={SITE_TITLE} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SITE_TITLE} />
    <meta name="twitter:description" content={SITE_DESCRIPTION} />
    <meta name="twitter:url" content={SITE_URL} />
    <meta name="twitter:image" content={OG_IMAGE_URL} />
  </>
);

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: faqPlainText(answer) },
    })),
  },
];

export default function Home() {
  return (
    <>
      <Head>
        {favicons}
        {metadata}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <Page>
        <Container>
          <Header />
          <VSpacer size="xl" />

          <KeyRepeat />

          <VSpacer size="xxl" />
          <Divider />
          <VSpacer size="xl" />
          <Guide />

          <VSpacer size="xxl" />
          <About />
        </Container>
      </Page>
    </>
  );
}
