declare module '@theme/Heading' {
  const Heading: React.ComponentType<{
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children: React.ReactNode;
  }>;
  export default Heading;
}

declare module '@theme/Layout' {
  const Layout: React.ComponentType<{
    title?: string;
    description?: string;
    children: React.ReactNode;
  }>;
  export default Layout;
}

declare module '@docusaurus/Link' {
  const Link: React.ComponentType<{
    to: string;
    href?: string;
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }>;
  export default Link;
}

declare module '@docusaurus/useDocusaurusContext' {
  const useDocusaurusContext: () => {
    siteConfig: {
      title: string;
      tagline: string;
      [key: string]: unknown;
    };
  };
  export default useDocusaurusContext;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: { [key: string]: string };
  export default content;
}
