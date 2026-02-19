import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

const SITE_NAME = "Zentiti Inc";
const DEFAULT_SITE_URL = "https://www.zentiti.com";
const DEFAULT_OG_IMAGE = "/og-image.svg";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return DEFAULT_SITE_URL;
  }

  return window.location.origin || DEFAULT_SITE_URL;
};

const toAbsoluteUrl = (url, baseUrl) => {
  if (!url) {
    return baseUrl;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
};

const stripSchemaContext = (schemaItem) => {
  if (!schemaItem || typeof schemaItem !== "object") {
    return schemaItem;
  }

  const { ["@context"]: _, ...schemaWithoutContext } = schemaItem;
  return schemaWithoutContext;
};

const buildDefaultSchema = (baseUrl) => {
  const orgId = `${baseUrl}/#organization`;
  const appId = `${baseUrl}/#software-application`;
  const productId = `${baseUrl}/#product`;

  return [
    {
      "@type": "Organization",
      "@id": orgId,
      name: SITE_NAME,
      url: baseUrl,
      email: "contact@zentiti.com",
      logo: `${baseUrl}/og-image.svg`,
      sameAs: [
        "https://www.linkedin.com/",
        "https://twitter.com/",
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": appId,
      name: "Zentiti Enterprise Solutions",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Enterprise software and digital transformation solutions delivered by Zentiti Inc.",
      url: baseUrl,
      publisher: {
        "@id": orgId,
      },
    },
    {
      "@type": "Product",
      "@id": productId,
      name: "Zentiti Digital Transformation Services",
      description:
        "Cloud, AI, cybersecurity, and product engineering services for enterprise growth.",
      brand: {
        "@id": orgId,
      },
      manufacturer: {
        "@id": orgId,
      },
      category: "Enterprise Technology Services",
      url: baseUrl,
    },
  ];
};

export const usePageSeo = ({
  title,
  description,
  keywords,
  canonicalPath,
  ogImage,
  ogType = "website",
  schema,
  includeDefaultSchema = true,
}) => {
  return useMemo(() => {
    const baseUrl = getBaseUrl();
    const canonicalUrl = toAbsoluteUrl(canonicalPath, baseUrl);
    const imageUrl = toAbsoluteUrl(ogImage || DEFAULT_OG_IMAGE, baseUrl);

    const schemaItems = [];
    if (includeDefaultSchema) {
      schemaItems.push(...buildDefaultSchema(baseUrl));
    }

    if (schema) {
      const additionalSchema = Array.isArray(schema) ? schema : [schema];
      schemaItems.push(...additionalSchema.map(stripSchemaContext));
    }

    const schemaGraph =
      schemaItems.length > 0
        ? {
            "@context": "https://schema.org",
            "@graph": schemaItems,
          }
        : null;

    return (
      <Helmet prioritizeSeoTags>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {schemaGraph ? (
          <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
        ) : null}
      </Helmet>
    );
  }, [canonicalPath, description, includeDefaultSchema, keywords, ogImage, ogType, schema, title]);
};
