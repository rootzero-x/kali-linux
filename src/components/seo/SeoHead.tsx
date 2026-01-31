import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article';
}

export const SeoHead = ({
    title,
    description = "Learn Kali Linux, defensive security, and ethical hacking with interactive labs/lessons.",
    keywords = "kali linux, cybersecurity, ethical hacking, learn linux, premium cyber education",
    image = "/og-image.jpg",
    type = "website"
}: SeoHeadProps) => {
    const fullTitle = `${title} | Kali Linux`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <html lang="en" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={window.location.href} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
};
